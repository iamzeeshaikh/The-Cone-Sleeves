#!/usr/bin/env python3
"""
The Cone Sleeves — WordPress/Elementor -> Astro migration extractor.

Reads the captured rendered HTML of every live URL and emits:
  site/src/pages/*.astro          one Astro page per source URL
  site/src/data/seo.json          per-page SEO metadata
  site/src/styles/site.css        consolidated global stylesheet
  site/src/styles/pages/*.css     per-page Elementor stylesheets
  site/public/media/**            media copied from wp-content/uploads

Nothing here runs at build time; it is a one-shot source generator.
"""
import os, re, json, glob, shutil, html
from bs4 import BeautifulSoup

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LIVE = "/private/tmp/claude-501/-Users-sajjadahmad/c5f6b030-e21f-47fd-aa14-e25114d4bcbd/scratchpad/live"
CSSDIR = "/private/tmp/claude-501/-Users-sajjadahmad/c5f6b030-e21f-47fd-aa14-e25114d4bcbd/scratchpad/css"
WP = os.path.join(ROOT, "public_html")
SITE = os.path.join(ROOT, "site")
BASE = "https://www.theconesleeves.com"

# slug (source URL path) -> output file stem
PAGES = {
    "/": "index",
    "/about/": "about",
    "/blog/": "blog",
    "/contact/": "contact",
    "/get-a-free-quote/": "get-a-free-quote",
    "/thank-you/": "thank-you",
    "/privacy-policy/": "privacy-policy",
    "/terms-conditions/": "terms-conditions",
    "/waffle-cone-sleeves/": "waffle-cone-sleeves",
    "/ice-cream-cone-sleeves/": "ice-cream-cone-sleeves",
    "/custom-sugar-cone-sleeves/": "custom-sugar-cone-sleeves",
    "/custom-food-sleeves/": "custom-food-sleeves",
    "/custom-burger-sleeves/": "custom-burger-sleeves",
    "/custom-cake-cone-sleeves/": "custom-cake-cone-sleeves",
    "/custom-crepe-sleeves/": "custom-crepe-sleeves",
    "/custom-sandwich-sleeves/": "custom-sandwich-sleeves",
    "/custom-coffee-sleeves/": "custom-coffee-sleeves",
    "/custom-hot-dog-sleeves/": "custom-hot-dog-sleeves",
    "/custom-dessert-sleeves/": "custom-dessert-sleeves",
    "/custom-donut-sleeves/": "custom-donut-sleeves",
    "/custom-beverage-sleeves/": "custom-beverage-sleeves",
    "/custom-food-trays/": "custom-food-trays",
    "/custom-burger-trays/": "custom-burger-trays",
    "/custom-waffle-trays/": "custom-waffle-trays",
    "/ice-cream-cone-tray/": "ice-cream-cone-tray",
    "/custom-hot-dog-trays/": "custom-hot-dog-trays",
}

media_used = set()
page_js = set()


# --------------------------------------------------------------------------- #
# URL rewriting
# --------------------------------------------------------------------------- #
def rewrite_url(u):
    """Map a WordPress URL onto its Astro equivalent."""
    if not u:
        return u
    u = u.strip()
    # protocol-relative / http / https / non-www variants of our own host
    u = re.sub(r"^(?:https?:)?//(?:www\.)?theconesleeves\.com", "", u)
    if u.startswith("/wp-content/uploads/"):
        rel = u.split("?")[0][len("/wp-content/uploads/"):]
        media_used.add(rel)
        return "/media/" + rel
    if u.startswith("/wp-content/") or u.startswith("/wp-includes/"):
        return "/assets" + u.split("?")[0]
    # Elementor popup trigger -> our own dialog
    if "elementor-action" in u and "popup" in u:
        return "#quote-popup"
    return u


SRCSET_RE = re.compile(r"([^\s,]+)(\s+[0-9.]+[wx])?")


def rewrite_srcset(v):
    out = []
    for part in v.split(","):
        part = part.strip()
        if not part:
            continue
        bits = part.split()
        bits[0] = rewrite_url(bits[0])
        out.append(" ".join(bits))
    return ", ".join(out)


