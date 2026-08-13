import type { APIRoute } from 'astro';

export const prerender = false;

/**
 * Returns 410 for the spam query-parameter URLs the WordPress .htaccess used
 * to kill (`?t=<digits>` and /comment.php?t=<digits>). Keeping them gone
 * preserves the de-indexing work already done on the live site.
 */
const BODY = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>410 Gone</title>
<meta name="robots" content="noindex, nofollow"></head>
<body><h1>410 Gone</h1><p>This URL does not exist and will not return.</p></body></html>`;

export const ALL: APIRoute = () =>
  new Response(BODY, {
    status: 410,
    headers: { 'content-type': 'text/html; charset=utf-8', 'x-robots-tag': 'noindex, nofollow' },
  });
