import type { Product } from '../types';

export const product: Product = {
  slug: 'custom-dessert-trays',
  name: 'Custom Dessert Trays',
  shortName: 'Dessert Trays',
  group: 'tray',

  seo: {
    title: 'Custom Dessert Trays | Printed Bakery Board Trays',
    description:
      'Printed dessert and bakery trays for cakes, waffles and patisserie. Scalloped and plain profiles in grease-resistant board, from 500 pieces, free proof, 6–7 days.',
  },

  hero: {
    eyebrow: 'Bakery board · Scalloped and plain profiles',
    h1: 'Custom Dessert Trays',
    lead: 'Shallow board trays built for things that are looked at before they are eaten: cake slices, loaded waffles, patisserie and traybakes. Grease-resistant, printed on the rim, and cut to your plate size.',
    bullets: ['500 piece minimum', 'Scalloped or plain rim', 'Grease-resistant', 'Free digital proof'],
  },

  quickAnswer:
    'Dessert trays are shallow printed board trays used to present cake slices, waffles and patisserie at a counter or in a display. The Cone Sleeves cuts them to your product footprint in grease-resistant white or kraft board, printing from 500 pieces per design with a free proof and 6–7 business day production.',

  images: [
    {
      src: '/media/lib/custom-dessert-trays/custom-dessert-trays.jpg',
      alt: 'Printed dessert tray holding a soft-serve waffle with fruit and sauce',
    },
    {
      src: '/media/lib/custom-dessert-trays/custom-dessert-trays-packaging.jpg',
      alt: 'White scalloped dessert tray shown empty on a two-tone backdrop',
    },
    {
      src: '/media/lib/custom-dessert-trays/dessert-trays.jpg',
      alt: 'Kraft dessert tray holding a waffle with strawberries and chocolate sauce',
    },
  ],

  gallery: [
    {
      src: '/media/lib/custom-dessert-trays/dessert-trays-packaging.jpg',
      alt: 'Long narrow dessert tray printed with a waffle brand wordmark',
    },
    {
      src: '/media/lib/custom-bakery-trays/bakery-trays.jpg',
      alt: 'Stack of kraft bakery trays with one lifted clear of the pile',
    },
    {
      src: '/media/lib/custom-bakery-trays/bakery-trays-packaging.jpg',
      alt: 'Two printed bakery trays in orange and white, shown empty',
    },
    {
      src: '/media/lib/custom-bakery-trays/custom-bakery-trays.jpg',
      alt: 'Pale scalloped bakery tray printed with a small brand mark',
    },
    {
      src: '/media/lib/custom-bakery-trays/custom-bakery-trays-packaging.jpg',
      alt: 'Kraft bakery trays lined with printed greaseproof paper',
    },
  ],

  specs: [
    { label: 'Profiles', value: 'Scalloped rim for presentation, or plain straight wall for stacking' },
    { label: 'Board', value: 'Grease-resistant white board or natural kraft, 300–350 gsm' },
    { label: 'Sizes', value: 'Slice, square and long waffle footprints; cut to your product' },
    { label: 'Printing', value: 'Full-color CMYK, single-color logo, Pantone spot colors or foil' },
    { label: 'Finish', value: 'Uncoated inner face; matte varnish or lamination on the outside' },
    { label: 'Minimum order', value: '500 pieces per design; volume pricing from 1,000 pieces' },
    { label: 'Turnaround', value: '6–7 business days after proof approval; 3–4 day rush on request' },
    { label: 'Liner', value: 'Printed greaseproof liners can be quoted with the tray' },
  ],

  features: [
    {
      title: 'Shallow on purpose',
      text: 'A low wall keeps the dessert visible, which is the whole point of a product that sells on how it looks in a display.',
    },
    {
      title: 'Handles sauce',
      text: 'Grease-resistant board copes with chocolate sauce and cream without the base going soft under the plate.',
    },
    {
      title: 'Scalloped or plain',
      text: 'A scalloped rim reads as patisserie; a straight wall stacks better in a chilled display. Both run on the same board.',
    },
    {
      title: 'Prints on the rim',
      text: 'The narrow band around the tray is what shows in a photograph of the dessert, which makes it valuable brand space.',
    },
    {
      title: 'Liner optional',
      text: 'A printed greaseproof liner adds a second layer of branding and keeps the tray itself clean enough to reuse in a display.',
    },
    {
      title: 'Stacks in a cabinet',
      text: 'Straight-walled trays nest in a chilled cabinet without crushing what is underneath, which matters in a small counter.',
    },
  ],

  useCases: [
    'Waffle and pancake bars',
    'Cake and patisserie counters',
    'Ice cream parlors serving desserts',
    'Hotel breakfast and buffet displays',
    'Market and festival dessert stalls',
    'Delivery kitchens with a dessert menu',
  ],

  sections: [
    {
      h2: 'Scalloped or straight wall',
      html: `<p>A scalloped rim is decorative. It softens the edge of the tray, photographs well and is what most people picture when they think of a patisserie counter. It also costs nothing extra, because the shape is cut into the same dieline.</p>
<p>A straight wall is more practical. Trays nest cleanly in a chilled display, stack without crushing, and give a flat band all the way around for printing.</p>
<p>Sites with a display cabinet almost always end up on straight walls; counters that hand desserts over directly tend to prefer the scallop. Neither affects how the board performs.</p>`,
    },
    {
      h2: 'Why a liner is worth considering',
      html: `<p>A printed greaseproof liner sits between the dessert and the tray. It takes the sauce, which keeps the tray itself presentable, and it gives you a second printed surface at a fraction of the cost of the tray.</p>
<p>For a waffle bar that is a real advantage: the liner can change with a seasonal menu while the tray stays constant, in the same way a sleeve works for a bakery box.</p>
<p>Liners are quoted per thousand and are cheap enough that most sites order them alongside the tray rather than as a later upgrade. Counters that also box desserts to go usually add <a href="/custom-pastry-sleeves/">printed sleeves for boxed patisserie</a> on the same artwork.</p>`,
    },
    {
      h2: 'Sizing to the dessert, not the menu name',
      html: `<p>Dessert portions vary far more than main courses. A loaded waffle needs a long tray with room for fruit at one end; a cake slice needs a short one with a narrow footprint so the slice does not slide.</p>
<p>Send the plate you currently serve on, or photograph a finished dessert next to a ruler, and we will cut the tray to that footprint plus a small allowance.</p>
<p>Where a menu covers both slices and waffles, two dielines in one order is cheaper than two orders, and both stay on file so reprints need nothing but a quantity.</p>`,
    },
  ],

  faqs: [
    {
      q: 'Will chocolate sauce soak through the tray?',
      a: 'Not on the grease-resistant board within normal service time. What does cause trouble is a dessert left standing for an hour in a warm display, and that is a holding decision rather than a packaging one.',
    },
    {
      q: 'Can I get a matching printed liner?',
      a: 'Yes. Printed greaseproof liners are quoted per thousand and are cheap enough that most sites order them with the tray. They take the sauce, keep the tray presentable, and give you a second surface to print on.',
    },
    {
      q: 'Do scalloped trays cost more than plain ones?',
      a: 'No. The scallop is cut into the same dieline, so the price is the same. Choose on how the tray is used: scalloped for presentation at a counter, straight-walled for stacking in a chilled display.',
    },
    {
      q: 'Are these strong enough for a loaded waffle?',
      a: 'A 350 gsm tray carries a loaded waffle with fruit and sauce without flexing. If the dessert is heavy and the tray is long, tell us and we will add a fold detail across the base rather than simply going to a heavier board.',
    },
    {
      q: 'Can the tray go in a delivery bag?',
      a: 'An open tray tips in a bag. For delivery we would suggest a tray with a clip-on lid or a closed carton instead. If you deliver occasionally, ordering a lid for the same footprint is straightforward and adds only a little to the cost.',
    },
    {
      q: 'What board do you use against the dessert?',
      a: 'The inner face is left uncoated and unprinted, which is the specification that keeps it food-safe for direct contact. Any varnish or lamination is applied to the outer face only.',
    },
  ],

  related: ['custom-waffle-trays', 'custom-pastry-sleeves', 'custom-dessert-sleeves', 'custom-food-trays'],

  keywords: [
    'custom dessert trays',
    'printed bakery trays wholesale',
    'waffle tray custom printed',
    'cake slice tray packaging',
    'patisserie board tray',
  ],
};