def clean_tree(node, page_stem):
    """Strip WordPress runtime cruft and localise every URL in a subtree."""
    for tag in node.find_all(["script", "noscript"]):
        tag.decompose()
    for tag in node.find_all("link", rel=lambda r: r and "stylesheet" in r):
        tag.decompose()

    # Gravity Forms ships its wrapper hidden and reveals it from JS we dropped.
    for el in node.select(".gform_wrapper[style], .gform_body[style]"):
        el["style"] = re.sub(r"display\s*:\s*none\s*;?", "", el["style"]).strip()
        if not el["style"]:
            del el["style"]

    for el in node.find_all(True):
        # bulky Elementor runtime payloads (no JS left to consume them)
        for attr in ("data-settings", "data-model-cid", "data-elementor-settings"):
            el.attrs.pop(attr, None)

        for attr in ("href", "src", "data-src", "action", "poster", "content"):
            if el.has_attr(attr) and isinstance(el[attr], str):
                el[attr] = rewrite_url(el[attr])
        for attr in ("srcset", "data-srcset", "imagesrcset"):
            if el.has_attr(attr):
                el[attr] = rewrite_srcset(el[attr])
        if el.has_attr("style"):
            el["style"] = re.sub(
                r"url\(\s*['\"]?([^)'\"]+)['\"]?\s*\)",
                lambda m: "url(%s)" % rewrite_url(m.group(1)),
                el["style"],
            )
    return node


def strip_empty_search_state(soup):
    """Header/footer are components; only the page body is extracted here."""
    return soup


# --------------------------------------------------------------------------- #
# Forms
# --------------------------------------------------------------------------- #
def convert_forms(node, page_stem):
    """Point every WordPress form at the Astro endpoint and drop WP-only fields."""
    for form in node.find_all("form"):
        classes = " ".join(form.get("class") or [])

        if "elementor-form" in classes:
            form["action"] = "/api/contact/"
            form["method"] = "post"
            form["data-tcs-form"] = "elementor"
            fid = ""
            for h in form.find_all("input", attrs={"type": "hidden"}):
                name = h.get("name") or ""
                if name == "form_id":
                    fid = h.get("value") or ""
                # WP routing fields carry no meaning off WordPress
                if name in ("post_id", "referer_title", "queried_id", "form_id"):
                    h.decompose()
            meta = node.new_tag("input", type="hidden")
            meta.attrs = {"type": "hidden", "name": "form_id", "value": fid}
            form.insert(0, meta)
            src = node.new_tag("input")
            src.attrs = {"type": "hidden", "name": "source_page", "value": "/" + ("" if page_stem == "index" else page_stem + "/")}
            form.insert(0, src)
            if form.find("input", attrs={"type": "file"}):
                form["enctype"] = "multipart/form-data"

        elif form.get("id", "") and form.get("id", "").startswith("gform_"):
            form["action"] = "/api/quote/"
            form["method"] = "post"
            form["enctype"] = "multipart/form-data"
            form["data-tcs-form"] = "gravity"
            for name in ("state_1", "gform_unique_id", "gform_target_page_number_1",
                         "gform_source_page_number_1", "gform_field_values",
                         "is_submit_1", "gform_submit", "gform_ajax"):
                for h in form.find_all("input", attrs={"name": name}):
                    h.decompose()

        elif form.get("role") == "search" or "search-form" in classes:
            form["action"] = "/search/"
            form["method"] = "get"
            for h in form.find_all("input", attrs={"name": "rt_post_type"}):
                h.decompose()
    return node


# --------------------------------------------------------------------------- #
# Page scripts
# --------------------------------------------------------------------------- #
def take_inline_scripts(node):
    """Lift a page's own inline scripts out of the markup so they can be bundled.

    Elementor "HTML" widgets carry hand-written scripts that belong to the page
    (e.g. a FAQ toggle). They are the site's own code, so they are preserved --
    just moved into a module Astro can bundle instead of an inline <script>.
    """
    kept = []
    for tag in node.find_all("script"):
        if tag.get("src"):
            continue
        body = tag.string or ""
        if body.strip():
            kept.append(body)
    return kept


