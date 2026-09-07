import type { Product } from '../types';

export const product: Product = {
  slug: 'custom-popcorn-sleeves',
  name: 'Custom Popcorn Sleeves',
  shortName: 'Popcorn Sleeves',
  group: 'food',

  seo: {
    title: 'Custom Popcorn Sleeves & Bags | Printed Wholesale',
    description:
      'Printed popcorn sleeves, bags and tubs for cinemas, fairs and events. Grease-resistant board, any portion size, from 500 pieces with a free proof and 6–7 day turnaround.',
  },

  hero: {
    eyebrow: 'Bags, tubs and sleeves · Grease-resistant',
    h1: 'Custom Popcorn Sleeves',
    lead: 'Printed holders for popcorn in every format a counter needs: flat bags for volume, open tubs for sharing, and board sleeves for a premium sweet range. Cut to your portion, printed to your artwork.',
    bullets: ['500 piece minimum', 'Bags, tubs or sleeves', 'Grease-resistant board', 'Free digital proof'],
  },

  quickAnswer:
    'Popcorn sleeves are printed paper and board holders — flat bags, open tubs or wrap sleeves — that carry a portion of popcorn and keep butter off the hand. The Cone Sleeves prints them to your portion size from 500 pieces per design, with a free dieline and digital proof and 6–7 business day production.',

  images: [
    {
      src: '/media/lib/custom-popcorn-sleeves/custom-popcorn-sleeves.jpg',
      alt: 'Two printed popcorn tubs filled with caramel corn on a wooden board',
    },
    {
      src: '/media/lib/custom-popcorn-sleeves/popcorn-sleeves-packaging.jpg',
      alt: 'Red and yellow printed popcorn bag standing upright and full',
    },
    {
      src: '/media/lib/custom-popcorn-sleeves/custom-popcorn-sleeves-packaging.jpg',
      alt: 'Kraft popcorn sleeve tipped over with popcorn spilling out',
    },
  ],

  gallery: [
    {
      src: '/media/lib/custom-popcorn-sleeves/popcorn-sleeves.jpg',
      alt: 'Red and white striped popcorn bag opened at the top',
    },
    {
      src: '/media/lib/custom-popcorn-trays/custom-popcorn-trays.jpg',
      alt: 'Striped popcorn tub standing on a stack of flat printed bags',
    },
    {
      src: '/media/lib/custom-popcorn-trays/custom-popcorn-trays-packaging.jpg',
      alt: 'Plain popcorn bag printed with a two-color diagonal stripe',
    },
    {
      src: '/media/lib/custom-popcorn-trays/popcorn-trays-packaging.jpg',
      alt: 'Orange and white popcorn carton printed with a bold wordmark',
    },
    {
      src: '/media/lib/custom-popcorn-trays/popcorn-trays.jpg',
      alt: 'Printed popcorn carton laid on its side beside a plate of popcorn',
    },
  ],

  specs: [
    { label: 'Formats', value: 'Flat bag, open tub, squared carton or wrap sleeve over a plain tub' },
    { label: 'Stock', value: 'Grease-resistant paper for bags; 280–350 gsm board for tubs and cartons' },
    { label: 'Portions', value: 'Small, regular, large and sharing; cut to your own fill volume' },
    { label: 'Printing', value: 'Full-color CMYK, single-color logo or Pantone spot colors' },
    { label: 'Finish', value: 'Uncoated as standard; matte or gloss varnish for photographic artwork' },
    { label: 'Minimum order', value: '500 pieces per design; volume pricing from 1,000 pieces' },
    { label: 'Turnaround', value: '6–7 business days after proof approval; 3–4 day rush on request' },
    { label: 'Packing', value: 'Bags ship flat in counts of 500; tubs nest inside one another' },
  ],

  features: [
    {
      title: 'Butter stays inside',
      text: 'Grease-resistant stock stops the dark patch that appears within a minute on ordinary paper once buttered popcorn goes in.',
    },
    {
      title: 'Bags for volume',
      text: 'A flat bag is the cheapest way to serve a large portion and takes almost no storage, which is why cinemas still use them.',
    },
    {
      title: 'Tubs for sharing',
      text: 'An open tub sits between two people on a seat or a table, and holds its shape when it is passed around.',
    },
    {
      title: 'Sleeve over plain stock',
      text: 'A printed sleeve slid over a plain tub lets you change artwork for a film or a season without reprinting the tub itself.',
    },
    {
      title: 'Made for a fill line',
      text: 'Sized so a correct portion reaches the top rather than sitting halfway down an oversized carton.',
    },
    {
      title: 'Event-ready runs',
      text: 'Five hundred pieces covers a single event, so a dated or themed design does not leave a year of surplus stock.',
    },
  ],

  useCases: [
    'Cinemas and screening rooms',
    'Fairs, carnivals and fun days',
    'Sports grounds and arenas',
    'Wedding and party favors',
    'Gourmet popcorn retail brands',
    'Theatre and event intervals',
  ],

  sections: [
    {
      h2: 'Bag, tub or printed sleeve',
      html: `<p>A flat bag is the cheapest format by a clear margin and stores in almost no space. It suits high-volume service where the popcorn is eaten immediately and nobody needs to put it down.</p>
<p>An open tub costs more but behaves better: it stands on a seat arm, survives being passed along a row, and looks like part of an experience rather than a snack handed over in a bag.</p>
<p>The third option is a printed sleeve over a plain tub, which is how a lot of cinemas handle film tie-ins. The tub stays the same all year and only the sleeve changes, so artwork is cheap to refresh.</p>`,
    },
    {
      h2: 'Sweet and salty behave differently',
      html: `<p>Salted and buttered popcorn is an oil problem. Caramel and toffee popcorn is a sugar problem: it sticks, and a thin uncoated board will tear when the last pieces are pulled away from the wall.</p>
<p>For a sweet range we specify a slightly heavier board with a smoother inner face, so the coating releases instead of bonding to the fiber. It costs a little more per piece and it is the difference between a clean finish and a mess.</p>
<p>If you sell both, say so. We will usually recommend one board that copes with each rather than making you hold two lines of stock in a small back room.</p>`,
    },
    {
      h2: 'Sizing a portion people believe in',
      html: `<p>Popcorn is bought with the eyes. A regular that fills its holder to the brim feels generous; the same volume rattling around in a large carton feels mean, even though the customer receives exactly the same amount.</p>
<p>Tell us the volume you actually serve, in liters or in cups, and we cut the holder so a proper portion reaches the rim. That single decision does more for perceived value than any amount of printing on the outside.</p>
<p>Sites that also serve drinks alongside usually order these with matching <a href="/custom-beverage-sleeves/">printed sleeves for cold drink cups</a>, so a combo on a tray looks like one product.</p>`,
    },
  ],

  faqs: [
    {
      q: 'Which format is cheapest for a busy cinema?',
      a: 'A flat printed bag, by a clear margin. It costs less per piece than a tub and takes a fraction of the storage. The trade-off is that a bag cannot be set down, which is why premium screens tend to use tubs even though they cost more.',
    },
    {
      q: 'Will butter soak through the bag?',
      a: 'Not on the grease-resistant stock we use. Ordinary kraft will show a dark patch within a minute of a buttered portion going in. If you are comparing quotes, this is the specification worth checking, because it is where cheap popcorn packaging fails.',
    },
    {
      q: 'Can I change artwork for a film release without a new tub?',
      a: 'Yes, and it is the reason printed sleeves exist. Keep one plain tub in stock all year and print a sleeve for each release at 500 pieces per design. It is far cheaper than reprinting the tub and the changeover takes no staff training.',
    },
    {
      q: 'Do you print for caramel or toffee popcorn?',
      a: 'We do, and we specify a different inner surface for it. Sugar coatings bond to a rough board and tear it when the popcorn is pulled away. A smoother inner face releases cleanly, which is worth the small extra cost on a sweet range.',
    },
    {
      q: 'How much popcorn does a standard tub hold?',
      a: 'That depends entirely on the size you order, which is why we ask for a fill volume rather than a size name. Send the volume in liters or cups and we cut the tub so a correct portion reaches the rim rather than sitting halfway down.',
    },
    {
      q: 'Are printed popcorn bags recyclable?',
      a: 'An uncoated grease-resistant paper bag goes into the paper stream in most systems. A gloss laminated tub does not. If recycling is a priority, ask for a matte varnish rather than a lamination and we will keep the specification clean.',
    },
  ],

  related: ['custom-fries-sleeves', 'custom-beverage-sleeves', 'custom-snack-trays', 'custom-food-sleeves'],

  keywords: [
    'custom popcorn sleeves',
    'printed popcorn bags',
    'popcorn tub custom printed',
    'cinema popcorn packaging',
    'popcorn packaging wholesale',
  ],
};
