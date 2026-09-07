/*
 * Navigation thumbnails.
 *
 * The mega menu shows a small picture beside each product. Those are the only
 * images on the site that can appear on every page, so they get their own tiny
 * rendition rather than reusing the 400w gallery files — 31 of those would be
 * about 370 KB of header.
 *
 * Output: public/media/thumbs/<slug>.webp at 96px, roughly 2 KB each. The
 * header loads them only when a menu is first opened.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const WIDTH = 96;
const PUBLIC = path.resolve('public');
const OUT = path.join(PUBLIC, 'media/thumbs');

/** Read the hero image of every product straight out of the data files. */
const dir = path.resolve('src/data/products');
const products = [];
for (const name of fs.readdirSync(dir)) {
  if (name === 'index.ts' || !name.endsWith('.ts')) continue;
  const src = fs.readFileSync(path.join(dir, name), 'utf8');
  const slug = src.match(/slug:\s*'([^']+)'/)?.[1];
  const first = src.match(/images:\s*\[\s*\{\s*src:\s*'([^']+)'/)?.[1];
  if (slug && first) products.push({ slug, first });
}

fs.mkdirSync(OUT, { recursive: true });
let made = 0;
let missing = 0;

for (const { slug, first } of products) {
  const src = path.join(PUBLIC, first);
  const out = path.join(OUT, `${slug}.webp`);
  if (!fs.existsSync(src)) {
    console.warn(`  thumb source missing: ${first}`);
    missing++;
    continue;
  }
  if (fs.existsSync(out) && fs.statSync(out).mtimeMs > fs.statSync(src).mtimeMs) continue;
  await sharp(src)
    .resize({ width: WIDTH, height: WIDTH, fit: 'cover', position: 'centre' })
    .webp({ quality: 72 })
    .toFile(out);
  made++;
}

// macOS writes a ._ sidecar beside every file on the exFAT drive; those are
// not images and must not be counted or shipped.
const total = fs.readdirSync(OUT).filter((f) => f.endsWith('.webp') && !f.startsWith('._'));
const bytes = total.reduce((n, f) => n + fs.statSync(path.join(OUT, f)).size, 0);
console.log(
  `thumbs: ${made} written, ${total.length} total, ${(bytes / 1024).toFixed(0)} KB` +
    (missing ? `, ${missing} source images missing` : '')
);
