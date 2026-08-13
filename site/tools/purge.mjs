/*
 * Trims the migrated WordPress stylesheets down to what the 26 built pages
 * actually use. Run against dist/ after `astro build`; the result is verified
 * with tools/cssdiff.mjs, which compares computed styles against the live site.
 */
import { PurgeCSS } from 'purgecss';
import fs from 'node:fs';
import path from 'node:path';

const DIR = path.resolve('dist/client/_astro');

/** Classes and attributes applied at runtime by src/scripts/site.js. */
const safelist = {
  standard: [
    // added by src/scripts/site.js at runtime
    /^tcs-/, 'active', 'is-open', 'current-menu-active', 'showing-main-menu-modal',
    'showing-search-modal', 'joinchat--show', 'joinchat--chatbox',
    // form endpoint states
    'error', 'success',
    // Gravity Forms validation classes appear only after a failed submit
    /^gform_validation/, /^gfield_error/, /^validation_/, 'gform_submission_error',
  ],
  // Selectors that combine a runtime state with a static ancestor.
  deep: [/current-menu-active/, /joinchat--/, /\.active/, /\.is-open/],
  // PurgeCSS matches class and id tokens only; it cannot tell whether an
  // attribute selector applies. The Rishi theme drives its entire layout from
  // data-* attributes, so every rule that uses one is kept.
  greedy: [/^:root/, /\[data-/],
};

const css = fs.readdirSync(DIR).filter((f) => f.endsWith('.css'));
const before = css.reduce((n, f) => n + fs.statSync(path.join(DIR, f)).size, 0);
const originals = new Map(
  css.map((f) => [path.join(DIR, f), fs.readFileSync(path.join(DIR, f), 'utf8')])
);

const results = await new PurgeCSS().purge({
  content: ['dist/client/**/*.html', 'src/scripts/**/*.js', 'src/components/**/*.astro'],
  css: css.map((f) => path.join(DIR, f)),
  safelist,
  fontFace: false, // keep every @font-face; the icon fonts are referenced from content
  keyframes: false,
  variables: false, // Rishi drives the whole theme from custom properties
});

/*
 * PurgeCSS drops rules whose selectors contain CSS escapes (e.g.
 * `[data-page-spacing=top\:bottom]`) because its extractor cannot evaluate
 * them — and one of those controls the page's vertical spacing. Restore every
 * escaped-selector rule from the original stylesheet.
 */
function restoreEscapedRules(original, purged) {
  const kept = [];
  for (const m of original.matchAll(/([^{}@]+)\{[^}]*\}/g)) {
    if (!m[1].includes('\\')) continue;
    if (purged.includes(m[0])) continue;
    kept.push(m[0]);
  }
  return kept.length ? `${purged}\n/* restored escaped selectors */\n${kept.join('\n')}\n` : purged;
}

let after = 0;
let restored = 0;
for (const r of results) {
  const original = originals.get(r.file) ?? '';
  const before = r.css;
  const css = restoreEscapedRules(original, before);
  if (css !== before) restored++;
  fs.writeFileSync(r.file, css);
  after += Buffer.byteLength(css);
}
if (restored) console.log(`restored escaped-selector rules in ${restored} file(s)`);

const kb = (n) => (n / 1024).toFixed(0) + ' KB';
console.log(`CSS: ${kb(before)} -> ${kb(after)} (${(100 - (after / before) * 100).toFixed(0)}% smaller)`);
