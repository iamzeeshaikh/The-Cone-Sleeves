import type { APIRoute } from 'astro';
import { SITEMAP } from '../data/sitemap';
import { POSTS } from '../data/posts';
import { SITE } from '../data/site';

export const GET: APIRoute = () => {
  const entries = [
    ...SITEMAP,
    ...POSTS.map((p) => ({ path: `/blog/${p.slug}/`, lastmod: p.updated ?? p.published })),
  ];

  const urls = entries.map(
    ({ path, lastmod }) =>
      `\t<url>\n\t\t<loc>${SITE.origin}${path}</loc>\n\t\t<lastmod>${lastmod}</lastmod>\n\t</url>`
  ).join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(body, {
    headers: { 'content-type': 'application/xml; charset=utf-8' },
  });
};
