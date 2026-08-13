/* Runs the computed-style comparison for every page at desktop, tablet and phone. */
import { execFileSync } from 'node:child_process';
const PAGES = ['/','/about/','/blog/','/contact/','/get-a-free-quote/','/thank-you/','/privacy-policy/','/terms-conditions/','/waffle-cone-sleeves/','/ice-cream-cone-sleeves/','/custom-sugar-cone-sleeves/','/custom-food-sleeves/','/custom-burger-sleeves/','/custom-cake-cone-sleeves/','/custom-crepe-sleeves/','/custom-sandwich-sleeves/','/custom-coffee-sleeves/','/custom-hot-dog-sleeves/','/custom-dessert-sleeves/','/custom-donut-sleeves/','/custom-beverage-sleeves/','/custom-food-trays/','/custom-burger-trays/','/custom-waffle-trays/','/ice-cream-cone-tray/','/custom-hot-dog-trays/'];
const WIDTHS = [1440, 768, 390];
const rows = [];
for (const w of WIDTHS) {
  for (const p of PAGES) {
    const out = execFileSync('node', ['tools/cssdiff.mjs', p], {
      env: { ...process.env, W: String(w) }, encoding: 'utf8', maxBuffer: 1 << 26,
    });
    const last = out.trim().split('\n').pop();
    const m = /^(\d+) elements differ of (\d+) matched/.exec(last);
    rows.push({ w, p, differ: m ? +m[1] : -1, matched: m ? +m[2] : 0 });
    console.log(`${String(w).padStart(5)}  ${p.padEnd(30)} ${m ? m[1] : '?'} / ${m ? m[2] : '?'}`);
  }
}
const bad = rows.filter((r) => r.differ > 0);
console.log(`\n${rows.length - bad.length}/${rows.length} page-viewport combinations identical`);
for (const b of bad) console.log(`   ${b.w}px ${b.p}: ${b.differ} of ${b.matched}`);
