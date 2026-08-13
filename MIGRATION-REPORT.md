# theconesleeves.com — WordPress/Elementor → Astro migration report

**Date:** 2026-08-13
**Source:** WordPress 6.x · Rishi theme 1.2.1 · Elementor 4.2.2 + Elementor Pro 4.2.1 · Gravity Forms · Yoast SEO Premium
**Target:** Astro 7.2.1 (static output, `@astrojs/vercel` adapter) in `site/`
**Scope:** strict like-for-like rebuild — no redesign, no rewriting, no slug changes.

---

## 1. Source content inventory

### Supplied material

| Item | Contents |
|---|---|
| `public_html/` | Full WordPress root: `wp-content/uploads` (2022–2026), `themes/rishi`, `themes/twentytwentyfive`, 27 plugins, `.htaccess`, `robots.txt`, `wp-config.php` |
| `localhost.sql` (49 MB) | Full database dump — used to recover SMTP credentials, form recipients, Yoast redirects and site options |
| `theconesleeves.WordPress.2026-08-11*.xml` (7 files) | 26 pages, 1 draft post, 96 attachments, 45 nav-menu items, 4 Elementor library templates, 1 Elementor snippet |
| `elementor-templates-2026-08-11.zip` | Elementor template kit |

### Content found

| Type | Count | Notes |
|---|---|---|
| Published pages | **26** | All migrated |
| Published posts | **0** | The only post (`id=7964`) is an untitled **draft** — intentionally not migrated |
| Categories / tags with content | 0 | No archives exist to preserve |
| Attachments referenced by pages | 507 URLs → **506 files** | All resolved from `wp-content/uploads`, none missing |
| Navigation menus | 3 | `Menu 1` (header, 3 dropdowns), `footer menu 2` (Products, 18 links), `footer menu 3` (Company, 5 links) |
| Forms | 6 | 5 × Elementor Pro, 1 × Gravity Forms |

> **Design source of truth.** The live site was reachable during migration, so all 26 URLs were fetched
> and the *rendered* HTML/CSS was used as the reference rather than re-interpreting Elementor JSON.
> This is why the rebuild reproduces the original pixel-for-pixel (see §7).

---

## 2. URL mapping

Every source URL is preserved exactly, including trailing slashes and hierarchy. **No slug was renamed or merged.**

