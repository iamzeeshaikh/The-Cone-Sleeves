/**
 * Site-wide unit price — the single source of truth for BOTH the `Offer` in
 * product schema and the price shown to the reader on the page.
 *
 * Google will not honor a Merchant listing whose price is nowhere in the
 * landing page's visible text, so the schema figure and the on-page figure must
 * read from this one constant and can never drift apart. Change it here and
 * both move together.
 *
 * 0.50 is the figure the 18 products migrated from WordPress have always
 * carried in product-schema.json; it is not a new number.
 */
import type { ProductGroup } from './types';

/** Starting unit price in USD. */
export const UNIT_PRICE = 0.5;

export const PRICE_CURRENCY = 'USD';

/** The offer price as schema.org wants it: a plain decimal string. */
export const UNIT_PRICE_SCHEMA = UNIT_PRICE.toFixed(2);

/** What one unit is called, per product group. */
const UNIT_NOUN: Record<ProductGroup, string> = {
  cone: 'sleeve',
  food: 'sleeve',
  tray: 'tray',
};

export const unitNoun = (group: ProductGroup) => UNIT_NOUN[group];

/** Visible on-page wording, e.g. "From $0.50 per sleeve". */
export const unitPriceLabel = (group: ProductGroup) =>
  `From $${UNIT_PRICE.toFixed(2)} per ${UNIT_NOUN[group]}`;

/**
 * `priceValidUntil` one year from the build, computed rather than hard-coded so
 * it can never go stale and quietly drop the offer out of eligibility.
 */
export function priceValidUntil(from: Date = new Date()): string {
  const d = new Date(Date.UTC(from.getUTCFullYear() + 1, from.getUTCMonth(), from.getUTCDate()));
  return d.toISOString().slice(0, 10);
}
