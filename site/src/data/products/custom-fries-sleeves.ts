import type { Product } from '../types';

export const product: Product = {
  slug: 'custom-fries-sleeves',
  name: 'Custom Fries Sleeves',
  shortName: 'Fries Sleeves',
  group: 'food',

  seo: {
    title: 'Custom Fries Sleeves & Scoops | Printed Wholesale',
    description:
      'Printed fries sleeves, scoops and fry cones in grease-resistant board. Any portion size, from 500 pieces with a free dieline, digital proof and 6–7 day turnaround.',
  },

  hero: {
    eyebrow: 'Scoops, cones and cartons · Grease-resistant',
    h1: 'Custom Fries Sleeves',
    lead: 'The open holder that fries actually get served in: a scoop, a cone or a squared carton, printed to your artwork and cut to the portion you sell rather than to whatever the wholesaler had in stock.',
    bullets: ['500 piece minimum', 'Grease-resistant board', 'Any portion size', 'Free digital proof'],
  },

  quickAnswer:
    'Fries sleeves are open board holders — scoops, cones or cartons — that hold a portion of fries upright and keep grease off the hand. The Cone Sleeves prints them on grease-resistant white or kraft board, cut to your portion size, from 500 pieces per design with a free proof and 6–7 business day production.',

  images: [
    {
      src: '/media/lib/custom-fries-sleeves/custom-fries-sleeves.jpg',
      alt: 'White and red printed fries scoop filled with fries beside chilies',
    },
    {
      src: '/media/lib/custom-fries-sleeves/fries-sleeves.jpg',
      alt: 'Red and white striped party pack fry carton filled with fries',
    },
    {
      src: '/media/lib/custom-fries-sleeves/fries-sleeves-packaging.jpg',
      alt: 'Green printed fry carton holding a full portion of fries',
    },
  ],

  gallery: [
    {
      src: '/media/lib/custom-fries-sleeves/custom-fries-sleeves-packaging.jpg',
      alt: 'Fry scoop printed with a photograph of fries on a grey backdrop',
    },
    {
      src: '/media/lib/french-fries-holder-paper/custom-french-fries-holder-paper.jpg',
      alt: 'Plain red board fry scoop shown empty from the front',
    },
    {
      src: '/media/lib/french-fries-holder-paper/french-fries-holder-paper-packaging.jpg',
      alt: 'Green printed fry scoop carrying a cartoon potato character',
    },
    {
      src: '/media/lib/french-fries-holder-paper/french-fries-holder-paper.jpg',
      alt: 'Plain white fry scoop filled to the rim with fries',
    },
    {
      src: '/media/lib/cone-fries-packaging/cone-fries-packaging.jpg',
      alt: 'Kraft board cone holding a portion of churros',
    },
    {
      src: '/media/lib/cone-fries-packaging/cone-packaging.jpg',
      alt: 'White fry cone printed with a red and yellow zigzag pattern',
    },
    {
      src: '/media/lib/cone-fries-packaging/custom-cone-fries-packaging.jpg',
      alt: 'Patterned fry cone printed edge to edge with a repeating wordmark',
    },
  ],

  specs: [
    { label: 'Shapes', value: 'Scoop, squared carton, or rolled fry cone' },
    { label: 'Board', value: 'Grease-resistant white board or natural kraft, 280–350 gsm' },
    { label: 'Portions', value: 'Regular, large and sharing sizes; cut to your own portion weight' },
    { label: 'Printing', value: 'Full-color CMYK, single-color logo or Pantone spot colors' },
    { label: 'Finish', value: 'Uncoated or matte varnish; gloss where the artwork is photographic' },
    { label: 'Minimum order', value: '500 pieces per design; volume pricing from 1,000 pieces' },
    { label: 'Turnaround', value: '6–7 business days after proof approval; 3–4 day rush on request' },
    { label: 'Packing', value: 'Nested flat or pre-formed, depending on the shape; stated on the quote' },
  ],

  features: [
    {
      title: 'Portion, not guesswork',
      text: 'Cut to hold your actual serving weight, so staff fill to the rim instead of eyeballing a half-empty stock carton.',
    },
    {
      title: 'Grease stays off hands',
      text: 'Treated board keeps oil in the holder rather than soaking through onto fingers within a minute of service.',
    },
    {
      title: 'Stands up in a bag',
      text: 'A squared base keeps the holder upright inside a takeaway bag, which is what stops fries arriving at the bottom of it.',
    },
    {
      title: 'Big printing area',
      text: 'The front face of a scoop is one of the largest flat surfaces in fast-food packaging, and it is at eye level while the customer eats.',
    },
    {
      title: 'Three shapes, one price band',
      text: 'Scoops, cartons and cones all quote within the same range, so the decision can be about service rather than cost.',
    },
    {
      title: 'Short runs for specials',
      text: 'Five hundred pieces covers a loaded-fries special or a match-day print without a pallet of leftovers.',
    },
  ],

  useCases: [
    'Burger bars and diners',
    'Fried chicken counters',
    'Loaded fries and poutine stalls',
    'Stadium and cinema concessions',
    'Food trucks and markets',
    'Pubs serving fries at the bar',
  ],

  sections: [
    {
      h2: 'Scoop, carton or cone',
      html: `<p>A scoop is open at the front, so the fries are visible and easy to grab. It is the fastest to fill and the shape most people picture when they think of a fry holder.</p>
<p>A squared carton holds more, stands better in a bag and keeps heat longer because less of the portion is exposed. It costs slightly more board and is the sensible choice where delivery is a real part of the business.</p>
<p>A cone is the outlier: cheap, distinctive, and excellent for a walking crowd, but awkward to set down. Street food stalls love them and sit-down venues rarely do. Kitchens that also serve churros or fried snacks often reuse the same cone dieline for both.</p>`,
    },
    {
      h2: 'Sizing to a portion weight',
      html: `<p>Most fry packaging is bought by name — regular, large, jumbo — and those names mean nothing between suppliers. The number that matters is the weight of cooked fries you intend to serve.</p>
<p>Tell us that weight and we will size the holder so a correct portion reaches the rim. It sounds like a detail, but a holder that is 20 percent too big makes every serving look mean, and one that is too small has staff overfilling and losing fries on the counter.</p>
<p>Where you sell two sizes, running both dielines together in one order is cheaper than two orders later, and both stay on file for reprints.</p>`,
    },
    {
      h2: 'Printing that survives hot oil',
      html: `<p>Fries go into the holder straight from a fryer, and steam is what lifts cheap ink. Everything here is printed with inks rated for hot food contact on a board treated to resist grease, so the design does not blotch as the portion cools.</p>
<p>Photographic artwork of the product is popular but works against you at small sizes; a picture of fries on a holder full of fries adds nothing. Flat brand color with a strong logo reads better across a counter.</p>
<p>If your fries are served alongside other items in a printed set, matching the sleeve to <a href="/custom-burger-sleeves/">printed wraps for burgers and sliders</a> keeps a meal looking like one product rather than three.</p>`,
    },
  ],

  faqs: [
    {
      q: 'Do fries sleeves arrive flat or already formed?',
      a: 'Scoops and cartons usually ship flat and pop into shape in one motion, which saves a great deal of storage. Cones normally ship pre-rolled because forming them by hand is slower than it looks. The quote states which you are getting.',
    },
    {
      q: 'How do I know what portion size to order?',
      a: 'Weigh a cooked portion as you actually serve it and send us that figure in grams or ounces. We size the holder so that weight reaches the rim. Guessing from a competitor size is the most common reason a first order looks wrong.',
    },
    {
      q: 'Will the printing hold up to loaded fries with sauce?',
      a: 'The outside print will. Sauce sits inside the holder, and the treated board resists it long enough for the portion to be eaten. For very wet loaded fries a squared carton is better than a scoop, because the sides are higher and there is less spill.',
    },
    {
      q: 'Can you match my burger packaging?',
      a: 'Yes, and it is worth doing. Send the artwork from your existing wraps or boxes and we will lay the fry holder out on the same brand colors, so a meal on a tray reads as a set rather than as three unrelated items.',
    },
    {
      q: 'Are kraft fry holders as grease-resistant as white ones?',
      a: 'Yes when specified correctly. Kraft simply hides the grease shadow better, which is why it often looks cleaner at the end of service even though the performance is the same.',
    },
    {
      q: 'What is the cheapest option for a high-volume site?',
      a: 'A cone, then a scoop, then a carton. The difference per piece is small, but across a stadium weekend it adds up. Volume pricing starts at 1,000 pieces per design and steps again at higher quantities.',
    },
  ],

  related: ['custom-burger-sleeves', 'custom-food-trays', 'custom-pizza-slice-sleeves', 'custom-snack-trays'],

  keywords: [
    'custom fries sleeves',
    'printed french fry scoop',
    'fry cone packaging custom',
    'fries packaging wholesale',
    'branded chip scoop',
  ],
};