# --------------------------------------------------------------------------- #
# SEO
# --------------------------------------------------------------------------- #
def extract_seo(soup, url):
    head = soup.head

    def meta(sel, attr="content"):
        el = head.select_one(sel)
        return el.get(attr) if el else None

    schemas = []
    for s in head.find_all("script", type="application/ld+json"):
        try:
            schemas.append(json.loads(s.string or "{}"))
        except Exception:
            pass

    return {
        "url": url,
        "title": (head.title.string or "").strip() if head.title else "",
        "description": meta('meta[name="description"]'),
        "robots": meta('meta[name="robots"]'),
        "canonical": (BASE + url),
        "og": {
            "locale": meta('meta[property="og:locale"]'),
            "type": meta('meta[property="og:type"]'),
            "title": meta('meta[property="og:title"]'),
            "description": meta('meta[property="og:description"]'),
            "url": (BASE + url),
            "site_name": meta('meta[property="og:site_name"]'),
            "image": rewrite_url(meta('meta[property="og:image"]') or "") or None,
            "image_width": meta('meta[property="og:image:width"]'),
            "image_height": meta('meta[property="og:image:height"]'),
            "image_type": meta('meta[property="og:image:type"]'),
        },
        "twitter": {
            "card": meta('meta[name="twitter:card"]'),
            "site": meta('meta[name="twitter:site"]'),
        },
        "schema": schemas,
    }


# --------------------------------------------------------------------------- #
# CSS
# --------------------------------------------------------------------------- #
GLOBAL_CSS_FILES = [
    "wp-content_plugins_elementor_assets_lib_eicons_css__elementor-icons.min.css",
    "wp-content_plugins_elementor_assets_css__frontend.min.css",
    "wp-content_plugins_elementor_assets_css__widget-heading.min.css",
    "wp-content_plugins_elementor_assets_css__widget-image.min.css",
    "wp-content_plugins_elementor_assets_css__widget-spacer.min.css",
    "wp-content_plugins_elementor_assets_css__widget-icon-box.min.css",
    "wp-content_plugins_elementor_assets_css__widget-icon-list.min.css",
    "wp-content_plugins_elementor_assets_css__widget-nested-accordion.min.css",
    "wp-content_plugins_elementor-pro_assets_css__widget-form.min.css",
    "wp-content_plugins_elementor-pro_assets_css_conditionals__popup.min.css",
    "wp-content_plugins_essential-addons-for-elementor-lite_assets_front-end_css_view__general.min.css",
    "wp-content_plugins_custom-tabs_public_css__custom-tabs-public.css",
    "wp-content_themes_rishi__style.min.css",
    "wp-content_themes_rishi_css_build__woocommerce.min.css",
    "wp-content_plugins_elementor_assets_lib_font-awesome_css__fontawesome.min.css",
    "wp-content_plugins_elementor_assets_lib_font-awesome_css__solid.min.css",
    "wp-content_plugins_elementor_assets_lib_font-awesome_css__regular.min.css",
    "wp-content_plugins_elementor_assets_lib_font-awesome_css__brands.min.css",
    "wp-content_plugins_creame-whatsapp-me_public_css__joinchat.min.css",
]
QUOTE_CSS_FILES = [
    "wp-content_plugins_gravityforms_assets_css_dist__basic.min.css",
    "wp-content_plugins_gravityforms_assets_css_dist__theme.min.css",
]
# WordPress emits these inline; they carry the theme's customizer output.
INLINE_IDS = [
    "ct-main-styles-inline-css",
    "ct-main-styles-tablet-inline-css",
    "ct-main-styles-mobile-inline-css",
    "global-styles-inline-css",
    "rishi-style-inline-css",
    "joinchat-button-style-inline-css",
    "wp-custom-css",
]


def localise_css(css, src_dir_url):
    """Rewrite url() references inside a stylesheet onto local asset paths."""
    def repl(m):
        u = m.group(1).strip().strip("'\"")
        if u.startswith("data:"):
            return m.group(0)
        if u.startswith("http") or u.startswith("//"):
            return "url(%s)" % rewrite_url(u)
        if u.startswith("/"):
            return "url(%s)" % rewrite_url(u)
        # relative to the stylesheet's own directory
        joined = os.path.normpath(os.path.join(src_dir_url, u.split("?")[0]))
        return "url(/assets/%s)" % joined.lstrip("/")
    css = re.sub(r"url\(\s*([^)]+?)\s*\)", repl, css)
    # Elementor's kit CSS emits a stray `{}` rule that CSS minifiers reject.
    css = re.sub(r"(^|[};])\s*\{\s*\}", r"\1", css)
    return css


CSS_SRC_DIRS = {}


def load_css_source_dirs():
    for line in open("/tmp/csslist.txt"):
        u = line.strip()
        if not u:
            continue
        n = u.split("/")[-1].split("?")[0]
        d = u.replace(BASE + "/", "").rsplit("/", 1)[0]
        CSS_SRC_DIRS[d.replace("/", "_") + "__" + n] = d


