/*
 * Generates WebP renditions of the product photography.
 *
 * The images live in public/ (they keep their WordPress URLs so the migration's
 * redirects and any external links still resolve), which means Astro's asset
 * pipeline never sees them. This script fills that gap: for every image the
 * site actually references it writes 400w and 800w WebP files beside the
 * original, and Picture.astro builds a <source srcset> from them.
 *
 * Originals are never deleted — the <img> fallback still points at them, so a
 * browser without WebP support and any external hotlink keep working.
 *
 * The script also rewrites src/data/renditions.json, the map Picture.astro
 * reads to build its srcset. Keeping the map generated means adding an image to
 * a product file is enough — nothing has to be registered by hand.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const PUBLIC = path.resolve('public');
const WIDTHS = [400, 800];

/** Every /media/... path referenced by product data, posts or pages. */
function referenced() {
  const found = new Set();
  const scan = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith('._')) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) scan(full);
      else if (/\.(ts|astro)$/.test(entry.name)) {
        for (const m of fs.readFileSync(full, 'utf8').matchAll(/['"`](\/media\/[^'"`\s)]+\.(?:jpe?g|png))['"`]/gi)) {
          found.add(m[1]);
        }
      }
    }
  };
  scan(path.resolve('src'));
  return [...found];
}

const files = referenced().sort();
const map = {};
let made = 0;
let missing = 0;

for (const rel of files) {
  const src = path.join(PUBLIC, rel);
  if (!fs.existsSync(src)) {
    console.warn(`  missing: ${rel}`);
    missing++;
    continue;
  }
  const meta = await sharp(src).metadata();
  const widths = [];
  for (const w of WIDTHS) {
    // Never upscale: a 600px original gets no 800w rendition.
    if (meta.width && meta.width < w) continue;
    const out = src.replace(/\.(jpe?g|png)$/i, `-${w}.webp`);
    if (!fs.existsSync(out)) {
      await sharp(src).resize({ width: w }).webp({ quality: 78 }).toFile(out);
      made++;
    }
    widths.push(w);
  }
  if (widths.length) map[rel] = widths;
}

const MAP_FILE = path.resolve('src/data/renditions.json');
const next = JSON.stringify(map, null, 0).replace(/,"/g, ',\n"').replace(/^\{/, '{\n').replace(/\}$/, '\n}');
const prev = fs.existsSync(MAP_FILE) ? fs.readFileSync(MAP_FILE, 'utf8') : '';
if (next !== prev) fs.writeFileSync(MAP_FILE, next);

console.log(
  `renditions: ${made} written, ${Object.keys(map).length} images mapped` +
    (missing ? `, ${missing} referenced files missing` : '')
);
