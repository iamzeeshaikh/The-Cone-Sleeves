import data from '../data/page-faqs.json';

/**
 * Extra FAQs keyed by route (trailing slash) so every indexable page carries
 * at least ten. Product and home lists are topped up with withExtras(); pages
 * with none render ExtraFaqs. faqNode() strips any link markup for the schema.
 */
type Faq = { q: string; a: string };
type Entry = { h2: string; faqs: Faq[] };
const DATA = data as Record<string, Entry>;
const norm = (p: string) => (p.endsWith('/') ? p : p + '/');

export const extraFaqs = (route: string): Faq[] => DATA[norm(route)]?.faqs ?? [];
export const extraHeading = (route: string) => DATA[norm(route)]?.h2 ?? 'Common questions';
export function withExtras(route: string, faqs: Faq[] = []): Faq[] {
  const seen = new Set(faqs.map((f) => f.q.trim().toLowerCase()));
  return [...faqs, ...extraFaqs(route).filter((f) => !seen.has(f.q.trim().toLowerCase()))];
}
