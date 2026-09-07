import type { Product } from '../types';

export const product: Product = {
  slug: 'custom-taco-sleeves',
  name: 'Custom Taco Sleeves',
  shortName: 'Taco Sleeves',
  group: 'food',

  seo: {
    title: 'Custom Taco Sleeves | Printed Taco Holders Wholesale',
    description:
      'Printed taco sleeves and holders that keep a taco upright and a hand clean. Single and double formats, from 500 pieces with a free dieline, proof and 6–7 day turnaround.',
  },

  hero: {
    eyebrow: 'Single and double holders · Printed to your artwork',
    h1: 'Custom Taco Sleeves',
    lead: 'Board holders that grip a taco around the shell, hold it upright and stop the filling reaching a hand. Cut for hard shells, soft tortillas or both, and printed with whatever the counter needs to say.',
    bullets: ['500 piece minimum', 'Single or double', 'Hard or soft shells', 'Free digital proof'],
  },

  quickAnswer:
    'Taco sleeves are printed board holders that wrap around a taco to keep it upright and contain the filling. The Cone Sleeves cuts them for hard shells, soft tortillas and double portions, printing from a minimum of 500 pieces per design with a free dieline and digital proof and 6–7 business day production.',

  images: [
    {
      src: '/media/lib/custom-taco-sleeves/custom-taco-sleeves-packaging.jpg',
      alt: 'Kraft arched taco holder printed with a numbered order label',
    },
    {
      src: '/media/lib/custom-taco-paper/custom-taco-paper.jpg',
      alt: 'Two filled tacos held in printed board sleeves on an orange backdrop',
    },
    {
      src: '/media/lib/custom-taco-sleeves/taco-sleeves.jpg',
      alt: 'Pink and red printed taco holder standing on a pale green backdrop',
    },
  ],

  gallery: [
    {
      src: '/media/lib/custom-taco-sleeves/taco-sleeves-packaging.jpg',
      alt: 'Yellow printed taco holder supporting a loaded hard-shell taco',
    },
    {
      src: '/media/lib/custom-taco-paper/custom-taco-paper-packaging.jpg',
      alt: 'Pink arched taco holder printed with a playful wordmark',
    },
    {
      src: '/media/lib/custom-taco-paper/custom-taco-wrapping-paper-packaging.jpg',
      alt: 'Red printed taco wrap opened to show a hard shell inside',
    },
    {
      src: '/media/lib/custom-taco-paper/custom-taco-wrapping-paper.jpg',
      alt: 'Two navy printed taco holders carrying filled soft tacos',
    },
    {
      src: '/media/lib/custom-taco-paper/taco-paper-packaging.jpg',
      alt: 'Wide soft taco supported by a printed board sleeve',
    },
    {
      src: '/media/lib/custom-taco-paper/taco-paper.jpg',
      alt: 'Two yellow and grey taco holders standing side by side',
    },
    {
      src: '/media/lib/custom-taco-paper/taco-wrapping-paper-packaging.jpg',
      alt: 'Red patterned taco holder with a decorative papel picado print',
    },
    {
      src: '/media/lib/custom-taco-paper/taco-wrapping-paper.jpg',
      alt: 'Kraft printed wraps holding two loaded burritos',
    },
  ],

  specs: [
    { label: 'Formats', value: 'Single holder, double holder, or a folded wrap for soft tortillas' },
    { label: 'Board', value: 'Grease-resistant white board or natural kraft, 280–350 gsm' },
    { label: 'Sizes', value: 'Cut for 4.5, 5 and 6 inch shells; custom widths for oversized tortillas' },
    { label: 'Printing', value: 'Full-color CMYK, single-color logo or Pantone spot colors' },
    { label: 'Finish', value: 'Uncoated or matte varnish; gloss where the design is photographic' },
    { label: 'Minimum order', value: '500 pieces per design; volume pricing from 1,000 pieces' },
    { label: 'Turnaround', value: '6–7 business days after proof approval; 3–4 day rush on request' },
    { label: 'Artwork', value: 'PDF, AI or EPS at 300 dpi with 3 mm bleed; dieline supplied free' },
  ],

  features: [
    {
      title: 'Holds the shell shut',
      text: 'The sleeve grips the sides so a hard shell cannot spring open and lose its filling on the first bite.',
    },
    {
      title: 'Stands on a counter',
      text: 'A flat-bottomed holder lets a filled taco sit upright while the second one is made, which speeds up a two-taco order.',
    },
    {
      title: 'Doubles without a tray',
      text: 'A double holder carries two tacos in one hand, so a standard order does not need a tray or a second piece of packaging.',
    },
    {
      title: 'Grease-resistant board',
      text: 'Treated stock keeps oil and sauce from soaking through, which matters more on a taco than on almost anything else.',
    },
    {
      title: 'Prints large',
      text: 'The outer face is a broad flat panel, which is why taco holders carry some of the best printed artwork in street food.',
    },
    {
      title: 'Soft or hard',
      text: 'The same dieline family covers rigid shells and folded tortillas, so a mixed menu does not need two suppliers.',
    },
  ],

  useCases: [
    'Taquerias and taco trucks',
    'Mexican quick-service chains',
    'Festival and market stalls',
    'Late-night and delivery kitchens',
    'Stadium and arena concessions',
    'Catering for parties and events',
  ],

  sections: [
    {
      h2: 'Single, double or wrap',
      html: `<p>A single holder is the cheapest per piece and the fastest to fill, and it suits a menu where tacos are priced individually. A double holds two side by side, which is what most customers actually order, and it removes the need for a tray underneath.</p>
<p>A folded wrap is different again: a printed sheet closed around a soft tortilla, more like a burrito wrap than a holder. It contains a wet filling better than an open sleeve but has to be unwrapped rather than eaten from.</p>
<p>Most sites end up ordering a double for the counter and a wrap for delivery, since delivery is where a soft taco does most of its damage inside a bag.</p>`,
    },
    {
      h2: 'Shell size decides the dieline',
      html: `<p>Hard shells vary more than people expect. A 4.5 inch shell and a 6 inch shell need different sleeves, and a sleeve cut for the smaller one will crack the larger shell as staff push it in.</p>
<p>Measure the shell across its widest point and at its height when it is standing, and send both figures. If you use more than one shell size, we will cut two dielines in the same order rather than compromising on one.</p>
<p>Soft tortillas need a slightly looser cut because they are filled before they are placed, and a tight sleeve squeezes the filling out of the back. The proof lets you test that with a real taco before the run is printed.</p>`,
    },
    {
      h2: 'Board that copes with a wet filling',
      html: `<p>Taco fillings are the hardest test in fast food packaging: hot, oily and often wet with salsa. Ordinary board goes translucent within a minute and loses its printed design not long after.</p>
<p>We specify a grease-resistant board rather than a plastic-lined one, which keeps the holder in the paper recycling stream while still standing up to service. On a very wet menu, we will suggest the heavier grade rather than let a first order disappoint.</p>
<p>Kitchens serving loaded sides alongside tacos usually order these together with <a href="/custom-fries-sleeves/">printed scoops for fries and loaded sides</a>, so the whole tray is on one brand and one board specification.</p>`,
    },
  ],

  faqs: [
    {
      q: 'Do these work with soft tortillas as well as hard shells?',
      a: 'Yes, with a slightly different cut. A soft taco is filled before it goes into the holder, so the sleeve is cut a little looser to avoid squeezing the filling out of the back. Tell us which you serve and the dieline is adjusted accordingly.',
    },
    {
      q: 'Can one holder carry two tacos?',
      a: 'A double holder is a standard format and it is the one most taquerias end up ordering. It carries two tacos upright in one hand and removes the need for a tray, so it often works out cheaper per order than two singles.',
    },
    {
      q: 'Will salsa soak through the board?',
      a: 'Not within normal eating time on the grease-resistant grade we use. If your menu leans on very wet fillings, ask for the heavier board. It costs a little more per piece and it is the difference between a holder that survives and one that does not.',
    },
    {
      q: 'Are these suitable for delivery orders?',
      a: 'An open holder is fine inside a rigid delivery box but poor loose in a bag. For delivery we usually suggest the folded wrap format, which closes fully around the taco and keeps the filling in place while the bag moves.',
    },
    {
      q: 'Can I print on the inside of the holder?',
      a: 'You can, and a short line inside the arch is visible when the taco is lifted out. Keep it simple: the inner face is partly hidden by the shell and anything detailed there is wasted.',
    },
    {
      q: 'How small an order can I place for a festival?',
      a: 'Five hundred pieces per design, which is a normal weekend for a single stall. Many operators print a dated festival design at that quantity and keep a plain kraft holder as the everyday stock.',
    },
  ],

  related: ['custom-fries-sleeves', 'custom-burger-sleeves', 'custom-food-sleeves', 'custom-snack-trays'],

  keywords: [
    'custom taco sleeves',
    'printed taco holder',
    'taco packaging wholesale',
    'double taco holder custom',
    'taco wrap printed board',
  ],
};
