#!/usr/bin/env python3
"""Download every Google Font the WordPress site requested and self-host it."""
import os, re, urllib.request

SITE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "site")
OUT_DIR = os.path.join(SITE, "public/fonts")
OUT_CSS = os.path.join(SITE, "src/styles/fonts.css")

# Exactly the requests the live site makes (see MIGRATION-REPORT.md).
URLS = [
    "https://fonts.googleapis.com/css2?family=Sen:wght@400;500;600;700"
    "&family=Libre%20Caslon%20Text:wght@400&family=Red%20Hat%20Display:wght@700&display=swap",
    "https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap",
]

UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36")


def fetch(url):
    return urllib.request.urlopen(
        urllib.request.Request(url, headers={"User-Agent": UA})
    ).read()


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    blocks = []
    for url in URLS:
        css = fetch(url).decode()
        # Keep the latin subsets; the site has no extended-latin content.
        for chunk in re.split(r"(?=/\* [a-z-]+ \*/)", css):
            if not chunk.strip().startswith("/* latin */"):
                continue
            blocks.append(chunk.strip())

    seen = {}

    def localise(m):
        remote = m.group(1)
        name = os.path.basename(remote).split("?")[0]
        path = os.path.join(OUT_DIR, name)
        if name not in seen:
            if not os.path.exists(path):
                open(path, "wb").write(fetch(remote))
            seen[name] = True
        return "url(/fonts/%s)" % name

    css = "\n\n".join(blocks)
    css = re.sub(r"url\((https://fonts\.gstatic\.com/[^)]+)\)", localise, css)
    open(OUT_CSS, "w").write(
        "/* Self-hosted copies of the fonts the WordPress site loaded from Google. */\n" + css + "\n"
    )
    print(f"{len(blocks)} @font-face blocks, {len(seen)} files -> {OUT_DIR}")
    for f in sorted(seen):
        print("   ", f)


if __name__ == "__main__":
    main()
