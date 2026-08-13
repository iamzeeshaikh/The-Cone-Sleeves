/*
 * Post-migration validation. Crawls the built site and checks link integrity,
 * asset availability, SEO metadata and heading structure, then compares the
 * visible text of every page against the live WordPress original.
 *
 *   node tools/audit.mjs            # local checks only
 *   node tools/audit.mjs --live     # also diff text against the live site
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('dist/client');
const LOCAL = 'http://localhost:4477';
const LIVE = 'https://www.theconesleeves.com';
const withLive = process.argv.includes('--live');

const PAGES = [
  '/', '/about/', '/blog/', '/contact/', '/get-a-free-quote/', '/thank-you/',
  '/privacy-policy/', '/terms-conditions/', '/waffle-cone-sleeves/',
  '/ice-cream-cone-sleeves/', '/custom-sugar-cone-sleeves/', '/custom-food-sleeves/',
  '/custom-burger-sleeves/', '/custom-cake-cone-sleeves/', '/custom-crepe-sleeves/',
  '/custom-sandwich-sleeves/', '/custom-coffee-sleeves/', '/custom-hot-dog-sleeves/',
  '/custom-dessert-sleeves/', '/custom-donut-sleeves/', '/custom-beverage-sleeves/',
  '/custom-food-trays/', '/custom-burger-trays/', '/custom-waffle-trays/',
  '/ice-cream-cone-tray/', '/custom-hot-dog-trays/',
];

const REDIRECTED = new Set(['/blog/feed/']);
const PLACEHOLDER = /lorem ipsum|dolor sit amet|placeholder|your text here|sample text|coming soon|#REF!|\{\{.*?\}\}/i;

const report = {
  pagesBuilt: [], missingPages: [], brokenLinks: [], brokenAssets: [],
  canonicalIssues: [], duplicateTitles: [], duplicateDescriptions: [],
  headingIssues: [], placeholders: [], textDiffs: [], emptyAlts: [],
  imagesWithoutDimensions: [], externalLinks: new Set(),
};

/** Resolve an internal path against the built output. */
function existsInBuild(p) {
  const clean = p.split('#')[0].split('?')[0];
  if (clean === '' || clean === '/') return fs.existsSync(path.join(ROOT, 'index.html'));
  const asFile = path.join(ROOT, clean);
  if (fs.existsSync(asFile) && fs.statSync(asFile).isFile()) return true;
  return fs.existsSync(path.join(ROOT, clean, 'index.html'));
}

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });

const titles = new Map();
const descriptions = new Map();