| WordPress URL | Astro URL | SEO title | Meta desc | JSON-LD blocks |
|---|---|---|---|---|
| `/` | `/` | Custom Ice Cream & Waffle Cone Sleeves, Wholesale \| The Cone Sleeves | yes | 1 |
| `/about/` | `/about/` | About - The Cone Sleeves | — | 0 |
| `/blog/` | `/blog/` | Blog - The Cone Sleeves | — | 1 |
| `/contact/` | `/contact/` | Contact - The Cone Sleeves | — | 0 |
| `/get-a-free-quote/` | `/get-a-free-quote/` | The Cone Sleeves — Quick & Accurate Estimate | yes | 1 |
| `/thank-you/` | `/thank-you/` | Thank You - The Cone Sleeves | — | 0 |
| `/privacy-policy/` | `/privacy-policy/` | Privacy Policy - The Cone Sleeves | — | 0 |
| `/terms-conditions/` | `/terms-conditions/` | Terms & Conditions - The Cone Sleeves | — | 0 |
| `/waffle-cone-sleeves/` | `/waffle-cone-sleeves/` | Premium Custom Waffle Cone Sleeves – Bulk & Branded | yes | 2 |
| `/ice-cream-cone-sleeves/` | `/ice-cream-cone-sleeves/` | Custom Ice Cream Cone Sleeves \| Wholesale Designs | yes | 3 |
| `/custom-sugar-cone-sleeves/` | `/custom-sugar-cone-sleeves/` | Custom Sugar Cone Sleeves \| Personalized Ice-Cream Branding | yes | 3 |
| `/custom-food-sleeves/` | `/custom-food-sleeves/` | Custom Food Sleeves \| Branded Protection for Restaurants\| TCS | yes | 2 |
| `/custom-burger-sleeves/` | `/custom-burger-sleeves/` | Custom Printed Burger Sleeves — Branding That Impresses | yes | 3 |
| `/custom-cake-cone-sleeves/` | `/custom-cake-cone-sleeves/` | Custom Cake Cone Sleeves \| Personalize Your Treats | yes | 3 |
| `/custom-crepe-sleeves/` | `/custom-crepe-sleeves/` | Custom Crepe Sleeves – Branded, Food-Safe & Eco Friendly | yes | 3 |
| `/custom-sandwich-sleeves/` | `/custom-sandwich-sleeves/` | Custom Printed Sandwich Sleeves \| Branding & Food Safety | yes | 3 |
| `/custom-coffee-sleeves/` | `/custom-coffee-sleeves/` | Custom Coffee Sleeves – Personalised Branding in Bulk | yes | 3 |
| `/custom-hot-dog-sleeves/` | `/custom-hot-dog-sleeves/` | Custom Food Trays \| The Cone Sleeves – Premium Quality | yes | 3 |
| `/custom-dessert-sleeves/` | `/custom-dessert-sleeves/` | Custom Dessert Sleeves, Wholesale & Printing \| Unique Cone Branding | yes | 3 |
| `/custom-donut-sleeves/` | `/custom-donut-sleeves/` | Custom Printed Donut Sleeves – Unique & Customisable Sleeves | yes | 3 |
| `/custom-beverage-sleeves/` | `/custom-beverage-sleeves/` | Custom Beverage Sleeves \| Eco Branding & Fast Turnaround | yes | 3 |
| `/custom-food-trays/` | `/custom-food-trays/` | Custom Food Trays, Wholesale With Printing \| The Cone Sleeves | yes | 3 |
| `/custom-burger-trays/` | `/custom-burger-trays/` | Custom Burger Trays \| Durable Branded Serving Trays | yes | 3 |
| `/custom-waffle-trays/` | `/custom-waffle-trays/` | Custom Waffle Trays – Made Per Your Design | yes | 3 |
| `/ice-cream-cone-tray/` | `/ice-cream-cone-tray/` | Custom Ice Cream Cone Tray ‒ Eco Friendly & Branded | yes | 3 |
| `/custom-hot-dog-trays/` | `/custom-hot-dog-trays/` | Personalized Hot Dog Trays — Print Your Logo Today | yes | 3 |

**26 / 26 published pages migrated. 0 missing.**

### Non-page URLs

| WordPress URL | Astro | Behaviour |
|---|---|---|
| `/robots.txt` | `/robots.txt` | Reproduced verbatim |
| `/sitemap.xml` | `/sitemap.xml` | Now a real sitemap (was a 301 to `sitemap_index.xml`) |
| `/feed/` | `/feed/` | Valid, empty RSS 2.0 — matches the original, which had no items |
| `/blog/feed/` | → `/feed/` | 301 |

---

## 3. Redirects

Configured in `site/vercel.json` (66 rules). Every one is a one-to-one mapping; **nothing is redirected to the homepage as a catch-all.**

| Source | Target | Code | Reason |
|---|---|---|---|
| `theconesleeves.com/*` | `www.theconesleeves.com/*` | 301 | Every canonical URL uses `www` |
| `/ice-cream-cone-sleeves-2/` | `/ice-cream-cone-sleeves/` | 301 | **Recovered from Yoast Premium redirect table in the DB** |
| `/sitemap_index.xml`, `/page-sitemap.xml`, `/wp-sitemap.xml`, `/post-sitemap.xml`, `/category-sitemap.xml`, `/author-sitemap.xml` | `/sitemap.xml` | 301 | Yoast sitemap URLs |
| `/?p=<id>` and `/?page_id=<id>` (52 rules) | matching page | 301 | Legacy WordPress permalinks for all 26 page IDs |
| `/wp-content/uploads/*` | `/media/*` | 301 | Media moved but filenames preserved — old image URLs (incl. Google Images) keep resolving |
| `/blog/feed/` | `/feed/` | 301 | Same empty feed WordPress served |
| `/?s=<query>` | `/search/?s=<query>` | 301 | WordPress search URLs keep working |
| `*?t=<digits>`, `/comment.php` | `/api/gone/` → **410 Gone** | — | Preserves the spam de-indexing rule from `.htaccess` |

