import type { APIRoute } from 'astro';
import { SITE } from '../../data/site';

/**
 * The WordPress site exposed /feed/ and /blog/feed/. Neither ever carried an
 * item (the blog has no published posts), so the URLs are preserved as valid,
 * empty RSS 2.0 documents rather than left to 404.
 */
export const GET: APIRoute = () => {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
\t<channel>
\t\t<title>${SITE.name}</title>
\t\t<atom:link href="${SITE.origin}/feed/" rel="self" type="application/rss+xml" />
\t\t<link>${SITE.origin}/</link>
\t\t<description></description>
\t\t<language>en-US</language>
\t</channel>
</rss>
`;
  return new Response(body, {
    headers: { 'content-type': 'application/rss+xml; charset=UTF-8' },
  });
};
