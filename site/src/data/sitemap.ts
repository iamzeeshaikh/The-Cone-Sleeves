/**
 * Sitemap entries. `lastmod` values are carried over from the WordPress
 * (Yoast) page-sitemap so crawl signals survive the migration.
 *
 * Yoast omitted /blog/ from its sitemap even though the page is index,follow.
 * It is included here so the sitemap covers every canonical, indexable URL.
 */
export const SITEMAP: Array<{ path: string; lastmod: string }> = [
  { path: '/', lastmod: '2025-09-26T10:39:50+00:00' },
  { path: '/about/', lastmod: '2023-03-28T11:07:05+00:00' },
  { path: '/blog/', lastmod: '2025-09-26T10:39:50+00:00' },
  { path: '/privacy-policy/', lastmod: '2023-03-28T11:12:10+00:00' },
  { path: '/terms-conditions/', lastmod: '2023-03-28T11:25:07+00:00' },
  { path: '/thank-you/', lastmod: '2023-07-03T11:01:59+00:00' },
  { path: '/contact/', lastmod: '2024-07-05T13:03:59+00:00' },
  { path: '/get-a-free-quote/', lastmod: '2025-09-14T21:34:58+00:00' },
  { path: '/custom-food-sleeves/', lastmod: '2025-09-15T14:13:02+00:00' },
  { path: '/custom-sugar-cone-sleeves/', lastmod: '2025-09-15T15:03:34+00:00' },
  { path: '/ice-cream-cone-tray/', lastmod: '2025-09-15T15:21:48+00:00' },
  { path: '/custom-waffle-trays/', lastmod: '2025-09-15T15:38:51+00:00' },
  { path: '/ice-cream-cone-sleeves/', lastmod: '2025-09-15T19:22:28+00:00' },
  { path: '/waffle-cone-sleeves/', lastmod: '2025-09-15T20:07:30+00:00' },
  { path: '/custom-burger-trays/', lastmod: '2025-09-22T13:51:36+00:00' },
  { path: '/custom-food-trays/', lastmod: '2025-09-22T14:13:15+00:00' },
  { path: '/custom-beverage-sleeves/', lastmod: '2025-09-23T06:58:26+00:00' },
  { path: '/custom-burger-sleeves/', lastmod: '2025-09-23T06:59:14+00:00' },
  { path: '/custom-dessert-sleeves/', lastmod: '2025-09-23T07:01:47+00:00' },
  { path: '/custom-donut-sleeves/', lastmod: '2025-09-23T07:05:15+00:00' },
  { path: '/custom-hot-dog-sleeves/', lastmod: '2025-09-23T07:13:07+00:00' },
  { path: '/custom-sandwich-sleeves/', lastmod: '2025-09-23T07:25:03+00:00' },
  { path: '/custom-coffee-sleeves/', lastmod: '2025-09-25T12:32:28+00:00' },
  { path: '/custom-hot-dog-trays/', lastmod: '2025-09-26T10:13:27+00:00' },
  { path: '/custom-crepe-sleeves/', lastmod: '2025-09-26T10:24:12+00:00' },
  { path: '/custom-cake-cone-sleeves/', lastmod: '2025-09-26T10:36:28+00:00' },
];
