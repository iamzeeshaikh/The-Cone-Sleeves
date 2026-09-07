import type { Product } from '../types';

export const product: Product = {
  slug: 'custom-sandwich-sleeves',
  name: 'Custom Sandwich Sleeves',
  shortName: 'Sandwich Sleeves',
  group: 'food',

  seo: {
    title: 'Custom Sandwich Sleeves | Sandwich Sleeve Packaging',
    description:
      'Custom sandwich sleeves in straight or angle-cut styles, with or without a window. Printed from 500 pieces, free proof, 6–7 day turnaround. Ask for a quote.',
  },

  hero: {
    eyebrow: 'Straight or angle cut · Window optional',
    h1: 'Custom Sandwich Sleeves',
    lead: 'Printed sleeves that hold a half-cut sub, baguette or wrap together, show the filling to the customer, and give you a clean panel for your label. Made for delis, cafes and grab-and-go chillers.',
    bullets: ['Angle or straight cut', 'Open window optional', '500 piece minimum', 'Free digital proof'],
  },

  quickAnswer:
    'Sandwich sleeves are printed board wraps that hold a cut sandwich, baguette or wrap together and present the filling face outward for display. They come straight-cut for a full sandwich or angle-cut for a diagonally halved sub, with an optional open window. The Cone Sleeves prints them from 500 pieces per design, with a free digital proof and 6–7 business day production.',

  images: [
    {
      src: '/media/2025/08/Custom-Sandwich-Sleeves-768x768-1.jpg',
      alt: 'Angle-cut sandwich sleeve holding a halved sub with the filling showing',
    },
    {
      src: '/media/2025/08/Sandwich-Sleeves-Packaging-768x768-1.jpg',
      alt: 'Printed sandwich sleeve packaging lined up in a deli chiller',
    },
    {
      src: '/media/2025/08/Sandwich-Sleeves-768x768-1.jpg',
      alt: 'Kraft sandwich sleeve wrapped around a pressed panini for counter service',
    },
    {
      src: '/media/2025/08/Custom-Sandwich-Sleeves-Packaging-768x768-1.jpg',
      alt: 'Set of branded sandwich sleeves in two color designs ready for service',
    },
  ],

  gallery: [
    {
      src: '/media/lib/custom-sandwich-sleeves/custom-sandwich-sleeves.jpg',
      alt: 'Kraft sandwich sleeve holding a filled baguette',
    },
    {
      src: '/media/lib/custom-sandwich-sleeves/custom-sandwich-sleeves-packaging.jpg',
      alt: 'Sandwich wrapped in printed paper and set on a kraft board base',
    },
    {
      src: '/media/lib/custom-sandwich-sleeves/sandwich-sleeves-packaging.jpg',
      alt: 'Blue printed sandwich sleeve with a clear window over the filling',
    },
    {
      src: '/media/lib/custom-sandwich-sleeves/sandwich-sleeves.jpg',
      alt: 'Club sandwich halves held together by a printed board sleeve',
    },
  ],


  specs: [
    { label: 'Fits', value: 'Half-cut subs, baguettes, paninis, club sandwiches, wraps and rolls' },
    { label: 'Cut style', value: 'Straight band, angled front for a diagonal cut, or stepped tuck-close' },
    { label: 'Window', value: 'Open die-cut aperture on request — no film, so the board still recycles' },
    { label: 'Board', value: 'White SBS cardstock, natural kraft or recycled board' },
    { label: 'Printing', value: 'Full-color CMYK, single-color logo or Pantone spot colors' },
    { label: 'Label space', value: 'Blank panel sized for your allergen, date or price sticker' },
    { label: 'Minimum order', value: '500 pieces per design' },
    { label: 'Turnaround', value: '6–7 business days after proof approval; 3–4 day rush on request' },
  ],

  features: [
    {
      title: 'Shows the filling',
      text: 'An angled front or an open window puts the cut face of the sandwich in view, which is what sells it from a chiller shelf.',
    },
    {
      title: 'Holds two halves',
      text: 'A cut sub tries to fall apart. The sleeve keeps both halves aligned so the sandwich still looks built when the customer opens it.',
    },
    {
      title: 'Room for your label',
      text: 'We leave a clean panel where your allergen, date or price sticker goes, so the label never lands across your logo.',
    },
    {
      title: 'Stacks and faces',
      text: 'Flat sides mean sleeves sit upright and face forward in a grab-and-go unit instead of sliding into a heap by mid-morning.',
    },
    {
      title: 'Handles a hot panini',
      text: 'Board takes the steam off a pressed sandwich better than film, which fogs and drips as soon as it comes out of the press.',
    },
    {
      title: 'Fits your bread',
      text: 'A 12-inch sub, a sourdough round and a tortilla wrap need three different dielines. We cut to the bread you actually buy.',
    },
  ],

  useCases: [
    'Delis and sub shops',
    'Cafes and coffee bars',
    'Grab-and-go retail chillers',
    'Office and event catering',
    'Bakery counters',
    'Hospital and campus food halls',
    'Farm shops and forecourt stores',
  ],

  sections: [
    {
      h2: 'Straight band or angle cut?',
      html: `<p>This is the first thing to settle, because it changes the dieline and the way staff pack.</p>
      <ul>
        <li><strong>Straight band</strong> — a plain wrap around the middle of a whole sandwich, roll or panini. Fastest to load, cheapest per piece, and the right answer when the sandwich is served to a table or bagged for takeout rather than displayed.</li>
        <li><strong>Angle cut</strong> — the front edge is cut on a diagonal so a sub or baguette halved at 45 degrees sits with its cut face exposed. This is the display format. The customer sees the filling, not the crust, and the sandwich is doing the selling.</li>
        <li><strong>Stepped or tuck-close</strong> — a taller back panel with a folded front, used where a loaded club sandwich needs the halves held tightly and the pack still needs to stand up.</li>
      </ul>
      <p>Delis with a chiller almost always want the angle cut. Cafes serving to the table are usually better off with the plain band, and many kitchens order both on one artwork so the branding matches across the counter and the shelf.</p>`,
    },
    {
      h2: 'Should your sandwich sleeve have a window?',
      html: `<p>A window is an open die-cut aperture in the front panel. There is no film across it, which keeps the sleeve in the paper recycling stream and avoids the fogging you get with a plastic-fronted pack.</p>
      <p>The argument for one is simple: shoppers buy the sandwich they can see. In a self-service chiller, an exposed cut face lifts a pack above the ones wrapped in printed board that hides everything. The argument against is print area — every square inch of window is an inch you cannot print on, and on a small sleeve that can leave no room for a logo that reads at arm’s length.</p>
      <p>A window also loses on anything wet or dressed, since an open aperture will not hold sauce in, and it weakens the front panel, so a large opening needs heavier board. If display is the goal but the filling is messy, the angle cut alone gives most of the visibility — see our notes on <a href="/blog/cone-sleeve-materials-explained/">board choices for printed sleeves</a>.</p>`,
    },
    {
      h2: 'Packing for a grab-and-go chiller',
      html: `<p>Retail display is a different job from table service, and it is the part most sandwich packaging gets wrong. In a chiller the sleeve has three tasks at once: stand up, face forward, and carry the information a shopper and a store need before the pack is opened.</p>
      <p>Plan the label space before the artwork. Allergen and ingredient lists, date coding and a price or barcode sticker all have to land somewhere, and if you have not reserved a panel they will end up over your logo. We mark a clear zone on the proof sized to the label stock you actually use — tell us the label dimensions and where your printer applies it.</p>
      <p>Facing matters too. A sleeve with flat sides and a square base holds its line in a stacked unit; a loose band slumps and the shelf looks picked over by ten in the morning. If your display is an open counter rather than a chiller, a <a href="/custom-food-trays/">printed open food tray</a> presents cut sandwiches flat and is what most buyers mean when they ask for an open sandwich tray.</p>`,
    },
    {
      h2: 'Board, print and getting artwork right',
      html: `<p>White SBS cardstock is the usual pick for retail, because pack shots, ingredient photography and light backgrounds all hold their color on it. Natural kraft reads as artisan and suits a one- or two-color logo, but it shifts every printed color warmer, so a fresh green salad graphic will not look fresh on brown board. Recycled board sits close to white for sharpness with a visibly reclaimed texture.</p>
      <p>Print in full-color CMYK for photographic or illustrated designs, a single color where the logo is doing all the work, or Pantone spot colors when the sleeve has to match cups and bags already in your store.</p>
      <p>Send artwork as PDF, AI or EPS at 300 dpi with 3 mm bleed. On an angle-cut sleeve, watch the diagonal: type set parallel to the bottom edge will look crooked against the cut, so we usually align key text to the angle instead. Our guide to <a href="/blog/artwork-setup-for-printed-sleeves/">preparing artwork for printed sleeves</a> covers the file problems that cause most proofing delays, and dieline setup is free either way.</p>`,
    },
  ],

  faqs: [
    {
      q: 'What is a sandwich sleeve?',
      a: 'It is a printed board wrap that goes around a sandwich rather than enclosing it. It holds a cut sandwich together, keeps hands off the bread, presents the filling to the customer and carries your branding and label. Delis use them in chillers; cafes use them for counter and table service.',
    },
    {
      q: 'What is an angle-cut sandwich sleeve?',
      a: 'One with a diagonal front edge, made for a sub or baguette cut at 45 degrees. The cut face of the sandwich sits proud of the board so the filling is visible. It is the format almost every grab-and-go chiller uses, because a shopper buys what they can see.',
    },
    {
      q: 'Will one sleeve fit subs, wraps and paninis?',
      a: 'Rarely. A 12-inch sub, a tortilla wrap and a pressed panini differ in both girth and length, and a sleeve loose enough for all three holds none of them properly. Most kitchens run two dielines on the same artwork. Send the bread you buy and we will tell you which sizes you actually need.',
    },
    {
      q: 'Can I get a window in my sandwich sleeve?',
      a: 'Yes, as an open die-cut aperture with no film across it, which keeps the whole sleeve recyclable. Remember that the window costs you print area and some panel stiffness, so on smaller sleeves we often suggest a heavier board or a slightly smaller opening than first drawn.',
    },
    {
      q: 'Where do allergen and price labels go?',
      a: 'On a panel we reserve for them at the proof stage. Give us the size of your label stock and where your applicator places it, and we keep that area clear of artwork. Getting this right at proof avoids the common outcome of a price sticker sitting squarely over your logo.',
    },
    {
      q: 'Do sandwich sleeves work for hot pressed sandwiches?',
      a: 'They work better than film. Board lets steam out of a hot panini instead of trapping it, so the crust does not go soft in the first two minutes. For very oily fillings, ask for a laminated stock, which keeps the print clean where the sandwich sits.',
    },
    {
      q: 'Do you make open sandwich trays as well as sleeves?',
      a: 'Yes. Sleeves are for a sandwich in a hand or a chiller; an open tray is for cut halves presented flat on a counter or a catering table. Both print from the same artwork, so a deli can run matching sleeves and trays. Ask for both on one quote and compare.',
    },
  ],

  related: ['custom-burger-sleeves', 'custom-food-sleeves', 'custom-food-trays', 'custom-hot-dog-sleeves'],

  keywords: [
    'custom sandwich sleeves',
    'sandwich sleeve packaging',
    'sandwich sleeve',
    'sandwich sleeves',
    'printed sandwich sleeves',
    'angle cut sandwich sleeve',
    'wholesale sandwich sleeves',
    'sandwich sleeves with window',
  ],
};
