/**
 * Blog posts.
 *
 * WordPress never published a post, so there is no original design to match.
 * These use the site's own containers, typography and colour tokens rather than
 * inventing a new look.
 *
 * Internal links follow the house rule: at most one per paragraph, descriptive
 * 3–8 word anchors, and only URLs that exist on this site.
 */
export interface Post {
  slug: string;
  title: string;
  description: string;
  published: string;
  updated?: string;
  readingMinutes: number;
  image: string;
  imageAlt: string;
  /** Rendered body, authored as HTML so it can use the theme's classes. */
  body: string;
}

export const POSTS: Post[] = [
  {
    slug: 'how-to-choose-cone-sleeve-size',
    title: 'How to Choose the Right Cone Sleeve Size for Your Shop',
    description:
      'A practical guide to measuring cones and picking a sleeve size that grips properly — covering standard, waffle, sugar and kiddie cones.',
    published: '2026-08-15T09:00:00+00:00',
    readingMinutes: 5,
    image: '/media/2023/03/waffle-cone-paper-sleeves-1024x1024-1.jpg',
    imageAlt: 'Custom printed waffle cone sleeves stacked ready for use',
    body: `
<p>A cone sleeve only does its job when it fits. Too loose and it slides down the cone with the first drip; too tight and staff tear it forcing the cone in during a rush. Getting the size right is the single decision that most affects whether your sleeves actually get used behind the counter.</p>

<h2>Measure the cone, not the sleeve</h2>
<p>Start with the cone you already buy. Take three measurements with a ruler or callipers: the diameter across the open top, the diameter roughly 40&nbsp;mm down from the rim, and the total height. The second measurement matters most, because that is where the sleeve actually grips. Cones from different suppliers vary more than most owners expect, so measure the batch you use rather than trusting a catalogue figure.</p>

<p>Do this with several cones from the same box. Baked cones are a food product, not a machined part, and a two-to-three millimetre spread across a batch is completely normal. Size for the middle of that spread, not the smallest cone you can find.</p>

<h2>The four sizes that cover most shops</h2>
<p>Most dessert businesses land on one of four profiles. Standard cones — the everyday cake or wafer cone — usually take a sleeve in the 55–60&nbsp;mm range at the grip point. Waffle cones are wider and more tapered, generally 65–75&nbsp;mm, which is why our <a href="/waffle-cone-sleeves/">custom waffle cone sleeves</a> are cut with a deeper taper than a standard wrap.</p>

<p>Sugar cones sit between the two, with a tighter taper and a crisper edge that can cut a thin sleeve if the paper is too light. Kiddie and mini cones need a shorter sleeve so it does not swallow the cone entirely and hide the ice cream, which is the part the customer is buying.</p>

<h2>Taper is as important as diameter</h2>
<p>Two cones can share a rim diameter and still need different sleeves, because the rate at which they narrow is different. A sleeve cut for a gentle taper will gap along one edge when wrapped around a steep cone, and that gap is where drips escape. When you request a quote it is worth sending the cone measurements at two heights rather than one — it takes thirty seconds and removes most of the guesswork. Our <a href="/ice-cream-cone-sleeves/">custom ice cream cone sleeves</a> are cut to the taper you supply rather than to a fixed template.</p>

<h2>Account for what goes in the cone</h2>
<p>A soft-serve swirl sits higher and wider than a scoop, and gelato is often served with a spade that overhangs the rim. If your product regularly sits proud of the cone, a slightly taller sleeve protects the customer's hand from the melt that runs down the outside rather than the inside.</p>

<p>Dipped and coated cones are their own case. A chocolate shell adds up to two millimetres of diameter and, more importantly, it is fragile — a sleeve that has to be forced on will crack the coating. Size up by a couple of millimetres for anything dipped, rolled or coated.</p>

<h2>Check the grip before you commit to a full run</h2>
<p>Ask for a physical sample and test it in the shop, not on a desk. Hand it to the person who will actually be assembling cones at peak time and watch what happens. A sleeve that works when you are concentrating can fail when someone is serving forty people an hour with one hand.</p>

<p>Three things are worth watching. Does the sleeve stay put when the cone is tilted? Can it be applied in one motion, or does it need two hands and a second attempt? And does it hold after ten minutes, once condensation has softened the paper slightly? If any of those fail, the size or the stock needs adjusting before you commit to a run. You can <a href="/get-a-free-quote/">request a free quote with your measurements</a> and get a sample cut to them.</p>

<h2>When one size is not enough</h2>
<p>Shops that serve both a standard scoop cone and a premium waffle cone usually need two sleeves. It is tempting to compromise on a single middle size to keep the order simple, but a sleeve that half-fits both ends up used for neither. The cost difference between one design and two is smaller than most people assume, because the setup is shared and only the cutting die changes.</p>

<p>If you also serve items that are not cones at all — crepes, churros, loaded waffles — those need their own wrap rather than a stretched cone sleeve. A <a href="/custom-crepe-sleeves/">purpose-made crepe sleeve</a> is a different shape entirely, with a flat base that a cone sleeve does not have.</p>

<h2>A short checklist</h2>
<p>Before you order, confirm four things: the cone diameter at the grip point, the taper between two heights, the height of the sleeve relative to your typical serve, and whether the cone is coated. With those four numbers, a manufacturer can cut a sleeve that fits the first time. Without them, you are ordering from a template and hoping.</p>

<p>If you are unsure about any measurement, send a few cones rather than the numbers. Most sizing problems are solved in a minute by someone holding the actual cone, and it is far cheaper than discovering the issue after ten thousand sleeves have been printed. Our team is happy to <a href="/contact/">talk through your cone specifications</a> before anything goes to print.</p>
`,
  },

  {
    slug: 'cone-sleeve-materials-explained',
    title: 'Cone Sleeve Materials Explained: Kraft, White SBS and Recycled Board',
    description:
      'What each cone sleeve stock actually does — grease resistance, print quality, cost and recyclability — and how to pick between them.',
    published: '2026-08-15T09:30:00+00:00',
    readingMinutes: 6,
    image: '/media/2025/08/Custom-Eco-Friendly-Cone-Sleeves.jpg',
    imageAlt: 'Eco-friendly kraft cone sleeves with printed branding',
    body: `
<p>Stock choice decides more than it looks like it does. The same artwork printed on kraft and on white board produces two different products: one reads as artisanal and handles grease well, the other reads as clean and makes colour sing. Neither is better in the abstract — they are better at different jobs.</p>

<h2>Kraft board</h2>
<p>Kraft is unbleached paperboard, which is where the brown colour comes from. It is the default for businesses that want a natural, low-processed look, and it carries an environmental story that customers understand without being told.</p>

<p>Its practical strength is grease tolerance. The fibres are longer and less processed than bleached board, so kraft holds up better against butter, chocolate and warm dough than a comparable white stock. That is why it appears so often on bakery items and why our <a href="/custom-donut-sleeves/">custom donut sleeves</a> are frequently specified in kraft.</p>

<p>The trade-off is colour. Printing on brown means every ink sits on a warm base, so pale colours shift and pure white is impossible without a white underlay. Designs built around one or two bold colours work beautifully on kraft. Photographic artwork usually does not.</p>

<h2>White SBS</h2>
<p>Solid bleached sulphate — SBS — is the bright white board most people picture when they think of printed packaging. The surface is smooth and coated, which is what makes fine detail and photographic images reproduce properly.</p>

<p>If your branding depends on a specific colour, SBS is the safer choice, because you are printing onto a neutral base rather than a brown one. Gradients, drop shadows and small reversed-out type all survive on SBS in a way they do not on kraft. It is the usual specification for <a href="/custom-cake-cone-sleeves/">custom cake cone sleeves</a> where the design carries the shelf appeal.</p>

<p>SBS is typically a little more expensive than kraft at the same thickness, and it shows grease marks more readily. For dry or lightly coated products that is irrelevant. For anything warm and buttery it is worth discussing a coating.</p>

<h2>Recycled board</h2>
<p>Recycled stocks use post-consumer content and sit between kraft and SBS on appearance — usually a grey-brown with visible fibre. They are chosen almost entirely for environmental reasons, and for businesses making a sustainability claim they are the most defensible option.</p>

<p>Be aware that recycled board is less consistent batch to batch. Colour can shift slightly between runs, and the surface is rougher, which softens fine detail. If your brand tolerates that variation it is a good choice; if you need two orders six months apart to match exactly, it is worth knowing about the variation before you commit.</p>

<h2>Thickness, and why it matters more than people think</h2>
<p>Stock is specified in points — 14pt, 16pt, 18pt and so on — where a point is a thousandth of an inch. Thicker board is stiffer, holds its shape better and feels more substantial in the hand.</p>

<p>For cone sleeves the useful range is fairly narrow. Too thin and the sleeve creases when applied and offers no protection from cold or heat. Too thick and it will not conform to the cone's curve, so it gaps. Most cone sleeves land between 14pt and 18pt, with the heavier end used where the sleeve doubles as insulation. Hot items are different again — a <a href="/custom-coffee-sleeves/">printed coffee sleeve</a> often uses corrugated or E-flute stock specifically for the air gap it creates.</p>

<h2>Coatings and finishes</h2>
<p>A coating changes how the stock behaves as much as how it looks. Gloss lifts colour and adds a little moisture resistance. Matte reduces glare and feels softer, but scuffs more visibly. Soft-touch adds a noticeably premium feel and a cost to match.</p>

<p>For food contact the question is not only aesthetic. Any coating on a surface that touches food has to be food-safe, and that is worth confirming explicitly rather than assuming. Where the sleeve only contacts the outside of a cone or wrapper, the requirement is looser than where it contacts the product directly, as it does with many <a href="/custom-food-sleeves/">custom printed food sleeves</a>.</p>

<h2>Making the choice</h2>
<p>Work backwards from the product. If it is greasy or warm, start with kraft or a coated stock and check grease resistance first. If the design is the selling point and involves photography or precise brand colours, start with SBS. If your customers actively choose you for sustainability, recycled board earns its slight inconsistency.</p>

<p>Then confirm with a physical sample of the actual stock, printed with your actual artwork. Board looks different in a shop under warm light than it does on a screen, and grease resistance is impossible to judge from a photograph. Most disappointments with packaging come from approving a PDF rather than holding the thing. If you would like samples across two or three stocks to compare side by side, <a href="/get-a-free-quote/">ask for them with your quote</a>.</p>
`,
  },

  {
    slug: 'branded-cone-sleeves-worth-it',
    title: 'Are Branded Cone Sleeves Worth It? An Honest Look at the Numbers',
    description:
      'What custom printed sleeves actually cost per serve, where the return comes from, and when plain sleeves are the smarter choice.',
    published: '2026-08-15T10:00:00+00:00',
    readingMinutes: 5,
    image: '/media/2025/08/waffle-cone-sleeves-png-transparent.png',
    imageAlt: 'Custom printed cone sleeve showing branding on the wrap',
    body: `
<p>Custom printing costs more than plain. Whether that difference earns its keep depends on how many people see the sleeve and whether your business benefits from being recognised — and for some businesses the honest answer is that it does not.</p>

<h2>Start with the per-serve cost</h2>
<p>The right unit for this decision is cost per serve, not cost per order. A quantity that sounds large in total is usually small per cone, and the gap between plain and printed narrows sharply as volume rises, because most of the printing cost is setup rather than ink.</p>

<p>That is the key economic fact. Plate or die setup is charged once, so at low volumes it dominates the price and printed sleeves genuinely are expensive per unit. At higher volumes it is spread thin and the difference between plain and printed becomes a fraction of a cent per serve. Anyone quoting you should be able to show that curve rather than a single number — you can <a href="/get-a-free-quote/">get pricing across several quantities</a> to see where it flattens for you.</p>

<h2>Where the return actually comes from</h2>
<p>The return is not the sleeve. It is the number of impressions the sleeve produces and what those impressions do.</p>

<p>A cone is carried. Unlike a wrapper that goes straight in the bin, an ice cream cone is held for several minutes, often outdoors, often in a group. That is a meaningful number of people seeing your name for each serve, at a moment when they are watching someone enjoy your product. Few forms of advertising are that well targeted or that cheap.</p>

<p>This is also why location changes the calculation. A shop on a seafront or in a market square, where customers walk away and are seen by strangers, gets far more out of branding than a dessert counter inside a food court where everyone already knows where the ice cream came from. The same logic applies to <a href="/custom-dessert-sleeves/">custom dessert sleeves</a> for takeaway items.</p>

<h2>When plain is the better call</h2>
<p>There are real cases where plain wins. If you are testing a new product and the recipe or name may change, printing ten thousand sleeves with a name you might drop is a waste. If you operate as a white-label supplier, your customer may not want your branding on their product at all.</p>

<p>Low volume is the other case. A small operation serving a few hundred cones a month may simply never reach the volume where setup cost amortises. Plain kraft with a good-quality stock looks intentional rather than cheap, and a well-designed sticker can carry the branding at a fraction of the commitment.</p>

<h2>The middle options people forget</h2>
<p>The choice is not binary. One-colour printing costs substantially less than full colour and, for a wordmark or simple logo, loses very little. A great many recognisable food brands run one or two colours on their packaging precisely because it is efficient.</p>

<p>Printing on kraft rather than white also saves money, since the stock is cheaper and you are usually printing fewer colours onto it. And a generic sleeve with a printed strip for a sticker gives you flexibility across several products without a separate run for each — useful if you also sell <a href="/custom-beverage-sleeves/">branded beverage sleeves</a> alongside cones.</p>

<h2>What to check before you commit</h2>
<p>Ask for pricing at three quantities rather than one, so you can see where setup stops dominating. Ask what the reorder cost is, since the second run of the same design should be cheaper than the first — the setup is already done. And ask what happens if you want to change the artwork later.</p>

<p>Then be honest about volume. Order for the demand you have, not the demand you hope for. Storage is not free, board absorbs humidity over time, and a design you have outgrown sitting in a stockroom is worse value than a smaller run you actually use. If you are unsure what quantity makes sense for your turnover, it is worth <a href="/contact/">talking it through before ordering</a>.</p>

<h2>Measuring whether it worked</h2>
<p>Packaging is one of the few marketing spends that is genuinely hard to attribute, so it is worth deciding in advance what evidence would convince you. Waiting until the sleeves arrive and then asking "did that help?" produces an answer based on mood rather than data.</p>

<p>Two signals are practical for a small business. The first is unprompted mentions — people arriving and referring to you by name, tagging you in photographs, or asking for the place with the branded cones. The second is repeat visits within a defined window, which you can approximate through a loyalty scheme even without a till system that tracks customers individually.</p>

<p>Photographs are the most useful of these, because they are countable and they compound. A cone that is attractive enough to be photographed puts your name in front of an audience you did not pay for, and design choices affect this more than most owners expect. High contrast, a legible name and a clean area free of small print all make a sleeve more photogenic. The same thinking applies to anything customers carry out of the shop, including <a href="/custom-food-trays/">printed food trays for shareable items</a>.</p>

<h2>The short version</h2>
<p>If your cones leave the premises and are seen by people who are not already your customers, printed sleeves are usually a good buy at moderate volume and an obvious one at high volume. If your cones are eaten where they are bought, or your volume is genuinely small, plain stock with excellent design elsewhere may serve you better. Both are legitimate answers, and the numbers for your own shop will tell you which.</p>
`,
  },

  {
    slug: 'artwork-setup-for-printed-sleeves',
    title: 'Preparing Artwork for Printed Sleeves: A Practical Checklist',
    description:
      'Bleed, resolution, colour mode, fonts and the dieline — what printers actually need, and the mistakes that cause reprints.',
    published: '2026-08-15T10:30:00+00:00',
    readingMinutes: 6,
    image: '/media/2023/04/Our-Sleeves-Are-Inspired-by-Eco-Friendly-Material.png',
    imageAlt: 'Printed cone sleeve artwork showing branding placement',
    body: `
<p>Most reprints are not caused by printing errors. They are caused by artwork that was approved before someone noticed a logo was slightly blurry or that a colour did not match the brand. Almost all of it is avoidable with a short checklist before the file leaves your desk.</p>

<h2>Work to the dieline</h2>
<p>A dieline is the flat template showing where the sleeve will be cut and folded. Ask for it before you start designing, not after — designing to a guessed shape and adapting later is where most layout problems originate.</p>

<p>The dieline shows three things: the cut line, the fold or crease positions, and the glue tab. Anything you place across a fold will be distorted slightly, and anything on the glue tab will be hidden. Keep logos and body text clear of both. On a cone sleeve the taper means a horizontal line in your design will not look horizontal once wrapped, which surprises people the first time they see a physical proof.</p>

<h2>Bleed and safety margin</h2>
<p>Bleed is artwork extended past the cut line so that a slight shift during cutting does not leave a white sliver at the edge. Three millimetres is standard. If your background colour stops exactly at the cut line, expect white edges on some units.</p>

<p>The safety margin is the inverse: keep important content a few millimetres inside the cut line so it is never trimmed off. Type sitting right at the edge looks deliberate on screen and looks like a mistake on a machine that has a tolerance.</p>

<h2>Resolution and vectors</h2>
<p>Raster images need to be at least 300&nbsp;DPI at final print size. The trap is "at final print size" — an image that is 300&nbsp;DPI at 5&nbsp;cm is 75&nbsp;DPI when scaled to 20&nbsp;cm, and it will look soft. Check resolution after scaling, not before.</p>

<p>Logos and type should be vector wherever possible. Vectors scale without loss and produce genuinely crisp edges. A logo pulled from a website is almost always too low-resolution for print, even when it looks fine on screen — screens are around 72–96&nbsp;DPI. If the only version you have came from a website, it is worth having it redrawn before it goes onto every sleeve you order.</p>

<h2>Colour mode</h2>
<p>Design in CMYK, not RGB. Screens emit light and can show colours that ink on board simply cannot reproduce; bright oranges, vivid greens and electric blues are the usual casualties. Converting at the last moment produces a dull surprise.</p>

<p>Where a brand colour must be exact — and for most food brands it must — specify a Pantone rather than relying on a CMYK build. Spot colours are mixed to a standard rather than approximated from four inks, which is why they hold up across reprints. This matters most on kraft, where every ink is affected by the brown base, as it is on <a href="/custom-sandwich-sleeves/">custom printed sandwich sleeves</a>.</p>

<h2>Fonts</h2>
<p>Outline your type or embed the fonts. A file that references a font the printer does not have will substitute something else, and the substitution is often not obvious until the job is printed.</p>

<p>Outlining converts letters to shapes, which guarantees the appearance but means the text can no longer be edited. Keep an editable copy for yourself and send the outlined version. Also be realistic about small type — text below about 6pt reversed out of a dark background tends to fill in, particularly on uncoated stocks.</p>

<h2>File format and what to send</h2>
<p>Print-ready PDF is the standard. Send it with fonts embedded or outlined, images at full resolution, colour in CMYK plus any spot colours named correctly, and bleed included.</p>

<p>It also helps to send a flattened JPEG or PNG alongside as a visual reference. If anything shifts during processing, the reference shows what the file was meant to look like. Where you are ordering several products together — say cone sleeves and <a href="/custom-food-trays/">matching custom food trays</a> — send them as separate files rather than multiple designs on one page.</p>

<h2>Always look at a proof</h2>
<p>A digital proof catches layout errors. A physical proof catches everything else: how the colour actually sits on that stock, whether the fold lands where you expected, whether small type is legible in the hand.</p>

<p>Check the proof against the brief rather than against your memory of the design. Read every word of text aloud — typos survive dozens of on-screen reviews and then appear on twenty thousand sleeves. Confirm the fold positions by wrapping the proof around an actual cone. And check the colour under the lighting your shop actually uses, which is rarely daylight. If anything is unclear, it is far cheaper to <a href="/contact/">raise it before the run starts</a> than after.</p>

<h2>The checklist</h2>
<p>Before sending: designed to the supplied dieline, 3&nbsp;mm bleed, important content inside the safety margin, images 300&nbsp;DPI at final size, logos vector, CMYK with Pantones specified, fonts outlined or embedded, print-ready PDF, and a reference image. Nine items, a few minutes, and it removes most of the reasons jobs get reprinted.</p>
`,
  },

  {
    slug: 'bulk-ordering-lead-times-and-moqs',
    title: 'Bulk Ordering Cone Sleeves: Lead Times, Minimums and Storage',
    description:
      'How wholesale sleeve orders actually work — what drives lead time, why minimums exist, and how much stock is sensible to hold.',
    published: '2026-08-15T11:00:00+00:00',
    readingMinutes: 6,
    image: '/media/2023/11/Custom-Cardboard-Cone-Sleeves.jpg',
    imageAlt: 'Bulk cardboard cone sleeves packed for wholesale delivery',
    body: `
<p>Ordering packaging in bulk is mostly a timing problem. The price per unit is easy to compare; what catches people out is running short mid-season, or committing to a quantity that then sits in a stockroom absorbing humidity for two years.</p>

<h2>What actually drives lead time</h2>
<p>Lead time is the sum of several stages, and printing is rarely the longest. A typical run is: artwork check and proofing, plate or die preparation, printing, coating and curing, die-cutting, gluing, quality check, packing and transit.</p>

<p>Proofing is the stage most under your control and the one that most often slips. A job can sit waiting for approval far longer than it takes to print. If you know a deadline, agree the proofing turnaround up front rather than assuming it will be quick.</p>

<p>New dies add time. If your sleeve size has not been made before, a cutting die has to be produced, and that is a physical tool. Reorders of an existing design skip that step entirely, which is why the second order of a <a href="/custom-sugar-cone-sleeves/">custom sugar cone sleeve</a> is usually faster than the first.</p>

<h2>Why minimum order quantities exist</h2>
<p>Minimums are not arbitrary. Setting up a print run costs roughly the same whether you produce a thousand units or fifty thousand — plates are made, the press is set, colour is matched and the first sheets are run and discarded until it is right.</p>

<p>Below a certain quantity, that fixed cost makes the per-unit price absurd. The minimum is the point at which the job makes sense for both sides. It also means the gap between, say, five thousand and ten thousand units is often much smaller than people expect, because you are mostly paying for setup either way.</p>

<p>That is the question worth asking: not "what is the price at my quantity" but "what is the price at my quantity and at double it". Sometimes doubling the order costs twenty per cent more, and sometimes it costs sixty. Only the quote tells you which.</p>

<h2>Working out how much to order</h2>
<p>Start from serves, not from feeling. Take your busiest recent month, multiply by the months you want to cover, then add a margin for growth and for the small percentage lost to damage and misapplication in a busy service.</p>

<p>For a seasonal business the calculation is different. Ice cream demand is not flat, and ordering an annual quantity in March means storing most of it through a period when you need none of it. Splitting into two runs costs a little more per unit but frees cash and reduces storage risk. This applies equally to seasonal lines like <a href="/custom-waffle-trays/">custom printed waffle trays</a>.</p>

<h2>Storage is part of the cost</h2>
<p>Paperboard is hygroscopic — it absorbs moisture from the air. Board stored somewhere damp softens, loses stiffness and can warp enough that sleeves no longer apply cleanly. Board stored somewhere very dry can become brittle at the folds.</p>

<p>Keep cartons off the floor, away from exterior walls, and out of direct sunlight, which fades ink over months. Rotate stock so the oldest is used first. And be realistic about the space: packaging for a year of trading takes up more room than most people picture when they are looking at a price list.</p>

<p>This is the hidden cost of over-ordering. A larger run has a better unit price, but if it occupies space you need, or degrades before you use it, the saving is not real.</p>

<h2>Building in a buffer</h2>
<p>Run out of sleeves and you are serving in whatever you can find, which undoes the branding you paid for. The sensible buffer is however long a reorder takes, plus a margin.</p>

<p>Set a reorder trigger — a physical marker in the stack, or a stock level in your system — rather than relying on noticing. By the time a shortage is obvious it is usually too late to reorder normally. Keeping a small quantity of plain sleeves as an emergency backstop is cheap insurance for a business that cannot stop serving.</p>

<h2>Check the delivery before you sign for it</h2>
<p>Packaging is usually delivered on a pallet and signed for in the middle of a working day, which is exactly when nobody has time to inspect it. It is worth taking five minutes anyway, because problems are far easier to resolve on the day than a fortnight later.</p>

<p>Open one carton from the middle of the pallet rather than the top, since the top carton is the one most likely to have been handled carefully. Check the print against your approved proof, confirm the count in that carton matches the label, and look along the folds for cracking, which indicates board that was creased dry or stored badly in transit.</p>

<p>Then test a handful on an actual cone before the rest goes into storage. A sleeve that fits the sample can still be wrong if the die shifted, and finding that out on the day of delivery gives you options that finding out in six weeks does not. Keep the proof and the delivery note together until the stock is used, so any conversation about a discrepancy starts from evidence. The same check is worth doing on any first run of a new item, such as <a href="/custom-burger-trays/">custom printed burger trays</a> in a size you have not ordered before.</p>

<h2>Questions worth asking before you commit</h2>
<p>Ask for pricing at several quantities, and for the reorder price separately. Ask what the lead time is for a first run and for a repeat. Ask how the goods are packed, since carton count and weight affect how you store and move them. Ask what happens if a delivery is short or damaged.</p>

<p>And ask how long artwork and dies are kept on file. A supplier who retains them makes your reorders cheaper and faster; one who does not means paying setup again. If you would like those figures for your own volumes, you can <a href="/get-a-free-quote/">request a quote with quantity breaks</a> and compare them properly.</p>
`,
  },
];

export const postByDate = () =>
  [...POSTS].sort((a, b) => (a.published < b.published ? 1 : -1));
