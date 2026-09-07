/**
 * Structured data and meta helpers.
 *
 * Every page gets: Organization (once, on the home page), WebSite with a
 * SearchAction, a BreadcrumbList, and whatever page-type node fits. Product
 * pages additionally carry Product + FAQPage.
 *
 * NOTE ON RATINGS — the aggregateRating and single review on product pages are
 * inherited from the WordPress site. The client decided on 2026-08-13 to keep
 * them exactly as they were; see the project memory. Do not remove them and do
 * not invent new ones for pages that never had any.
 */
import { SITE } from '../data/site';

const ORIGIN = SITE.origin;
export const abs = (path: string) => (path.startsWith('http') ? path : `${ORIGIN}${path}`);

export const ORG_ID = `${ORIGIN}/#organization`;
export const SITE_ID = `${ORIGIN}/#website`;
export const BUSINESS_ID = `${ORIGIN}/#localbusiness`;

export function organizationNode() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    legalName: SITE.name,
    url: `${ORIGIN}/`,
    logo: {
      '@type': 'ImageObject',
      url: abs(SITE.logo.src),
      width: SITE.logo.width,
      height: SITE.logo.height,
    },
    image: abs(SITE.logo.src),
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.streetAddress,
      addressLocality: SITE.addressLocality,
      addressRegion: SITE.addressRegion,
      postalCode: SITE.postalCode,
      addressCountry: 'US',
    },
    sameAs: [SITE.social.facebook, SITE.social.instagram, SITE.social.linkedin],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE.phone,
      email: SITE.email,
      contactType: 'sales',
      areaServed: 'US',
      availableLanguage: 'English',
    },
  };
}

export function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: `${ORIGIN}/`,
    name: SITE.name,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${ORIGIN}/search/?s={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbNode(trail: Array<{ name: string; path: string }>) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

export function faqNode(faqs: Array<{ q: string; a: string }>) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: stripTags(f.a) },
    })),
  };
}

export const stripTags = (html: string) =>
  html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();

/** Wraps nodes in one @graph so a page ships a single JSON-LD block. */
export function graph(nodes: unknown[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean),
  };
}