### Deliberately not preserved

| URL | Decision |
|---|---|
| `/wp-json/*` | WordPress REST API — removed. Serving it would mean keeping a WordPress dependency. Now 404. |
| `/wp-admin/*`, `/wp-login.php`, `xmlrpc.php` | WordPress admin surface — removed. |

---

## 4. Design fidelity

The Rishi header/footer and every Elementor layout are reproduced from the **rendered** markup, with the
original stylesheets carried over and localised. No design decision was re-made.

Preserved: header (top bar + logo row), desktop dropdown navigation, mobile off-canvas drawer, search
overlay, mini-cart element, footer (4 columns + bottom bar), logos, favicons, colour palette, gradients,
fonts and weights, section order, backgrounds, images and icons, container widths, cards, buttons, forms,
spacing, borders, shadows, radii, hover effects, transitions, back-to-top button, responsive breakpoints,
FAQ accordions, product grids, and the "Get Instant Quote" popup.

### Issues found and fixed during the rebuild

These were caught by comparing computed styles against the live site, not by eye:

1. **`<body>` data attributes.** Rishi scopes most of its CSS on `[data-header]`, `[data-footer]`,
   `[data-prefix]`, `[data-link]`, `[data-forms]`. Dropping them silently broke header spacing and
   revealed the social-icon labels. Now carried per page.
2. **Inline stylesheet `media` attributes.** WordPress emits the tablet/mobile customizer CSS as
   `<style media="(max-width: 999.98px)">`. Concatenating without re-wrapping in `@media` applied the
   mobile rules at every width, dropping the base font size from 18px to 16px and cascading everywhere.
3. **HTML parser fidelity.** The hero markup is `<h1><b><p …>…</br>…</p></b></h1>` — invalid but
   meaningful. `lxml` unnests the `<p>` and drops `</br>`; browsers do neither. Switched to `html5lib`,
   which parses exactly as a browser does.
4. **Missing font family.** Product pages load **Source Sans Pro** through a second Google Fonts request
   that the theme's own font link doesn't cover. Without it every product page fell back to a system font
   and re-wrapped. Now self-hosted.
5. **Gravity Forms hidden wrapper.** The form ships as `style="display:none"` and is revealed by plugin
   JS. With that JS gone the quote page rendered empty. The inline `display:none` is now stripped.
6. **Astro brace escaping.** Escaping `{`/`}` for the Astro template corrupted the inline `<style>` block
   inside the waffle page's HTML widget (entities are not decoded inside `<style>`). Page markup is now
   held in plain `.html` files imported with `?raw`, so no escaping touches it.
7. **Extra `<h1>` on inner pages.** WordPress renders the site title as `<h1>` only on the front page and
   as `<span>` elsewhere. A single shared header component added a second `<h1>` to 24 pages. Header,
   drawer and footer are now captured per page, which also restores `current-menu-item` /
   `current-menu-ancestor` states.
8. **PurgeCSS dropped attribute-selector rules.** `[data-page-spacing=top\:bottom]{margin:0}` was removed,
   adding 160px to every page. Attribute-selector rules are now safelisted and escaped selectors restored.
9. **Quote popup rendered at 0×0.** Elementor Pro ships `.elementor-location-popup` as `display:none` and
   its JS lifts the contents into a modal it builds at runtime. The replacement dialog needs the wrapper
   to render in place. *(Found by driving the built site in a browser, not by reading the markup.)*
10. **WhatsApp widget markup drift.** The first version was hand-written; the plugin's stylesheet targets
    its own class structure, so the button lost its icon and the "Open chat" label inherited the site's
    link colour. It now uses the plugin's rendered markup with the control turned into a real `wa.me` link.
11. **Schema image paths.** JSON-LD `image` URLs still pointed at `/wp-content/uploads/`, costing a
    redirect hop per reference. Paths are localised to `/media/`; the structured data itself is untouched.
