/*
 * Navigation thumbnails.
 *
 * The mega menu shows a small picture beside each product. Those are the only
 * images on the site that can appear on every page, so they get their own tiny
 * rendition rather than reusing the 400w gallery files — 31 of those would be
 * about 370 KB of header.
 *
 * Two sizes come out of this:
 *   public/media/thumbs/<slug>.webp        96px, for the menus (~2 KB each)
 *   public/media/thumbs/cards/<slug>.webp  320x240, for the configurator's
 *                                          product step (~10 KB each)
 * The header loads the small ones only when a menu is first opened; the card
 * images sit far down the page and are lazy-loaded normally.
 *
 * thumbs.json records which source image produced each thumbnail. Without it a
 * product that switches hero image keeps its old thumbnail, because the new
 * source is older than the file already on disk.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const WIDTH = 96;
const CARD = { width: 320, height: 240 };
const PUBLIC = path.resolve('public');
const OUT = path.join(PUBLIC, 'media/thumbs');
const CARDS = path.join(OUT, 'cards');

/** Read the hero image of every product straight out of the data files. */
const dir = path.resolve('src/data/products');
const products = [];
for (const name of fs.readdirSync(dir)) {
  if (name === 'index.ts' || !name.endsWith('.ts')) continue;
  // Strip line comments first: one sitting between `{` and `src:` would push
  // the match onto the second image and the thumbnail would be the wrong one.
  const src = fs.readFileSync(path.join(dir, name), 'utf8').replace(/^\s*\/\/.*$/gm, '');
  const slug = src.match(/slug:\s*'([^']+)'/)?.[1];
  const first = src.match(/images:\s*\[\s*\{\s*src:\s*'([^']+)'/)?.[1];
  if (slug && first) products.push({ slug, first });
}

fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(CARDS, { recursive: true });
const MANIFEST = path.join(OUT, 'thumbs.json');
const seen = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, 'utf8')) : {};
const next = {};
let made = 0;
let missing = 0;

for (const { slug, first } of products) {
  const src = path.join(PUBLIC, first);
  const out = path.join(OUT, `${slug}.webp`);
  const card = path.join(CARDS, `${slug}.webp`);
  if (!fs.existsSync(src)) {
    console.warn(`  thumb source missing: ${first}`);
    missing++;
    continue;
  }
  next[slug] = first;
  const stamp = fs.statSync(src).mtimeMs;
  const fresh = (f) => fs.existsSync(f) && seen[slug] === first && fs.statSync(f).mtimeMs > stamp;
  if (!fresh(out)) {
    await sharp(src)
      .resize({ width: WIDTH, height: WIDTH, fit: 'cover', position: 'centre' })
      .webp({ quality: 72 })
      .toFile(out);
    made++;
  }
  if (!fresh(card)) {
    await sharp(src).resize({ ...CARD, fit: 'cover', position: 'centre' }).webp({ quality: 76 }).toFile(card);
    made++;
  }
}
fs.writeFileSync(MANIFEST, JSON.stringify(next, null, 0).replace(/,"/g, ',\n"'));

// macOS writes a ._ sidecar beside every file on the exFAT drive; those are
// not images and must not be counted or shipped.
const count = (dir) => fs.readdirSync(dir).filter((f) => f.endsWith('.webp') && !f.startsWith('._'));
const weigh = (dir, files) => files.reduce((n, f) => n + fs.statSync(path.join(dir, f)).size, 0);
const small = count(OUT);
const large = count(CARDS);
console.log(
  `thumbs: ${made} written; ${small.length} menu (${(weigh(OUT, small) / 1024).toFixed(0)} KB), ` +
    `${large.length} card (${(weigh(CARDS, large) / 1024).toFixed(0)} KB)` +
    (missing ? `, ${missing} source images missing` : '')
);
