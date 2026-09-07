/*
 * Internal-linking audit.
 *
 * The house rule is one internal link per paragraph, with a descriptive anchor
 * of three to eight words pointing at a URL that exists. This walks the built
 * HTML and reports every paragraph that breaks it.
 *
 * Only editorial regions are checked — the `.prose` blocks and FAQ answers.
 * Navigation, cards, the footer and the related-product grid are interface, not
 * content, and a single-word anchor is correct there.
 *
 * Usage: node tools/link-audit.mjs [dist-dir]
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(process.argv[2] ?? '.vercel/output/static');

const GENERIC = new Set([
  'click here', 'learn more', 'read more', 'visit this page', 'explore our products',
  'explore our services', 'check this out', 'see more', 'view our collection',
  'discover our range', 'our solutions', 'related page', 'here', 'this page',
  'find out more', 'more', 'link', 'this', 'shop now', 'view product',
]);

/**
 * Pull out the editorial regions. These blocks hold only text elements, never
 * nested divs, so a non-greedy match to the closing tag is safe here.
 */
function prose(html) {
  const out = [];
  for (const m of html.matchAll(/<div class="[^"]*\bprose\b[^"]*"[^>]*>([\s\S]*?)<\/div>/gi)) out.push(m[1]);
  for (const m of html.matchAll(/<div class="faq-body"[^>]*>([\s\S]*?)<\/div>/gi)) out.push(m[1]);
  for (const m of html.matchAll(/<div class="quick-answer"[^>]*>([\s\S]*?)<\/div>/gi)) out.push(m[1]);
  return out.join('\n');
}

function pages(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) pages(full, out);
    else if (e.name === 'index.html' || e.name === '404.html') out.push(full);
  }
  return out;
}

const files = pages(ROOT);
const urls = new Set(
  files.map((f) => '/' + path.relative(ROOT, f).replace(/index\.html$/, '').replace(/\\/g, '/'))
);

const problems = [];
const stats = { pages: 0, paragraphs: 0, links: 0 };

for (const file of files) {
  const url = '/' + path.relative(ROOT, file).replace(/index\.html$/, '').replace(/\\/g, '/');
  const html = fs.readFileSync(file, 'utf8');
  const body = prose(html);
  stats.pages++;

  // Links inside headings are not allowed at all.
  for (const m of body.matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi)) {
    if (/<a\s[^>]*href="\//i.test(m[2])) {
      problems.push({ url, kind: 'link-in-heading', detail: m[2].slice(0, 80) });
    }
  }

  for (const m of body.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)) {
    const para = m[1];
    stats.paragraphs++;
    const links = [...para.matchAll(/<a\s[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)];
    const internal = links.filter(
      (l) => l[1].startsWith('/') && !l[1].startsWith('//') && !l[1].startsWith('/api/')
    );
    stats.links += internal.length;

    if (internal.length > 1) {
      problems.push({
        url,
        kind: 'multiple-links-in-paragraph',
        detail: internal.map((l) => l[1]).join(' + '),
      });
    }

    for (const l of internal) {
      const href = l[1];
      const anchor = l[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      const words = anchor.split(' ').filter(Boolean).length;

      if (GENERIC.has(anchor.toLowerCase())) {
        problems.push({ url, kind: 'generic-anchor', detail: `"${anchor}" -> ${href}` });
      } else if (words < 3 || words > 8) {
        problems.push({ url, kind: 'anchor-length', detail: `${words}w "${anchor}" -> ${href}` });
      }

      const target = href.split('#')[0].split('?')[0];
      if (!target.includes('.') && !target.endsWith('/')) {
        problems.push({ url, kind: 'missing-trailing-slash', detail: href });
      }
      if (!target.includes('.') && !urls.has(target)) {
        problems.push({ url, kind: 'broken-link', detail: href });
      }
    }
  }
}

const byKind = {};
for (const p of problems) (byKind[p.kind] ??= []).push(p);

console.log(
  `link audit: ${stats.pages} pages, ${stats.paragraphs} body paragraphs, ${stats.links} internal content links`
);
for (const [kind, list] of Object.entries(byKind)) {
  console.log(`\n${kind} (${list.length})`);
  for (const p of list.slice(0, 40)) console.log(`  ${p.url}  ${p.detail}`);
  if (list.length > 40) console.log(`  … ${list.length - 40} more`);
}
if (!problems.length) console.log('\nno violations');
process.exit(problems.length ? 1 : 0);