def read_css(fname):
    path = os.path.join(CSSDIR, fname)
    if not os.path.exists(path):
        print("  !! missing css", fname)
        return ""
    css = open(path, encoding="utf-8", errors="replace").read()
    return localise_css(css, CSS_SRC_DIRS.get(fname, ""))


# --------------------------------------------------------------------------- #
# main
# --------------------------------------------------------------------------- #
def main():
    load_css_source_dirs()
    for d in ("src/styles/pages", "src/content", "src/scripts/pages",
              "src/chrome/header", "src/chrome/offcanvas", "src/chrome/footer"):
        os.makedirs(os.path.join(SITE, d), exist_ok=True)
    os.makedirs(os.path.join(SITE, "src/pages"), exist_ok=True)
    os.makedirs(os.path.join(SITE, "src/data"), exist_ok=True)

    seo_all = {}
    page_css_map = {}
    inline_collected = {}

    for url, stem in PAGES.items():
        f = os.path.join(LIVE, stem + ".html")
        raw = open(f, encoding="utf-8", errors="replace").read()
        soup = BeautifulSoup(raw, "html5lib")

        seo_all[url] = extract_seo(soup, url)

        # ---- collect the theme's inline stylesheets (identical across pages) --
        for st in soup.head.find_all("style"):
            sid = st.get("id")
            if sid in INLINE_IDS and sid not in inline_collected:
                css = localise_css(st.string or "", "")
                # WordPress carries the breakpoint on the tag, not in the CSS.
                media = st.get("media")
                if media and media != "all":
                    css = "@media %s {\n%s\n}" % (media, css)
                inline_collected[sid] = css

        # ---- per-page Elementor stylesheets --------------------------------
        page_css = []
        for l in soup.find_all("link", rel=lambda r: r and "stylesheet" in r):
            href = l.get("href") or ""
            if "/uploads/elementor/css/post-" in href:
                name = "wp-content_uploads_elementor_css__" + href.split("/")[-1].split("?")[0]
                page_css.append(read_css(name))
        # inline styles that live in the body (Elementor widget overrides)
        for st in soup.body.find_all("style"):
            if st.get("id") in INLINE_IDS:
                continue
            txt = st.string or ""
            if txt.strip():
                page_css.append(localise_css(txt, ""))

        if page_css:
            out = os.path.join(SITE, "src/styles/pages", stem + ".css")
            open(out, "w", encoding="utf-8").write("\n".join(page_css))
            page_css_map[stem] = True

        # ---- chrome ---------------------------------------------------------
        # Header, drawer and footer carry per-page state: WordPress renders the
        # site title as <h1> only on the front page, and marks the active menu
        # entry with current-menu-item / current-menu-ancestor. Capturing them
        # per page reproduces that exactly.
        for name, selector in (("header", "header#header"),
                               ("offcanvas", ".cb__drawer-header-canvas"),
                               ("footer", "footer.cb__footer")):
            part = soup.select_one(selector)
            clean_tree(part, stem)
            convert_forms(part, stem)
            open(os.path.join(SITE, f"src/chrome/{name}", stem + ".html"), "w",
                 encoding="utf-8").write(part.decode())

        # ---- body content ---------------------------------------------------
        content = soup.select_one("div.site-content")
        page_scripts = take_inline_scripts(content)
        clean_tree(content, stem)
        convert_forms(content, stem)

        if page_scripts:
            open(os.path.join(SITE, "src/scripts/pages", stem + ".js"), "w",
                 encoding="utf-8").write(
                     "// Page-level script preserved from the original "
                     "Elementor HTML widget.\n" + "\n".join(page_scripts))
            page_js.add(stem)

        body_classes = [c for c in (soup.body.get("class") or [])
                        if c not in ("rt-loading", "woocommerce-no-js")]
        # Rishi scopes much of its CSS on these; they are part of the design.
        body_attrs = {k: v for k, v in soup.body.attrs.items() if k.startswith("data-")}

        markup = content.decode()
        # The quote popup only exists on pages that carry a trigger, exactly as
        # Elementor rendered it.
        has_popup = 'href="#quote-popup"' in markup
        write_page(stem, url, markup, body_classes, page_css_map.get(stem, False),
                   body_attrs, stem in page_js, has_popup)
        print("page:", url, "->", stem + ".astro", len(markup), "bytes")

    # -------- popup (shared across every page) ------------------------------
    src = BeautifulSoup(open(os.path.join(LIVE, "index.html"), encoding="utf-8",
                             errors="replace").read(), "html5lib")
    popup = src.select_one(".elementor-location-popup")
    clean_tree(popup, "popup")
    convert_forms(popup, "popup")
    open(os.path.join(SITE, "src/components/_popup.html"), "w",
         encoding="utf-8").write(popup.decode())

    joinchat = src.select_one(".joinchat")
    clean_tree(joinchat, "joinchat")
    open(os.path.join(SITE, "src/components/_joinchat.html"), "w",
         encoding="utf-8").write(joinchat.decode())


    totop = src.select_one("div.to_top")
    clean_tree(totop, "totop")
    open(os.path.join(SITE, "src/components/_totop.html"), "w",
         encoding="utf-8").write(totop.decode())

    # -------- stylesheets ---------------------------------------------------
    parts = ['@import "./fonts.css";']
    for fn in GLOBAL_CSS_FILES:
        parts.append("/* === %s === */" % fn)
        parts.append(read_css(fn))
    for sid in INLINE_IDS:
        if sid in inline_collected:
            parts.append("/* === inline:%s === */" % sid)
            parts.append(inline_collected[sid])
    open(os.path.join(SITE, "src/styles/site.css"), "w",
         encoding="utf-8").write("\n".join(parts))

    gf = ["/* === gravity forms === */"] + [read_css(f) for f in QUOTE_CSS_FILES]
    open(os.path.join(SITE, "src/styles/gravityforms.css"), "w",
         encoding="utf-8").write("\n".join(gf))

    json.dump(seo_all, open(os.path.join(SITE, "src/data/seo.json"), "w"), indent=1)

    # -------- media ---------------------------------------------------------
    copied = missing = 0
    for rel in sorted(media_used):
        src_p = os.path.join(WP, "wp-content/uploads", rel)
        dst_p = os.path.join(SITE, "public/media", rel)
        if not os.path.exists(src_p):
            print("  MISSING MEDIA:", rel)
            missing += 1
            continue
        os.makedirs(os.path.dirname(dst_p), exist_ok=True)
        if not os.path.exists(dst_p):
            shutil.copy2(src_p, dst_p)
        copied += 1
    print(f"\nmedia: {copied} copied, {missing} missing")
    print("pages:", len(PAGES))


