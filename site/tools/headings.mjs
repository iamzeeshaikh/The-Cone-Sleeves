import { chromium } from 'playwright';
const PAGES = ['/','/about/','/blog/','/contact/','/get-a-free-quote/','/thank-you/','/privacy-policy/','/terms-conditions/','/waffle-cone-sleeves/','/ice-cream-cone-sleeves/','/custom-sugar-cone-sleeves/','/custom-food-sleeves/','/custom-burger-sleeves/','/custom-cake-cone-sleeves/','/custom-crepe-sleeves/','/custom-sandwich-sleeves/','/custom-coffee-sleeves/','/custom-hot-dog-sleeves/','/custom-dessert-sleeves/','/custom-donut-sleeves/','/custom-beverage-sleeves/','/custom-food-trays/','/custom-burger-trays/','/custom-waffle-trays/','/ice-cream-cone-tray/','/custom-hot-dog-trays/'];
const b = await chromium.launch();
const c = await b.newContext({ viewport: { width: 1440, height: 900 } });
const grab = async (u) => {
  const p = await c.newPage();
  await p.goto(u, { waitUntil: 'load', timeout: 60000 });
  await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await p.waitForTimeout(1200);
  const r = await p.evaluate(() =>
    [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(
      (h) => h.tagName + '|' + h.innerText.replace(/\s+/g, ' ').trim()
    )
  );
  await p.close();
  return r;
};
let bad = 0;
for (const path of PAGES) {
  const [live, astro] = await Promise.all([
    grab('https://www.theconesleeves.com' + path),
    grab('http://localhost:4477' + path),
  ]);
  const same = live.length === astro.length && live.every((v, i) => v === astro[i]);
  if (!same) {
    bad++;
    console.log(`\nMISMATCH ${path}  live=${live.length} astro=${astro.length}`);
    const n = Math.max(live.length, astro.length);
    for (let i = 0; i < n; i++) {
      if (live[i] !== astro[i]) console.log(`   [${i}] live: ${live[i]}\n       astro: ${astro[i]}`);
    }
  } else {
    console.log(`ok  ${path}  (${live.length} headings)`);
  }
}
console.log(`\n${PAGES.length - bad}/${PAGES.length} pages match live heading structure exactly`);
await b.close();
