#!/usr/bin/env python3
"""
Builds the client-side search index from the migrated page markup.

WordPress answered /?s=<query> from the database. The static site cannot, so the
26 pages are indexed here and matched in the browser (src/scripts/search.js).
Publish dates come from the WordPress export; modified dates from the sitemap,
so the result cards carry the same metadata the Rishi template showed.
"""
import json, os, re
import xml.etree.ElementTree as ET
from bs4 import BeautifulSoup

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = os.path.join(ROOT, "site")
WXR = os.path.join(ROOT, "theconesleeves.WordPress.2026-08-11.xml")
NS = {"wp": "http://wordpress.org/export/1.2/"}


def wordpress_dates():
    channel = ET.parse(WXR).getroot().find("channel")
    out = {}
    for item in channel.findall("item"):
        if item.findtext("wp:post_type", namespaces=NS) != "page":
            continue
        if item.findtext("wp:status", namespaces=NS) != "publish":
            continue
        slug = item.findtext("wp:post_name", namespaces=NS)
        url = "/" if slug == "home" else f"/{slug}/"
        out[url] = {
            "id": int(item.findtext("wp:post_id", namespaces=NS)),
            "title": item.findtext("title"),
            "published": item.findtext("wp:post_date_gmt", namespaces=NS),
        }
    return out


def main():
    dates = wordpress_dates()
    seo = json.load(open(os.path.join(SITE, "src/data/seo.json")))
    sitemap = open(os.path.join(SITE, "src/data/sitemap.ts")).read()
    modified = dict(re.findall(r"path: '([^']+)', lastmod: '([^']+)'", sitemap))

    index = []
    for url in seo:
        stem = "index" if url == "/" else url.strip("/")
        soup = BeautifulSoup(
            open(os.path.join(SITE, "src/content", stem + ".html"), encoding="utf-8").read(),
            "html5lib",
        )
        for tag in soup.find_all(["script", "style"]):
            tag.decompose()
        text = re.sub(r"\s+", " ", soup.get_text(" ", strip=True))

        meta = dates.get(url, {})
        published = meta.get("published")
        index.append({
            "url": url,
            "id": meta.get("id"),
            "title": meta.get("title") or seo[url]["title"],
            "published": published.replace(" ", "T") + "+00:00" if published else None,
            "modified": modified.get(url),
            "excerpt": text[:280],
            "text": text[:4000].lower(),
        })

    out = os.path.join(SITE, "src/data/search-index.json")
    json.dump(index, open(out, "w"), separators=(",", ":"))
    print(f"indexed {len(index)} pages -> {round(os.path.getsize(out) / 1024)} KB")


if __name__ == "__main__":
    main()
