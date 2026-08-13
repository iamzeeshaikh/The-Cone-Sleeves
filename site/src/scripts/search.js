/*
 * Client-side search over the 26 migrated pages, rendering the same markup the
 * Rishi search-results template produced on WordPress.
 */
import index from '../data/search-index.json';

const params = new URLSearchParams(window.location.search);
const query = (params.get('s') || '').trim();

const termEl = document.querySelector('[data-search-term]');
const countEl = document.querySelector('[data-search-count]');
const listEl = document.querySelector('[data-search-results]');
const field = document.querySelector('.site-content .search-field');

if (termEl) termEl.textContent = query;
if (field) field.value = query;
document.title = query
  ? `You searched for ${query} - The Cone Sleeves`
  : 'Search - The Cone Sleeves';

const words = query.toLowerCase().split(/\s+/).filter(Boolean);

const score = (entry) => {
  if (!words.length) return 0;
  const title = entry.title.toLowerCase();
  let total = 0;
  for (const w of words) {
    if (title.includes(w)) total += 10;
    const hits = entry.text.split(w).length - 1;
    if (!hits && !title.includes(w)) return 0; // every word must appear somewhere
    total += Math.min(hits, 5);
  }
  return total;
};

const results = index
  .map((entry) => ({ entry, score: score(entry) }))
  .filter((r) => r.score > 0)
  .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title))
  .map((r) => r.entry);

const fmt = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

const escapeHtml = (s) =>
  s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

if (countEl) {
  countEl.textContent = `${results.length} ${results.length === 1 ? 'Result' : 'Results'}`;
}

if (listEl) {
  if (!results.length) {
    listEl.innerHTML = `
      <section class="no-results not-found">
        <header class="page-header"><h2 class="page-title">Nothing Found</h2></header>
        <div class="page-content"><p>Sorry, but nothing matched your search terms. Please try again with some different keywords.</p></div>
      </section>`;
  } else {
    listEl.innerHTML = results
      .map(
        (r) => `
<article class="post-${r.id} page type-page status-publish hentry rishi-post no-post-thumbnail" id="post-${r.id}">
  <div class="blog-post-lay">
    <div class="post-content">
      <div class="entry-content-main-wrap">
        <div class="post-meta-wrapper"><div class="post-meta-inner" data-meta-divider="circle" data-position="First"></div></div>
        <h2 class="entry-title"><a href="${r.url}" rel="bookmark">${escapeHtml(r.title)}</a></h2>
        <div class="post-meta-wrapper">
          <div class="post-meta-inner" data-meta-divider="circle" data-position="Second">
            <span class="posted-on meta-common">
              <time class="entry-date published updated" datetime="${r.published || ''}">${fmt(r.published)}</time>
            </span>
          </div>
        </div>
        <span class="blank-space" data-position="First"></span>
        <footer class="entry-footer rishi-flex">
          <div class="readmore-btn-wrap">
            <a class="btn-readmore" data-arrow="yes" href="${r.url}">Read More</a>
          </div>
        </footer>
      </div>
    </div>
  </div>
</article>`
      )
      .join('');
  }
}
