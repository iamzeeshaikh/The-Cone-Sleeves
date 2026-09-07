import type { APIRoute } from 'astro';
import { POSTS } from '../../data/posts';
import { SITE } from '../../data/site';
import { stripTags } from '../../lib/seo';

/** RSS 2.0 for the guides. The WordPress site exposed /feed/, so the URL stays. */
export const GET: APIRoute = () => {
  const posts = [...POSTS].sort(
    (a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()
  );

  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const items = posts
    .map(
      (p) => `\t\t<item>
\t\t\t<title>${esc(p.title)}</title>
\t\t\t<link>${SITE.origin}/blog/${p.slug}/</link>
\t\t\t<guid isPermaLink="true">${SITE.origin}/blog/${p.slug}/</guid>
\t\t\t<pubDate>${new Date(p.published).toUTCString()}</pubDate>
\t\t\t<description>${esc(stripTags(p.description))}</description>
\t\t</item>`
    )
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
\t<channel>
\t\t<title>${esc(SITE.name)} — Guides</title>
\t\t<atom:link href="${SITE.origin}/feed/" rel="self" type="application/rss+xml" />
\t\t<link>${SITE.origin}/</link>
\t\t<description>Practical guides to buying custom printed cone sleeves, food sleeves and trays.</description>
\t\t<language>en-US</language>
${items}
\t</channel>
</rss>
`;

  return new Response(body, { headers: { 'content-type': 'application/rss+xml; charset=utf-8' } });
};