PAGE_TEMPLATE = """---
import Layout from '../layouts/Layout.astro';
import seoData from '../data/seo.json';
{css_import}
const seo = seoData['{url}'];
const bodyClass = {body_classes};
---
<Layout seo={{seo}} bodyClass={{bodyClass}}>
  <Fragment set:html={{content}} />
</Layout>
"""


def write_page(stem, url, markup, body_classes, has_css, body_attrs, has_js,
               has_popup):
    """Emit the page markup as a raw .html partial plus a thin .astro wrapper.

    Keeping the markup in its own file (imported with `?raw`) means no escaping
    ever touches it -- important because the pages contain inline <style> blocks
    where HTML entities would not be decoded.
    """
    open(os.path.join(SITE, "src/content", stem + ".html"), "w",
         encoding="utf-8").write(markup)

    out_name = "index.astro" if stem == "index" else f"{stem}.astro"
    imports = [
        "import Layout from '../layouts/Layout.astro';",
        "import seoData from '../data/seo.json';",
        f"import content from '../content/{stem}.html?raw';",
    ]
    if has_css:
        imports.append(f"import '../styles/pages/{stem}.css';")
    if stem == "get-a-free-quote":
        imports.append("import '../styles/gravityforms.css';")

    script_tag = (f'\n<script src="../scripts/pages/{stem}.js"></script>'
                  if has_js else "")

    body = (
        "---\n"
        + "\n".join(imports) + "\n"
        f"const seo = seoData[{json.dumps(url)}];\n"
        f"const bodyClass = {json.dumps(' '.join(body_classes))};\n"
        f"const bodyAttrs = {json.dumps(body_attrs)};\n"
        "---\n"
        f"<Layout seo={{seo}} bodyClass={{bodyClass}} bodyAttrs={{bodyAttrs}} stem={json.dumps(stem)} hasPopup={{{str(has_popup).lower()}}}>\n"
        "  <Fragment set:html={content} />\n"
        "</Layout>" + script_tag + "\n"
    )
    open(os.path.join(SITE, "src/pages", out_name), "w", encoding="utf-8").write(body)


if __name__ == "__main__":
    main()
