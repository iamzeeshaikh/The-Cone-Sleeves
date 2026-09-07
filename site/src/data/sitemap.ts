/**
 * Extra sitemap entries — the pages that are not products or blog posts.
 *
 * Products come from src/data/products (via nav.ts) and posts from posts.ts, so
 * neither needs listing here. `/thank-you/`, `/search/` and `/404/` are absent
 * on purpose: all three are noindex.
 *
 * `lastmod` values are the date the page's content last changed.
 */
export const STATIC_PAGES: Array<{ path: string; lastmod: string; priority: string }> = [
  { path: '/', lastmod: '2026-09-07', priority: '1.0' },
  { path: '/get-a-free-quote/', lastmod: '2026-09-07', priority: '0.9' },
  { path: '/about/', lastmod: '2026-09-07', priority: '0.6' },
  { path: '/contact/', lastmod: '2026-09-07', priority: '0.7' },
  { path: '/blog/', lastmod: '2026-09-07', priority: '0.6' },
  { path: '/privacy-policy/', lastmod: '2026-09-07', priority: '0.2' },
  { path: '/terms-conditions/', lastmod: '2026-09-07', priority: '0.2' },
];

/** The date the 18 product pages were rewritten. */
export const PRODUCTS_LASTMOD = '2026-09-07';
