/*
 * Near-duplicate check across the product pages.
 *
 * Colour and adjective variants of one product are the classic way a catalogue
 * turns into doorway pages, so this measures how much text any two pages
 * actually share. Shingles that appear on almost every page are template, not
 * content, and are removed before the comparison — otherwise the shared header,
 * spec labels and CTA band flatter every pair.
 *
 * Usage: node tools/duplication.mjs [dist-dir]
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(process.argv[2] ?? '.vercel/output/static');
const N = 6;                 // shingle length in words
/*
 * A shingle on this share of pages counts as boilerplate. 0.7 is calibrated:
 * the 31 product pages are 69% of the site and they legitimately repeat the
 * same facts — 500 piece minimum, 6–7 day turnaround, 300 dpi with 3 mm bleed.
 * At 0.8 those rows survive and inflate every product pair to about 19%; at 0.7
 * they are treated as the template they are and the real spread shows.
 */
const TEMPLATE_SHARE = 0.7;
const CEILING = 0.15;        // report any pair above this

function text(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<(header|footer|nav)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;|&#\d+;/gi, ' ')
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full);
    else if (e.name === 'index.html') files.push(full);
  }
})(ROOT);

const pages = files.map((f) => {
  const url = '/' + path.relative(ROOT, f).replace(/index\.html$/, '').replace(/\\/g, '/');
  const words = text(fs.readFileSync(f, 'utf8')).split(' ');
  const shingles = new Set();
  for (let i = 0; i + N <= words.length; i++) shingles.add(words.slice(i, i + N).join(' '));
  return { url, words: words.length, shingles };
});

// Anything present on most pages is chrome, spec labels or the CTA band.
const counts = new Map();
for (const p of pages) for (const s of p.shingles) counts.set(s, (counts.get(s) ?? 0) + 1);
const limit = pages.length * TEMPLATE_SHARE;
const template = new Set([...counts].filter(([, c]) => c >= limit).map(([s]) => s));
for (const p of pages) p.unique = new Set([...p.shingles].filter((s) => !template.has(s)));

const pairs = [];
for (let i = 0; i < pages.length; i++) {
  for (let j = i + 1; j < pages.length; j++) {
    const a = pages[i].unique;
    const b = pages[j].unique;
    let shared = 0;
    for (const s of a) if (b.has(s)) shared++;
    const jaccard = shared / (a.size + b.size - shared);
    pairs.push({ a: pages[i].url, b: pages[j].url, jaccard });
  }
}
pairs.sort((x, y) => y.jaccard - x.jaccard);

const avgTemplate = template.size / (pages.reduce((n, p) => n + p.shingles.size, 0) / pages.length);
console.log(
  `duplication: ${pages.length} pages, ${N}-word shingles, ` +
    `boilerplate ${(avgTemplate * 100).toFixed(1)}% of an average page`
);
console.log('\nclosest pairs');
for (const p of pairs.slice(0, 10)) {
  console.log(`  ${(p.jaccard * 100).toFixed(1)}%  ${p.a}  vs  ${p.b}`);
}
const over = pairs.filter((p) => p.jaccard > CEILING);
console.log(
  over.length ? `\n${over.length} pair(s) above the ${CEILING * 100}% ceiling` : `\nno pair above ${CEILING * 100}%`
);
process.exit(over.length ? 1 : 0);
