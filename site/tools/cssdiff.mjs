/*
 * Compares computed styles between the live WordPress page and the Astro
 * rebuild. Elements are matched by their Elementor/theme class signature.
 *
 *   node tools/cssdiff.mjs /custom-donut-sleeves/ [selector]
 */
import { chromium } from 'playwright';

const LIVE = 'https://www.theconesleeves.com';
const LOCAL = 'http://localhost:4477';

const path = process.argv[2] || '/';
const only = process.argv[3];
const width = Number(process.env.W || 1440);

const PROPS = [
  'display', 'position', 'width', 'height', 'max-width', 'min-height',
  'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
  'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
  'font-family', 'font-size', 'font-weight', 'line-height', 'letter-spacing',
  'color', 'background-color', 'background-image', 'text-align',
  'flex-direction', 'justify-content', 'align-items', 'gap', 'flex-basis',
  'grid-template-columns', 'border-radius', 'box-shadow', 'border-top-width',
  'opacity', 'visibility', 'text-transform', 'order', 'flex-grow', 'flex-wrap',
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width, height: 900 } });

async function snap(url) {
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'load', timeout: 120000 });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  // WordPress swaps emoji for <img> and sizes them from a stylesheet that its
  // (removed) script injects; without it they measure huge under automation.
  // Freezing animations keeps gradient/keyframe phases comparable too.
  await page.addStyleTag({
    content:
      'img.emoji{display:inline!important;border:0!important;box-shadow:none!important;height:1em!important;width:1em!important;margin:0 .07em!important;vertical-align:-.1em!important;background:none!important;padding:0!important}' +
      '*,*::before,*::after{animation-play-state:paused!important;animation-delay:-1ms!important;animation-duration:1ms!important;transition:none!important}',
  });
  await page.waitForTimeout(400);
  const data = await page.evaluate(
    ({ PROPS, only }) => {
      const key = (el) => {
        const cls = (el.className || '').toString().trim().split(/\s+/)
          .filter((c) => /^elementor-element-|^e-n-accordion|^cb__|^site-|^header-menu|^widget/.test(c))
          .sort().join('.');
        return cls ? `${el.tagName.toLowerCase()}.${cls}` : null;
      };
      const out = {};
      const scope = only ? document.querySelectorAll(only) : document.querySelectorAll('body *');
      for (const el of scope) {
        const k = key(el);
        if (!k || out[k]) continue;
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        const o = { _box: `${Math.round(r.width)}x${Math.round(r.height)}` };
        for (const p of PROPS) o[p] = cs.getPropertyValue(p);
        out[k] = o;
      }
      return out;
    },
    { PROPS, only }
  );
  await page.close();
  return data;
}

const [a, b] = await Promise.all([snap(LIVE + path), snap(LOCAL + path)]);
await browser.close();

const keys = Object.keys(a);
let shown = 0;
const missing = keys.filter((k) => !b[k]);
if (missing.length) console.log(`MISSING IN ASTRO (${missing.length}):`, missing.slice(0, 15));

for (const k of keys) {
  if (!b[k]) continue;
  const diffs = [];
  for (const p of ['_box', ...PROPS]) {
    let x = a[k][p];
    let y = b[k][p];
    if (x === y) continue;
    // normalise host-specific URLs inside background-image
    if (p === 'background-image') {
      const norm = (v) => v.replace(/https?:\/\/[^/]+/g, '').replace('/wp-content/uploads/', '/media/');
      if (norm(x) === norm(y)) continue;
    }
    if (p === 'font-family' && x.replace(/"/g, '') === y.replace(/"/g, '')) continue;
    diffs.push(`${p}: ${x}  ->  ${y}`);
  }
  if (diffs.length) {
    shown++;
    if (shown <= 40) console.log(`\n### ${k}\n   ` + diffs.join('\n   '));
  }
}
console.log(`\n${shown} elements differ of ${keys.length} matched (${path} @${width}px)`);
