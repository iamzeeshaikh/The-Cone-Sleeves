/**
 * Product registry.
 *
 * Files are picked up eagerly by glob so adding a product is one file plus one
 * entry in nav.ts — nothing here needs editing. The order follows nav.ts, which
 * is the order the site presents everywhere else.
 */
import type { Product } from '../types';
import { PRODUCTS as NAV } from '../nav';

const modules = import.meta.glob<{ product: Product }>('./*.ts', { eager: true });

const bySlug = new Map<string, Product>();
for (const [file, mod] of Object.entries(modules)) {
  if (file.endsWith('/index.ts')) continue;
  if (!mod.product) throw new Error(`${file} does not export \`product\``);
  bySlug.set(mod.product.slug, mod.product);
}

/** Every product, in navigation order. Throws if nav.ts names a missing file. */
export const ALL_PRODUCTS: Product[] = NAV.map((n) => {
  const p = bySlug.get(n.slug);
  if (!p) throw new Error(`nav.ts lists "${n.slug}" but src/data/products/${n.slug}.ts is missing`);
  return p;
});

export const getProduct = (slug: string) => bySlug.get(slug);

export const productsByGroup = (group: Product['group']) =>
  ALL_PRODUCTS.filter((p) => p.group === group);
