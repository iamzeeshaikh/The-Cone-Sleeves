/**
 * Content model for every product page on theconesleeves.com.
 *
 * One file per product lives in src/data/products/<slug>.ts and exports a
 * `Product`. The page template (src/pages/[slug].astro) renders every field in
 * a fixed order, so the writing has to be complete — an empty array renders
 * nothing and leaves a hole in the page.
 *
 * House rules for anyone editing these files:
 *   - US spelling (color, customize, personalized).
 *   - Facts only: MOQ, turnaround, materials and sizes come from FACTS below or
 *     from the original page. Never invent client names, certifications,
 *     factory locations or transit-day promises.
 *   - Internal links inside `sections[].html`: at most one per paragraph,
 *     3–8 word descriptive anchor, and only paths that exist on this site
 *     (see src/data/nav.ts). Every path ends with a trailing slash.
 *   - No prices anywhere in copy. The site quotes; it does not sell at a
 *     list price.
 */

export type ProductGroup = 'cone' | 'food' | 'tray';

export interface ImageRef {
  /** Site-relative path under public/, e.g. /media/2025/08/foo.jpg */
  src: string;
  /** Descriptive alt text, 6–14 words, no keyword stuffing. */
  alt: string;
}

export interface SpecRow {
  label: string;
  value: string;
}

export interface Feature {
  title: string;
  text: string;
}

export interface FAQ {
  q: string;
  /** Plain text or minimal HTML (<p>, <ul>, <strong>). 30–80 words. */
  a: string;
}

export interface Section {
  h2: string;
  /** HTML: <p>, <ul>/<li>, <strong>, <a>. 120–220 words. */
  html: string;
}

export interface Product {
  /** URL slug without slashes, e.g. 'ice-cream-cone-sleeves'. */
  slug: string;
  /** Display name used in H1 fallbacks, cards and breadcrumbs. */
  name: string;
  /** Short label for navigation and related-product cards (2–4 words). */
  shortName: string;
  group: ProductGroup;

  seo: {
    /** 50–62 characters, primary query first, brand suffix optional. */
    title: string;
    /** 140–158 characters, contains the primary query, ends with a reason to click. */
    description: string;
  };

  hero: {
    /** Small label above the H1, e.g. 'Custom printed · Food-safe board'. */
    eyebrow: string;
    /** The page's only H1. Contains the primary query naturally. */
    h1: string;
    /** 25–45 words. What it is, who it is for, why order here. */
    lead: string;
    /** 3–4 short proof points, 2–5 words each. */
    bullets: string[];
  };

  /**
   * Answer-first summary for AI and featured snippets: 45–70 words, plain
   * text, one paragraph, defines the product and states MOQ + turnaround.
   */
  quickAnswer: string;

  /** First image is the hero. 3–6 entries. */
  images: ImageRef[];

  /**
   * Printed-work photography for this shape, used by the on-page gallery and
   * by the alternating body sections. 4–10 entries, hero excluded. Imported
   * from the Cone Sleeves UK library; see tools/README for how they are cropped.
   */
  gallery: ImageRef[];

  /** 6–9 rows: Sizes, Board, Print, Finish, MOQ, Turnaround, Artwork, Packing… */
  specs: SpecRow[];

  /** 4–6 benefit cards, title 2–5 words, text 15–30 words. */
  features: Feature[];

  /** 5–8 concrete use cases, 2–6 words each, e.g. 'Gelato shops and kiosks'. */
  useCases: string[];

  /** 3–4 rich sections. At least one must compare options (board, print, or sleeve vs tray). */
  sections: Section[];

  /** 6–8 questions specific to THIS product. No duplicates across products. */
  faqs: FAQ[];

  /** 3–4 slugs of related products, most relevant first. */
  related: string[];

  /** Search queries this page targets, primary first. */
  keywords: string[];
}

/**
 * Shared operational facts. Product copy must agree with these; they are the
 * figures the site has published and quoted against.
 */
export const FACTS = {
  moq: '500 pieces per design',
  turnaroundStandard: '6–7 business days after proof approval',
  turnaroundRush: '3–4 business days on request',
  volumeBreak: 'Volume pricing from 1,000 pieces',
  proof: 'Free digital proof before printing',
  design: 'Free design support and dieline setup',
  shipping: 'Ships worldwide with tracking',
  boards: ['White SBS cardstock', 'Natural kraft', 'Recycled board'],
  print: ['Full-color CMYK', 'Single-color logo', 'Pantone spot colors'],
  finishes: ['Gloss lamination', 'Matte lamination', 'Spot UV', 'Foil stamping', 'Uncoated'],
  artwork: 'PDF, AI or EPS; 300 dpi; 3 mm bleed',
} as const;
