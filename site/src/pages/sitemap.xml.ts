import type { APIRoute } from 'astro';
import { STATIC_PAGES, PRODUCTS_LASTMOD } from '../data/sitemap';
import { PRODUCTS } from '../data/nav';
import { POSTS } from '../data/posts';
import { SITE } from '../data/site';

/**
 * One flat sitemap at /sitemap.xml holding every indexable URL — no index file,
 * no child sitemaps. The old Yoast paths are 301'd here in vercel.json.
 */
export const GET: APIRoute = () => {
  const entries = [
    ...STATIC_PAGES,
    ...PRODUCTS.map((p) => ({ path: p.path, lastmod: PRODUCTS_LASTMOD, priority: '0.8' })),
    ...POSTS.map((p) => ({
      path: `/blog/${p.slug}/`,
      lastmod: (p.updated ?? p.published).slice(0, 10),
      priority: '0.5',
    })),
  ];

  const urls = entries
    .map(
      ({ path, lastmod, priority }) =>
        `\t<url>\n\t\t<loc>${SITE.origin}${path}</loc>\n\t\t<lastmod>${lastmod}</lastmod>\n\t\t<priority>${priority}</priority>\n\t</url>`
    )
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'content-type': 'application/xml; charset=utf-8' } }
  );
};
