import type { Product } from '../types';

export const product: Product = {
  slug: 'custom-crepe-sleeves',
  name: 'Custom Crepe Sleeves',
  shortName: 'Crepe Sleeves',
  group: 'cone',

  seo: {
    title: 'Custom Crepe Sleeves | Grease-Resistant, Printed to Order',
    description:
      'Custom crepe sleeves on grease-resistant board that holds a hot, rolled crepe upright. Printed to your artwork, 500 minimum, 6–7 day turnaround. Get a quote.',
  },

  hero: {
    eyebrow: 'Grease-resistant board · Cut to your crepe',
    h1: 'Custom Crepe Sleeves',
    lead: 'A cone-shaped paper wrap that takes the butter, sugar and Nutella running down a rolled crepe before any of it reaches your customer’s hand. Printed to order for creperies, dessert bars, food trucks and night markets.',
    bullets: ['500 piece minimum', 'Grease-resistant face', 'Free digital proof', '6–7 day turnaround'],
  },

  quickAnswer:
    'Crepe sleeves are cone-shaped paper wraps that hold a rolled, filled crepe upright and keep grease and heat off the hand. The Cone Sleeves prints them on food-safe white SBS, kraft or recycled board with a grease-resistant laminated face, cut to your crepe size, from 500 pieces per design, with a free digital proof and 6–7 business day production.',

  images: [
    {
      src: '/media/2025/08/Custom-Crepe-Sleeves-Packaging-768x768-1.jpg',
      alt: 'Printed crepe sleeve holding a rolled crepe filled with fruit and cream',
    },
    {
      src: '/media/2025/08/Custom-Crepe-Sleeves-768x768-1.jpg',
      alt: 'Branded cone-shaped crepe sleeve with full-color artwork on the front face',
    },
    {
      src: '/media/2025/08/Crepe-Sleeves-768x768-1.jpg',
      alt: 'Stack of kraft crepe sleeves ready for service on a dessert counter',
    },
    {
      src: '/media/2025/08/Crepe-Sleeves-Packaging-768x768-1.jpg',
      alt: 'Crepe sleeves flat-packed in bulk before a market stall opens',
    },
  ],

  specs: [
    { label: 'Fits', value: 'Rolled crepes from roughly 8 to 11 inches long; mini and loaded savory rolls cut to size' },
    { label: 'Board', value: 'White SBS cardstock, natural kraft or recycled board' },
    { label: 'Grease barrier', value: 'Laminated inner face for butter, oil, chocolate spread and condensed milk' },
    { label: 'Printing', value: 'Full-color CMYK, single-color logo or Pantone spot colors' },
    { label: 'Finish', value: 'Gloss or matte lamination, spot UV, foil stamping, or uncoated' },
    { label: 'Minimum order', value: '500 pieces per design' },
    { label: 'Turnaround', value: '6–7 business days after proof approval; 3–4 day rush on request' },
    { label: 'Artwork', value: 'PDF, AI or EPS at 300 dpi with 3 mm bleed — we build the dieline free' },
  ],

  features: [
    {
      title: 'Holds the roll shut',
      text: 'A crepe is not rigid like a cone — it wants to unroll. The sleeve is the only thing keeping the fold closed from the first bite to the last.',
    },
    {
      title: 'Heat off the hand',
      text: 'Crepes leave the griddle hot and stay hot in the middle. Board plus an air gap lets staff hand one over immediately instead of waiting for it to cool.',
    },
    {
      title: 'Grease barrier where it counts',
      text: 'The laminated face stops butter, oil and chocolate spread wicking through and darkening the board halfway through service.',
    },
    {
      title: 'One-hand service',
      text: 'Roll, drop it in, hand it over. No plate, no cutlery, no tray, which is what makes crepes work at a busy stall.',
    },
    {
      title: 'A tall printable face',
      text: 'The cone shape gives you a wide panel at the top that stays visible while someone eats — better logo real estate than a napkin or a bag.',
    },
    {
      title: 'One sleeve, both menus',
      text: 'The same sleeve carries a Nutella-banana crepe and a ham and cheese one, so you stock a single item instead of two.',
    },
  ],

  useCases: [
    'Creperies and dessert bars',
    'Night markets and street stalls',
    'Crepe carts and food trucks',
    'Mall and food-court kiosks',
    'Fairs, festivals and beach fronts',
    'Campus and stadium concessions',
    'Wedding and party catering',
  ],

  sections: [
    {
      h2: 'Why crepe sleeves fail, and what stops it',
      html: `<p>Two things go wrong with crepe packaging, and both show up within a minute of service. The first is grease. Butter, oil, chocolate spread and condensed milk soak straight into uncoated board, so the sleeve darkens, goes limp and the crepe starts to sag in the customer’s hand. The second is the roll itself. Unlike a baked cone, a rolled crepe has no structure — if the sleeve is loose or too shallow, the fold opens and the filling slides toward the tip.</p>
      <p>The fix is a laminated inner face and enough board weight to stay rigid once warm filling is pressed against it. We spec the coating to the menu: a shop selling sugar-and-lemon crepes needs less barrier than one loading rolls with ice cream, chocolate and cream. Our guide to <a href="/blog/cone-sleeve-materials-explained/">cone sleeve materials and board weights</a> covers where each option sits.</p>
      <p>Depth matters too. A sleeve that only covers the bottom third looks neat in a photograph and fails in the street. We cut ours to reach past the widest part of the roll so the fold is held, not just decorated.</p>`,
    },
    {
      h2: 'Coated white, kraft or recycled board?',
      html: `<p>All three are food safe and all three take print well. The difference is the surface behind your artwork and how much grease the crepe is going to put into it.</p>
      <ul>
        <li><strong>Coated white SBS</strong> — the brightest ground and the easiest to keep grease-resistant. Fruit photography, pastel palettes and dessert-menu artwork all reproduce cleanly. This is the default for a sweet-led creperie.</li>
        <li><strong>Natural kraft</strong> — warm brown, reads as market-stall and handmade. Grease shows on kraft faster than on coated white, so if you serve loaded savory crepes, take the lamination rather than leaving it bare.</li>
        <li><strong>Recycled board</strong> — flecked and visibly reclaimed, for shops leading on waste. Print sharpness is close to white board; the flecks read as texture rather than a defect.</li>
      </ul>
      <p>Ask for the same artwork proofed on two stocks before you commit. Seeing a design on kraft next to coated white answers the question in a minute, and there is no charge for the comparison.</p>`,
    },
    {
      h2: 'Sizing a sleeve to a rolled crepe',
      html: `<p>Measure the finished roll, not the flat crepe. What we need is the length from the tip to the open top and the diameter across the mouth once it is filled. A crepe rolled around a scoop of ice cream is a different object from the same batter folded flat with ham.</p>
      <p>Most shops land near two shapes: around 8 inches long with a 2.5 inch mouth for a plain rolled crepe, and around 10 inches with a 3 inch mouth for larger filled ones. Mini crepes for kids and oversized night-market rolls are both routine — send us a made-up crepe, or a photo with a ruler beside it, and we cut the dieline to that.</p>
      <p>If you are ordering sleeves for the first time and are not sure what to measure, our short walkthrough on <a href="/blog/how-to-choose-cone-sleeve-size/">choosing the right cone sleeve size</a> lists the three dimensions to send.</p>`,
    },
    {
      h2: 'Sleeve, foil wrap or a paper cone bag?',
      html: `<p>A <strong>printed sleeve</strong> holds the roll rigid, keeps the top of the crepe visible, and gives you a full-color panel at the height a customer looks at. It is the only one of the three that both structures the food and advertises you.</p>
      <p>A <strong>foil wrap</strong> holds heat better and costs less per piece, but it collapses around the crepe, hides the filling entirely, and takes almost no print. It suits savory crepes eaten straight away rather than anything you want photographed.</p>
      <p>A <strong>paper cone bag</strong> is cheap and quick, but it has no rigidity — the crepe slumps, the bag creases, and grease marks spread across whatever you printed on it. Bags work as an outer carrier, not as the thing holding the food.</p>
      <p>Plenty of stalls run a sleeve for the crepe and a rigid holder for multiples, so nobody has to juggle four at once. Our <a href="/custom-food-trays/">printed food trays for counters</a> cover that side of service.</p>`,
    },
  ],

  faqs: [
    {
      q: 'Will butter and Nutella soak through a crepe sleeve?',
      a: 'Not through a laminated face. Bare uncoated board will absorb warm butter and chocolate spread and darken within a couple of minutes. We laminate the inner face by default on crepe sleeves for that reason, and step the barrier up if your rolls are heavily filled.',
    },
    {
      q: 'What size crepe sleeve fits a standard rolled crepe?',
      a: 'A common plain roll takes about an 8 inch sleeve with a 2.5 inch mouth; larger filled crepes usually need around 10 inches and a 3 inch mouth. Because rolling technique varies between shops, we size from your actual crepe rather than a chart.',
    },
    {
      q: 'Can I use these for a crepe straight off the griddle?',
      a: 'Yes. That is the normal case. Board is a poor conductor, so the sleeve takes the heat off the customer’s palm and lets your staff serve without a cooling pause. The top of the crepe stays open, which also lets steam escape instead of going soggy.',
    },
    {
      q: 'Is a crepe sleeve the same as a crepe cone holder?',
      a: 'People use both names for this product, along with crepe wrapper and crepe cone packaging. If a supplier quotes you a crepe holder, you are comparing the same thing. A separate rigid stand that parks several filled crepes upright on a counter is a different item.',
    },
    {
      q: 'Can one sleeve work for both sweet and savory crepes?',
      a: 'Usually yes, and most shops prefer it — one item to stock, one artwork to reorder. The exception is menus where the savory rolls are much fatter than the sweet ones. In that case we cut two mouth widths from the same design so the print still matches.',
    },
    {
      q: 'Can you print a QR code or our social handle on the sleeve?',
      a: 'Yes. QR codes, handles, short taglines and loyalty prompts all print fine. Keep a QR code at least 20 mm square and away from the fold line, since a code printed across a crease often will not scan. We check that on the digital proof before printing.',
    },
    {
      q: 'Do these work for churros, waffle sticks or bubble waffles?',
      a: 'The same cone-shaped sleeve suits churros and rolled waffles, and we cut it wider for bubble waffles. If your dessert counter runs several of these, look at <a href="/custom-dessert-sleeves/">printed dessert sleeves for sweet counters</a>, which we build around mixed handheld menus.',
    },
  ],

  related: ['custom-dessert-sleeves', 'waffle-cone-sleeves', 'ice-cream-cone-sleeves', 'custom-food-sleeves'],

  keywords: [
    'crepe sleeves',
    'custom crepe sleeves',
    'crepe sleeve',
    'crepe packaging',
    'custom crepe packaging',
    'custom crepe cone packaging',
    'custom crepe holder',
    'crepe cones wholesale',
  ],
};