12. **Gravity Forms conditional logic.** The quote form's "Other Product Name" field is shown only when
    Product is "Others" — logic the plugin applied from JS. Without it the field was permanently visible,
    making the form 101 px taller on phones. The rule was recovered from the form definition in the
    database and reproduced in `site.js`.

---

## 5. Forms and integrations

### SMTP

Recovered from the `wp_mail_smtp` option in `localhost.sql` (the password is stored encrypted; it was
decrypted with the `wp_mail_smtp_mail_key` option from the same dump) and **verified against the live mail
server** (`transport.verify()` → OK).

| Setting | Value |
|---|---|
| Host / port / security | `mail.theconesleeves.com` : `465` (SSL) |
| Username / from | `info@theconesleeves.com` |
| From name | `The Cone Sleeves` |

Credentials live in `site/.env` (git-ignored, `chmod 600`). `site/.env.example` lists variable names only.
**No secret appears in client-side code or in any committed file.**

### Endpoints

| Form | Where | Endpoint | Recipients (from the WordPress config) | Subject |
|---|---|---|---|---|
| `db5b507` Hero "Get Free Quote" | `/` | `/api/contact/` | shanimazhar82@gmail.com, customforms24@gmail.com | New message from The Cone Sleeves |
| `dab954a` "Find Out the Cost" | `/` | `/api/contact/` | shanimazhar82@gmail.com, customforms24@gmail.com | New message The Cone Sleeves Quote |
| `2725c75` "Find Out the Cost" | 18 pages | `/api/contact/` | shanimazhar82@gmail.com, customforms24@gmail.com | New message The Cone Sleeves Quote |
| `fba3ad2` Contact form | `/contact/` | `/api/contact/` | shanimazhar82@gmail.com, customforms24@gmail.com | New message from "The Cone Sleeves" |
| `881a5df` "Get Instant Quote" popup | 18 pages | `/api/contact/` | shanimazhar82@gmail.com, uzairzia19@gmail.com, info@theconesleeves.com | New message from "The Cone Sleeves" |
| Gravity Form #1 "Get A Free Quote" | `/get-a-free-quote/` | `/api/quote/` | shanimazhar82@gmail.com, customforms24@gmail.com | New submission from Get A Free Quote |

All 30 quote-form fields (product, quantity, unit, dimensions, printing, stock, material/lamination/add-on
checkbox groups, contact details, notes, file upload) are preserved with their original labels and options.
The quote form still redirects to `/thank-you/`, matching the Gravity Forms confirmation setting.

### Form test results

| Case | Result |
|---|---|
| Contact form → real send | ✅ 200, delivered over SMTP |
| Popup form + PDF attachment | ✅ 200, delivered with attachment |
| Quote form → real send | ✅ 200, `{redirect:"/thank-you/"}`, delivered |
| Honeypot filled (`field_179dce0`/`ae1355b`/`7cdefe5`) | ✅ silently accepted, no mail sent |
| Invalid email | ✅ 400 with message |
| Quote without phone | ✅ 400 with message |
| Unknown `form_id` | ✅ 400 |
| Attachment > 10 MB | ✅ 400 |
| Disallowed file extension | ✅ 400 |
| Cross-origin POST | ✅ 403 (Astro origin check) |

### Other integrations preserved

| Integration | Detail |
|---|---|
| Google Tag Manager | `GTM-K4R5CPR` — inline in `<head>` on all 26 pages, byte-identical snippet |
| Zendesk Chat (Zopim) | key `4h3lbyJihoT1mCOqDA0VoQOaVQE9qTOP` — all 26 pages |
| Google Search Console | `google-site-verification` meta preserved on all 26 pages |
| WhatsApp button | `+1 503-358-0443`, bottom-left, original bubble text and 3s reveal delay; plugin replaced by a 40-line component |
| `tel:` / `mailto:` links | Header, footer and content links unchanged |
| FAQ accordions | Native `<details>`/`<summary>`; a 10-line script keeps the original "one open at a time" behaviour |
| Search | Rebuilt client-side — see §5.1 |

