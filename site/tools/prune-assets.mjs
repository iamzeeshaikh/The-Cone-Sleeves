/*
 * Deletes files under public/assets that nothing in the built site references.
 * The download step pulled in everything the original WordPress stylesheets
 * mentioned, including WooCommerce and Dashicons assets this site never shows.
 */
import fs from 'node:fs';
import path from 'node:path';

const PUBLIC_ASSETS = path.resolve('public/assets');
const SCAN = ['dist/client'];

const referenced = new Set();

function scanFile(file) {
  const text = fs.readFileSync(file, 'utf8');
  for (const m of text.matchAll(/\/assets\/([^"')\s?#]+)/g)) {
    referenced.add(decodeURIComponent(m[1]));
  }
}

function walk(dir, fn) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, fn);
    else fn(p);
  }
}

for (const dir of SCAN) {
  if (!fs.existsSync(dir)) continue;
  walk(dir, (p) => {
    if (/\.(html|css|js|xml|json|txt)$/.test(p)) scanFile(p);
  });
}

let kept = 0;
let removed = 0;
let freed = 0;
const removedList = [];

walk(PUBLIC_ASSETS, (p) => {
  const rel = path.relative(PUBLIC_ASSETS, p);
  if (referenced.has(rel)) {
    kept++;
    return;
  }
  freed += fs.statSync(p).size;
  removed++;
  removedList.push(rel);
  fs.unlinkSync(p);
});

// drop the directories left empty
let pruning = true;
while (pruning) {
  pruning = false;
  walk(PUBLIC_ASSETS, () => {});
  const dirs = [];
  const collect = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) {
        const p = path.join(dir, e.name);
        collect(p);
        dirs.push(p);
      }
    }
  };
  collect(PUBLIC_ASSETS);
  for (const d of dirs) {
    if (fs.readdirSync(d).length === 0) {
      fs.rmdirSync(d);
      pruning = true;
    }
  }
}

console.log(`assets kept: ${kept}, removed: ${removed}, freed: ${(freed / 1024 / 1024).toFixed(1)} MB`);
removedList.slice(0, 40).forEach((r) => console.log('   -', r));
if (removedList.length > 40) console.log(`   ... ${removedList.length - 40} more`);

/*
 * Icon webfonts ship in five formats for browsers that no longer exist. Delete
 * the eot/ttf/svg files. The matching @font-face src entries are stripped by
 * tools/purge.mjs, which runs on every build (the CSS is regenerated each time,
 * so that trimming cannot live here).
 */
const DEAD_FORMATS = /\.(eot|ttf|svg)(\?|#|$)/i;

let fontFreed = 0;
let fontRemoved = 0;

walk(PUBLIC_ASSETS, (p) => {
  if (!/(webfonts|fonts)\//.test(p) || !DEAD_FORMATS.test(p)) return;
  fontFreed += fs.statSync(p).size;
  fontRemoved++;
  fs.unlinkSync(p);
});

console.log(
  `icon fonts: removed ${fontRemoved} legacy-format files, freed ${(fontFreed / 1024 / 1024).toFixed(1)} MB`
);
