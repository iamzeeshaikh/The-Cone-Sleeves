/*
 * Side-by-side screenshots of the live WordPress site and the Astro rebuild.
 * Usage: node tools/shoot.mjs [--pages a,b,c] [--width 1440] [--full]
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const OUT = process.env.SHOT_DIR || '/private/tmp/claude-501/-Users-sajjadahmad/c5f6b030-e21f-47fd-aa14-e25114d4bcbd/scratchpad/shots';
const LIVE = 'https://www.theconesleeves.com';
const LOCAL = 'http://localhost:4477';

const args = Object.fromEntries(
  process.argv.slice(2).map((a, i, arr) => (a.startsWith('--') ? [a.slice(2), arr[i + 1]?.startsWith('--') === false ? arr[i + 1] : true] : []))
    .filter((x) => x.length)
);

const ALL = [
  '/', '/about/', '/contact/', '/blog/', '/get-a-free-quote/', '/thank-you/',
  '/privacy-policy/', '/terms-conditions/', '/waffle-cone-sleeves/',
  '/ice-cream-cone-sleeves/', '/custom-sugar-cone-sleeves/', '/custom-food-sleeves/',
  '/custom-burger-sleeves/', '/custom-cake-cone-sleeves/', '/custom-crepe-sleeves/',
  '/custom-sandwich-sleeves/', '/custom-coffee-sleeves/', '/custom-hot-dog-sleeves/',
  '/custom-dessert-sleeves/', '/custom-donut-sleeves/', '/custom-beverage-sleeves/',
  '/custom-food-trays/', '/custom-burger-trays/', '/custom-waffle-trays/',
  '/ice-cream-cone-tray/', '/custom-hot-dog-trays/',
];

const pages = args.pages ? String(args.pages).split(',') : ALL;
const width = Number(args.width || 1440);
const height = Number(args.height || 900);
const full = Boolean(args.full);

fs.mkdirSync(OUT, { recursive: true });

const slug = (p) => (p === '/' ? 'index' : p.replace(/^\/|\/$/g, '').replace(/\//g, '_'));

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width, height },
  deviceScaleFactor: 1,
  userAgent:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
});

async function shoot(url, file) {
  const page = await ctx.newPage();
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1200);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(600);
    // suppress the chat widget and animations so diffs stay meaningful
    await page.addStyleTag({
      content:
        '.joinchat,#joinchat,.to_top{display:none !important}' +
        '*,*::before,*::after{animation:none !important;transition:none !important}' +
        'img.emoji{display:inline!important;border:0!important;height:1em!important;width:1em!important;margin:0 .07em!important;vertical-align:-.1em!important;background:none!important;padding:0!important}',
    });
    await page.waitForTimeout(300);
    await page.screenshot({ path: file, fullPage: full });
  } catch (e) {
    console.log('  FAIL', url, e.message.split('\n')[0]);
  } finally {
    await page.close();
  }
}

for (const p of pages) {
  const s = slug(p);
  const tag = `${width}${full ? '-full' : ''}`;
  console.log('shooting', p);
  await shoot(LIVE + p, path.join(OUT, `${s}.live.${tag}.png`));
  await shoot(LOCAL + p, path.join(OUT, `${s}.astro.${tag}.png`));
}

await browser.close();
console.log('done ->', OUT);