### 5.1 Site search

The header/mobile search overlay is unchanged. WordPress served results from `/?s=<query>`; that URL is
now 301-redirected to `/search/?s=<query>`, so existing links keep working. `/search/` reproduces the Rishi
search-results template exactly — `archive-title-wrapper`, "Search Result for: …" heading, the inline
search form, the "N Results" counter and `article.rishi-post` cards with title, date and "Read More" —
and fills it from a 98 KB prebuilt index of all 26 pages (`tools/search-index.py`). The page is
`noindex, follow`.

| Query | Live WordPress | Astro |
|---|---|---|
| `waffle` | 7 results | 7 results |
| `burger` | 5 results | 5 results |
| `zzzznothing` | "Nothing Found" | "Nothing Found" |

Result *ordering* differs slightly: WordPress ranks against raw post content with its own relevance
weighting, while this index matches the rendered text. Both return the same top matches.

---

## 6. SEO preservation

| Item | Status |
|---|---|
| SEO titles | ✅ 26/26 carried over verbatim; **0 duplicates** |
| Meta descriptions | ✅ 20/26 carried over; the 6 without one had none on WordPress either |
| Canonical URLs | ✅ 26/26 exact, `https://www.theconesleeves.com<path>` |
| Robots directives | ✅ `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` on all pages |
| Open Graph | ✅ locale, type, title, description, url, site_name, image (+ dimensions where present) |
| Twitter cards | ✅ `summary_large_image` preserved |
| JSON-LD | ✅ 61 blocks across the site (Organization, Service, Product, FAQPage) copied verbatim |
| Heading structure | ✅ **26/26 pages byte-identical to live** (verified with `npm run verify:headings`) |
| Image alt text | ✅ identical to live on every page, including the 70 images that were already missing alt text |
| Internal links | ✅ 0 broken; all preserved |
| External links | ✅ 5 targets preserved (Facebook, Instagram, LinkedIn, Google Maps, WhatsApp) |
| Trailing slashes | ✅ `trailingSlash: 'always'` |
| `sitemap.xml` | ✅ 26 URLs with original `lastmod` values |
| `robots.txt` | ✅ reproduced |

### Pre-existing SEO issues, preserved as-is (not introduced by this migration)

These are faithful copies of what the live site serves. **None was "fixed"** — that would be a content
change, which is out of scope. Flagging them for a decision:

1. **`aggregateRating` / `review` markup with no visible reviews.** Exact counts in the build:
   **18 pages** carry `Product.aggregateRating` (e.g. 5/293) plus one hard-coded `review`, and
   **19 pages** carry `AggregateRating` (4.8/198) on the `LocalBusiness` inside `Service` schema —
   the extra one being `/get-a-free-quote/`, which has no `Product` block. No reviews appear on any page.
   **Decision (client, 2026-08-13): keep exactly as on WordPress — do not remove.** Recorded here because
   it is the pattern behind Google structured-data manual actions and Merchant Center suspensions, so the
   trade-off is a known one rather than an oversight.
2. **Duplicate/incorrect SEO title.** `/custom-hot-dog-sleeves/` has the title
   *"Custom Food Trays | The Cone Sleeves – Premium Quality"* — copy from a different product.
3. **Heading structure.** `/` and `/blog/` have 2 `<h1>` elements; **18 pages** (17 product pages plus
   `/get-a-free-quote/`) have **no** `<h1>` at all; several pages skip from `<h2>` to `<h5>`.
4. **`Service` schema oddity.** `serviceType` is `"Local SEO"` and `areaServed` is
   `{City: "The Cone Sleeves", addressLocality: "The Cone", addressRegion: "Sleeves"}` on every product page.
5. **In-body `<title>` and `<meta>` tags.** `/waffle-cone-sleeves/` contains a full document head inside an
   Elementor HTML widget, including a second `<title>`. Preserved because it is in the live markup.
6. **70 images without alt text**, and 3 images without `width`/`height` on `/waffle-cone-sleeves/`.
7. **Broken skip link.** The header's "Skip to content" link points at `#primary`, which does not exist on
   the live site either. Preserved rather than silently retargeted, since it changes keyboard behaviour —
   the fix is a one-line `id` on `main`/`.site-content`.

