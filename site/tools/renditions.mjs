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

const files = referenced();
let made = 0;
let saved = 0;

for (const rel of files) {
  const src = path.join(PUBLIC, rel);
  if (!fs.existsSync(src)) {
    console.warn(`  missing: ${rel}`);
    continue;
  }
  const meta = await sharp(src).metadata();
  for (const w of WIDTHS) {
    // Never upscale: a 600px original gets no 800w rendition.
    if (meta.width && meta.width < w) continue;
    const out = src.replace(/\.(jpe?g|png)$/i, `-${w}.webp`);
    if (fs.existsSync(out)) continue;
    await sharp(src).resize({ width: w }).webp({ quality: 78 }).toFile(out);
    made++;
    saved += fs.statSync(src).size - fs.statSync(out).size;
  }
}

console.log(`renditions: ${made} written for ${files.length} source images`);