for (const p of PAGES) {
  const page = await ctx.newPage();
  const failed = [];
  page.on('response', (r) => {
    if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`);
  });

  const res = await page.goto(LOCAL + p, { waitUntil: 'load', timeout: 60000 });
  if (!res || res.status() !== 200) {
    report.missingPages.push(`${p} -> ${res ? res.status() : 'no response'}`);
    await page.close();
    continue;
  }
  report.pagesBuilt.push(p);

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(900);

  const data = await page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    return {
      title: document.title,
      description: q('meta[name="description"]')?.content ?? null,
      canonical: q('link[rel="canonical"]')?.href ?? null,
      robots: q('meta[name="robots"]')?.content ?? null,
      ogTitle: q('meta[property="og:title"]')?.content ?? null,
      jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')].length,
      headings: [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => ({
        level: Number(h.tagName[1]),
        text: h.innerText.trim().slice(0, 60),
      })),
      links: [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')),
      images: [...document.querySelectorAll('img')].map((i) => ({
        src: i.getAttribute('src'),
        alt: i.getAttribute('alt'),
        w: i.getAttribute('width'),
        h: i.getAttribute('height'),
        loading: i.getAttribute('loading'),
        broken: i.complete && i.naturalWidth === 0,
      })),
      text: document.querySelector('.site-content')?.innerText ?? '',
    };
  });

  // titles / descriptions
  (titles.get(data.title) ?? titles.set(data.title, []).get(data.title)).push(p);
  const d = data.description ?? '(none)';
  (descriptions.get(d) ?? descriptions.set(d, []).get(d)).push(p);

  // canonical
  const expected = LIVE + p;
  if (data.canonical !== expected) {
    report.canonicalIssues.push(`${p}: ${data.canonical} (expected ${expected})`);
  }

  // headings
  const levels = data.headings.map((h) => h.level);
  const h1s = levels.filter((l) => l === 1).length;
  if (h1s !== 1) report.headingIssues.push(`${p}: ${h1s} <h1> elements`);
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] - levels[i - 1] > 1) {
      report.headingIssues.push(
        `${p}: h${levels[i - 1]} -> h${levels[i]} ("${data.headings[i].text}")`
      );
      break;
    }
  }

  // links
  for (const href of data.links) {
    if (!href) continue;
    if (/^(mailto:|tel:|javascript:|#|data:)/i.test(href)) continue;
    if (/^https?:\/\//i.test(href)) {
      if (!href.startsWith(LIVE)) report.externalLinks.add(href);
      else {
        const rel = href.slice(LIVE.length) || '/';
        if (!REDIRECTED.has(rel) && !existsInBuild(rel)) report.brokenLinks.push(`${p} -> ${href}`);
      }
      continue;
    }
    if (!REDIRECTED.has(href) && !existsInBuild(href)) report.brokenLinks.push(`${p} -> ${href}`);
  }

  // images
  for (const img of data.images) {
    if (img.broken) report.brokenAssets.push(`${p} img ${img.src}`);
    if (img.alt === null || img.alt.trim() === '') report.emptyAlts.push(`${p} ${img.src}`);
    if (!img.w || !img.h) report.imagesWithoutDimensions.push(`${p} ${img.src}`);
  }

  for (const f of failed) report.brokenAssets.push(`${p} request ${f}`);

  if (PLACEHOLDER.test(data.text)) {
    report.placeholders.push(`${p}: ${data.text.match(PLACEHOLDER)[0]}`);
  }

  if (withLive) {
    const lp = await ctx.newPage();
    try {
      await lp.goto(LIVE + p, { waitUntil: 'load', timeout: 60000 });
      await lp.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await lp.waitForTimeout(1500);
      const liveText = await lp.evaluate(
        () => document.querySelector('.site-content')?.innerText ?? ''
      );
      const norm = (s) => s.replace(/\s+/g, ' ').trim();
      const a = norm(liveText);
      const b = norm(data.text);
      if (a !== b) {
        const delta = b.length - a.length;
        report.textDiffs.push({ page: p, liveChars: a.length, astroChars: b.length, delta });
      }
    } catch (e) {
      report.textDiffs.push({ page: p, error: e.message.split('\n')[0] });
    }
    await lp.close();
  }

  await page.close();
}

await browser.close();

for (const [t, ps] of titles) if (ps.length > 1) report.duplicateTitles.push(`${t} :: ${ps.join(', ')}`);
for (const [d, ps] of descriptions) if (ps.length > 1) report.duplicateDescriptions.push(`${d.slice(0, 60)} :: ${ps.join(', ')}`);

const show = (label, arr, limit = 20) => {
  const list = Array.isArray(arr) ? arr : [...arr];
  console.log(`\n== ${label}: ${list.length}`);
  list.slice(0, limit).forEach((x) => console.log('   ', typeof x === 'string' ? x : JSON.stringify(x)));
  if (list.length > limit) console.log(`    ... ${list.length - limit} more`);
};

console.log(`Pages built: ${report.pagesBuilt.length}/${PAGES.length}`);
show('Missing pages', report.missingPages);
show('Broken internal links', report.brokenLinks);
show('Broken assets / failed requests', report.brokenAssets);
show('Canonical mismatches', report.canonicalIssues);
show('Duplicate titles', report.duplicateTitles);
show('Duplicate meta descriptions', report.duplicateDescriptions);
show('Heading hierarchy notes', report.headingIssues, 40);
show('Placeholder content', report.placeholders);
show('Images with empty alt', report.emptyAlts, 10);
show('Images without width/height', report.imagesWithoutDimensions, 10);
show('External link targets', report.externalLinks, 30);
if (withLive) show('Pages whose text differs from live', report.textDiffs, 30);

fs.writeFileSync(
  '/private/tmp/claude-501/-Users-sajjadahmad/c5f6b030-e21f-47fd-aa14-e25114d4bcbd/scratchpad/audit.json',
  JSON.stringify({ ...report, externalLinks: [...report.externalLinks] }, null, 1)
);