---

## 7. Build and validation results

### Production build

```
astro build → 26 pages, 0 errors, 0 warnings
```

The only build notice is `@astrojs/vercel` reporting that local Node 25 is newer than Vercel's Node 24
runtime — informational, not a defect.

### Automated checks (`npm run audit`)

| Check | Result |
|---|---|
| Pages built | **26 / 26** |
| Missing pages | **0** |
| Broken internal links | **0** |
| Broken images / failed requests | **0** |
| Canonical mismatches | **0** |
| Duplicate titles | **0** |
| Duplicate meta descriptions | 0 real duplicates (6 pages share "no description", same as live) |
| Lorem ipsum / placeholder text / placeholder images | **0** |

### Visual fidelity (`npm run verify:css`)

Computed styles (48 properties + bounding box) compared element-by-element against the live site for all
26 pages at **1440 px, 768 px and 390 px** — 78 page/viewport combinations, ~2 700 elements matched.

**63 / 78 combinations report zero differing elements.** All 15 remaining rows fall into two categories,
neither of which is a layout difference:

| Pages | Viewports | Difference | Cause |
|---|---|---|---|
| `/blog/`, `/thank-you/`, `/privacy-policy/`, `/terms-conditions/` | all three | **0.3–0.7 px** on the sidebar search widget, cascading into its two ancestors | sub-pixel rounding on the search submit control; invisible on screen |
| `/waffle-cone-sleeves/` | all three | 12–14 elements | the live page renders **two elements sharing one Elementor ID**, so the comparator matches different nodes on each side. Total page height agrees within **7 px of 8 125 px (0.09 %)** |

Every other page — including all 18 product pages, the homepage, contact and the quote form — is
**identical at every viewport**.

Two live-site rendering artefacts are normalised in the comparator (they are not migration differences):

- WordPress replaces emoji characters with `<img class="emoji">` from `s.w.org`; under automation these
  measure ~1140 px before the plugin's sizing CSS loads. The Astro site renders native emoji instead —
  same glyph, one fewer third-party request.
- The waffle-page hero has an 8-second animated gradient, so a computed-style read catches it
  mid-keyframe. Animations are frozen before measuring.

> **A note on running this yourself.** `astro build` deletes and recreates `dist/`, so rebuilding while
> `verify:css` is running makes pages fail spuriously (an earlier run reported 59/78 for exactly this
> reason — every one of those extra failures re-checked as 0). Let the run finish before rebuilding.

### Content fidelity

- **26 / 26 pages: visible text identical to live** (whitespace- and emoji-normalised).
- **26 / 26 pages: heading structure identical to live** in the served HTML.

### Responsive

Desktop (1440), tablet (768) and phone (390) captures compared side by side against live — layouts match,
including the mobile logo row, hamburger, off-canvas drawer and stacked footer.

### Interactive components tested

Driven in a real browser at desktop and phone widths:

| Component | Result |
|---|---|
| Desktop dropdown menus (CSS-only, no JS) | ✅ |
| Mobile drawer open / close | ✅ |
| Mobile submenu toggles | ✅ |
| Search overlay open / close | ✅ |
| "Get Instant Quote" popup: open, overlay-click close, Escape close, form renders 580×621 | ✅ |
| FAQ accordions, one open at a time | ✅ |
| Back-to-top appears past 300 px scroll | ✅ |
| WhatsApp button reveal, chatbox toggle, `wa.me` link | ✅ |
| Quote form conditional field | ✅ |
| All six forms (submit, validation, honeypot, uploads) | ✅ — see the table above |

### Weight

| | Before (WordPress) | After |
|---|---|---|
| CSS per page | ~1.0 MB across 25 stylesheets | 135–177 KB across 2 |
| JavaScript | jQuery, Elementor, Elementor Pro, WooCommerce, EAEL, Rishi (~600 KB) | **4 KB** on every content page (+ GTM/Zendesk, unchanged). `/search/` additionally loads its 98 KB index. |
| Icon fonts | 5 formats, 4.2 MB | woff2 + woff, 640 KB |
| Requests to third parties | Google Fonts, `s.w.org` emoji | none beyond GTM/Zendesk |

