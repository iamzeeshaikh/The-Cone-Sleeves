/**
 * The site's URL map. Every internal link in content must resolve to one of
 * these paths (plus /blog/<slug>/ for posts). Product pages are grouped the
 * way the header menu presents them.
 */
export interface NavProduct {
  slug: string;
  path: string;
  label: string;
  group: 'cone' | 'food' | 'tray';
}

export const GROUPS: Record<NavProduct['group'], { label: string; blurb: string }> = {
  cone: { label: 'Cone Sleeves', blurb: 'Ice cream, waffle, sugar, cake and crepe cones' },
  food: { label: 'Food Sleeves', blurb: 'Burgers, sandwiches, hot dogs, donuts and drinks' },
  tray: { label: 'Food Trays', blurb: 'Open trays for counters, kiosks and events' },
};

export const PRODUCTS: NavProduct[] = [
  { slug: 'ice-cream-cone-sleeves', path: '/ice-cream-cone-sleeves/', label: 'Ice Cream Cone Sleeves', group: 'cone' },
  { slug: 'waffle-cone-sleeves', path: '/waffle-cone-sleeves/', label: 'Waffle Cone Sleeves', group: 'cone' },
  { slug: 'custom-sugar-cone-sleeves', path: '/custom-sugar-cone-sleeves/', label: 'Sugar Cone Sleeves', group: 'cone' },
  { slug: 'custom-cake-cone-sleeves', path: '/custom-cake-cone-sleeves/', label: 'Cake Cone Sleeves', group: 'cone' },
  { slug: 'custom-crepe-sleeves', path: '/custom-crepe-sleeves/', label: 'Crepe Sleeves', group: 'cone' },

  { slug: 'custom-food-sleeves', path: '/custom-food-sleeves/', label: 'Food Sleeves', group: 'food' },
  { slug: 'custom-burger-sleeves', path: '/custom-burger-sleeves/', label: 'Burger Sleeves', group: 'food' },
  { slug: 'custom-sandwich-sleeves', path: '/custom-sandwich-sleeves/', label: 'Sandwich Sleeves', group: 'food' },
  { slug: 'custom-hot-dog-sleeves', path: '/custom-hot-dog-sleeves/', label: 'Hot Dog Sleeves', group: 'food' },
  { slug: 'custom-donut-sleeves', path: '/custom-donut-sleeves/', label: 'Donut Sleeves', group: 'food' },
  { slug: 'custom-dessert-sleeves', path: '/custom-dessert-sleeves/', label: 'Dessert Sleeves', group: 'food' },
  { slug: 'custom-coffee-sleeves', path: '/custom-coffee-sleeves/', label: 'Coffee Sleeves', group: 'food' },
  { slug: 'custom-beverage-sleeves', path: '/custom-beverage-sleeves/', label: 'Beverage Sleeves', group: 'food' },

  { slug: 'custom-food-trays', path: '/custom-food-trays/', label: 'Food Trays', group: 'tray' },
  { slug: 'custom-burger-trays', path: '/custom-burger-trays/', label: 'Burger Trays', group: 'tray' },
  { slug: 'custom-hot-dog-trays', path: '/custom-hot-dog-trays/', label: 'Hot Dog Trays', group: 'tray' },
  { slug: 'custom-waffle-trays', path: '/custom-waffle-trays/', label: 'Waffle Trays', group: 'tray' },
  { slug: 'ice-cream-cone-tray', path: '/ice-cream-cone-tray/', label: 'Ice Cream Cone Trays', group: 'tray' },
];

export const PAGES = [
  { path: '/', label: 'Home' },
  { path: '/about/', label: 'About' },
  { path: '/blog/', label: 'Blog' },
  { path: '/contact/', label: 'Contact' },
  { path: '/get-a-free-quote/', label: 'Get a Free Quote' },
  { path: '/privacy-policy/', label: 'Privacy Policy' },
  { path: '/terms-conditions/', label: 'Terms & Conditions' },
] as const;

export const productBySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const productsInGroup = (group: NavProduct['group']) => PRODUCTS.filter((p) => p.group === group);

/** Every path a content link may point to. */
export const KNOWN_PATHS = new Set<string>([
  ...PRODUCTS.map((p) => p.path),
  ...PAGES.map((p) => p.path),
]);