CSS is trimmed by PurgeCSS (41 % smaller) and the result is re-verified against the live site, so the
saving is proven not to change rendering.

---

## 8. Missing, unrecoverable, or changed

| Item | Status |
|---|---|
| Blog posts | **None existed.** `/blog/` reproduces the live "Nothing Found" state and sidebar exactly. The one draft post is unpublished and was not migrated. |
| Site search | **Rebuilt and working** (see §5.1). WordPress ranked results with its own full-text relevance, which cannot be reproduced exactly; result *sets* are close but ordering and edge matches differ slightly. |
| Mini-cart in header | WooCommerce is installed but no products/shop pages exist; the live cart is permanently "No products in the cart." Preserved as a visual element. |
| `/wp-json/`, `/wp-admin/`, `wp-login.php`, `xmlrpc.php` | Intentionally gone — WordPress surfaces. |
| WordPress emoji images | Replaced by native emoji characters (identical glyphs, no `s.w.org` request). |
| Elementor popup delivery | WordPress fetched the popup over AJAX; the static site inlines it, hidden, on the 18 pages that have a trigger — the same pages whose live HTML contains it. |
| Media | **0 missing.** 506 files copied with original filenames and folder structure (`/media/YYYY/MM/…`). |

### Recommended follow-ups (not done — each is a content or policy decision)

1. **Fix the `/custom-hot-dog-sleeves/` SEO title**, which currently describes food trays.
2. Add missing `<h1>` elements to the 18 pages that lack one, and alt text to the 70 images.
3. Point DNS at the new deployment only after confirming `www` remains canonical.

Closed: the review/rating schema (§6.1) stays as-is by client decision.

---

## 9. Project layout

```
The Cone Sleeves/
├── public_html/            ← supplied WordPress files (untouched, never deployed)
├── localhost.sql           ← supplied DB dump (untouched, never deployed)
├── *.xml, *.zip            ← supplied exports (untouched, never deployed)
├── tools/
│   ├── extract.py          one-shot generator: live HTML → Astro source
│   ├── fonts.py            downloads and self-hosts the Google Fonts
│   └── search-index.py     builds the client-side search index
├── MIGRATION-REPORT.md
└── site/                   ← the Astro project (this is what deploys)
    ├── src/
    │   ├── pages/          26 pages + /search/, /api/contact, /api/quote, /api/gone,
│   │                   sitemap.xml, feed
    │   ├── content/        page markup (imported with ?raw)
    │   ├── chrome/         per-page header / drawer / footer markup
    │   ├── layouts/        Layout.astro
    │   ├── components/     Header, OffCanvas, Footer, QuotePopup, JoinChat, BackToTop, Analytics
    │   ├── styles/         site.css, app.css, fonts.css, gravityforms.css, pages/*.css
    │   ├── scripts/        site.js (4 KB) + search.js + pages/*.js
    │   ├── lib/            mailer.ts
    │   └── data/           site.ts, seo.json, sitemap.ts, search-index.json
    ├── public/             media/ (506 files), fonts/, assets/, robots.txt
    ├── tools/              audit.mjs, cssdiff.mjs, headings.mjs, verify-all.mjs, purge.mjs,
    │                       prune-assets.mjs, shoot.mjs
    ├── vercel.json         66 redirects, rewrites, cache headers
    ├── .env.example        variable names only
    └── .gitignore          excludes .env, dist, .vercel, node_modules
```

The supplied WordPress files sit **outside** `site/`, so no backup, XML, ZIP, SQL or PHP file can reach the
deployment. Deploy from `site/`.

### Commands

```bash
cd site
npm install
npm run build             # astro build + CSS purge
npm run audit             # link / asset / SEO / heading checks
npm run audit:live        # also diffs page text against the live site
npm run verify:css        # computed-style diff vs live, 26 pages × 3 viewports
npm run verify:headings   # heading structure diff vs live
```
