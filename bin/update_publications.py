#!/usr/bin/env python3
"""Add papers that are missing from _bibliography/papers.bib.

Sources:
  1. The ORCID record (source of truth): every work with a DOI is added.
  2. OpenAlex works linked to the same ORCID, kept only when our author entry carries one of
     AFFILIATION_KEYWORDS. OpenAlex's author clustering mixes in other people's papers, so these
     are flagged for review in the summary.

A work is skipped when its DOI or normalized title is already in papers.bib, so preprints of
published papers are not re-added. A journal version of an existing preprint is added and flagged.

BibTeX comes from doi.org content negotiation; the venue abbreviation comes from Crossref.

Usage: python3 bin/update_publications.py [--dry-run] [--summary PATH]
Runs weekly in .github/workflows/update-publications.yml, which opens a PR with the new entries.
"""

import argparse
import difflib
import html
import json
import re
import sys
import time
import unicodedata
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ORCID = "0000-0003-2862-4432"
AFFILIATION_KEYWORDS = ("Liverpool",)  # matches Xi'an Jiaotong-Liverpool University and University of Liverpool
OPENALEX_TYPES = {"article", "review", "preprint", "letter", "book-chapter"}
CONTACT = "zhenghao.wu@xjtlu.edu.cn"
BIB_PATH = Path(__file__).resolve().parent.parent / "_bibliography" / "papers.bib"

PREPRINT_SERVERS = {
    "10.26434": "ChemRxiv",
    "10.48550": "arXiv",
    "10.1101": "bioRxiv",
    "10.20944": "Preprints",
    "10.31219": "OSF Preprints",
}
KEEP_FIELDS = ["title", "author", "journal", "booktitle", "volume", "number", "pages", "year", "month"]
STOP_WORDS = {"a", "an", "the", "on", "of", "in", "for", "and", "to", "via", "with"}
# Works removed from the site on purpose: never re-added. Lowercase DOI without a version suffix (/v1, /v2...).
EXCLUDED_DOIS = {
    "10.26434/chemrxiv.15004805",  # PolyTrace preprint, removed 2026-11-17
}


def fetch(url, accept="application/json", retries=3):
    headers = {"Accept": accept, "User-Agent": f"wuresearchgroup.github.io publication updater (mailto:{CONTACT})"}
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=headers), timeout=30) as resp:
                return resp.read().decode("utf-8")
        except (urllib.error.URLError, TimeoutError) as err:
            if attempt == retries - 1:
                raise RuntimeError(f"GET {url} failed: {err}") from err
            time.sleep(2 * (attempt + 1))
    raise RuntimeError(f"GET {url} failed")


def norm_doi(doi):
    doi = (doi or "").strip().lower()
    return re.sub(r"^(https?://(dx\.)?doi\.org/|doi:)", "", doi)


def norm_title(title):
    title = html.unescape(re.sub(r"<[^>]+>", "", title or ""))
    title = unicodedata.normalize("NFKD", title)
    return re.sub(r"[^a-z0-9]", "", title.lower())


def find_same_title(title_key, titles):
    """Existing entry with the same title, allowing small wording changes between preprint and published versions."""
    if title_key in titles:
        return titles[title_key]
    for known, entry in titles.items():
        if difflib.SequenceMatcher(None, title_key, known).ratio() >= 0.9:
            return entry
    return None


def is_preprint_doi(doi):
    return doi.split("/")[0] in PREPRINT_SERVERS


def braced_value(text, start):
    """Return the contents of the {...} group opening at text[start], honoring nested braces."""
    depth = 0
    for i in range(start, len(text)):
        if text[i] == "{":
            depth += 1
        elif text[i] == "}":
            depth -= 1
            if depth == 0:
                return text[start + 1 : i]
    return text[start + 1 :]


FIELD = re.compile(r"(\w+)\s*=\s*")


def parse_fields(entry_body):
    """Parse `name = {value}` / `name = "value"` / `name = value` fields of one BibTeX entry (lowercase names)."""
    fields, pos = {}, 0
    while m := FIELD.search(entry_body, pos):
        name, pos = m.group(1).lower(), m.end()
        if entry_body.startswith("{", pos):
            value = braced_value(entry_body, pos)
            pos += len(value) + 2
        elif entry_body.startswith('"', pos):
            end = entry_body.find('"', pos + 1)
            end = len(entry_body) if end < 0 else end
            value, pos = entry_body[pos + 1 : end], end + 1
        else:
            value = re.match(r"[^,}\s]*", entry_body[pos:]).group(0)
            pos += len(value)
        fields.setdefault(name, value)
    return fields


def existing_entries(bib_text):
    entries = []
    for m in re.finditer(r"@(\w+)\s*\{\s*([^,\s]+)\s*,", bib_text):
        if m.group(1).lower() in ("string", "comment", "preamble"):
            continue
        body = braced_value(bib_text, bib_text.index("{", m.start()))
        fields = parse_fields(body.split(",", 1)[1] if "," in body else "")
        entries.append({"key": m.group(2), "doi": norm_doi(fields.get("doi")), "title": norm_title(fields.get("title"))})
    return entries


def orcid_works():
    data = json.loads(fetch(f"https://pub.orcid.org/v3.0/{ORCID}/works"))
    works = []
    for group in data.get("group", []):
        ids = {e["external-id-type"]: e["external-id-value"] for e in group["external-ids"]["external-id"]}
        summary = group["work-summary"][0]
        title = summary["title"]["title"]["value"]
        doi = norm_doi(ids.get("doi"))
        works.append({"doi": doi, "title": title, "source": "ORCID", "preprint": summary["type"] == "preprint" or is_preprint_doi(doi)})
    return works


def openalex_works():
    works, cursor = [], "*"
    while cursor:
        params = urllib.parse.urlencode({
            "filter": f"author.orcid:{ORCID}",
            "select": "doi,title,type,authorships",
            "per-page": 100,
            "cursor": cursor,
            "mailto": CONTACT,
        })
        data = json.loads(fetch(f"https://api.openalex.org/works?{params}"))
        for w in data["results"]:
            ours = [a for a in w["authorships"] if (a["author"].get("orcid") or "").endswith(ORCID)]
            institutions = [i["display_name"] for a in ours for i in a["institutions"]]
            if w["type"] not in OPENALEX_TYPES or not w.get("doi"):
                continue
            if not any(k in inst for k in AFFILIATION_KEYWORDS for inst in institutions):
                continue
            doi = norm_doi(w["doi"])
            works.append({"doi": doi, "title": w["title"], "source": "OpenAlex", "preprint": w["type"] == "preprint" or is_preprint_doi(doi)})
        cursor = data["meta"].get("next_cursor") if data["results"] else None
    return works


def make_key(fields, taken):
    first_author = fields.get("author", "anon").split(" and ")[0]
    last = first_author.split(",")[0] if "," in first_author else first_author.split()[-1]
    words = [w for w in re.findall(r"[a-z0-9]+", norm_ascii(fields.get("title", "")).lower()) if w not in STOP_WORDS]
    base = re.sub(r"[^a-z]", "", norm_ascii(last).lower()) + fields.get("year", "") + (words[0] if words else "")
    key, n = base, 1
    while key.lower() in taken:
        n += 1
        key = f"{base}{n}"
    taken.add(key.lower())
    return key


def norm_ascii(text):
    return unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode()


def build_entry(work, taken_keys):
    doi = work["doi"]
    raw = fetch(f"https://doi.org/{urllib.parse.quote(doi, safe='/')}", accept="application/x-bibtex; charset=utf-8").strip()
    entry_type = re.match(r"@(\w+)", raw).group(1).lower()
    fields = parse_fields(braced_value(raw, raw.index("{")).split(",", 1)[1])
    fields = {k: re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", "", v))).strip() for k, v in fields.items()}

    message = json.loads(fetch(f"https://api.crossref.org/works/{urllib.parse.quote(doi, safe='/')}"))["message"]
    server = PREPRINT_SERVERS.get(doi.split("/")[0])
    venue = (message.get("container-title") or [None])[0] or server
    abbr = (message.get("short-container-title") or [None])[0] or venue
    if venue and not fields.get("journal") and not fields.get("booktitle"):
        fields["journal"] = venue
    if fields.get("month"):
        fields["month"] = fields["month"][:3].lower()

    key = make_key(fields, taken_keys)
    lines = [f"@{entry_type}{{{key},"]
    for name in KEEP_FIELDS:
        if fields.get(name):
            value = fields[name] if name == "month" else f"{{{fields[name]}}}"
            lines.append(f"  {name} = {value},")
    lines.append(f"  doi = {{{doi}}},")
    lines.append(f"  url = {{https://doi.org/{doi}}},")
    if abbr:
        lines.append(f"  abbr = {{{abbr}}},")
    lines.append("  altmetric = {true},")
    lines.append("  dimensions = {true},")
    lines.append("}")
    return key, fields.get("title", work["title"]), abbr, fields.get("year", ""), "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--dry-run", action="store_true", help="print what would be added without writing papers.bib")
    parser.add_argument("--summary", type=Path, help="write a Markdown summary (used as the PR body) to this path")
    args = parser.parse_args()

    bib_text = BIB_PATH.read_text(encoding="utf-8")
    existing = existing_entries(bib_text)
    known_dois = {e["doi"] for e in existing if e["doi"]}
    titles = {e["title"]: e for e in existing if e["title"]}
    taken_keys = {e["key"].lower() for e in existing}

    # ORCID first so it wins over OpenAlex; journal versions before preprints so a preprint of a new paper is skipped.
    errors = []
    candidates = orcid_works()
    try:
        candidates += openalex_works()
    except RuntimeError as err:
        errors.append(f"OpenAlex lookup skipped: {err}")
    candidates.sort(key=lambda w: (w["source"] != "ORCID", w["preprint"]))

    added, skipped_no_doi = [], []
    for work in candidates:
        title_key = norm_title(work["title"])
        if not work["doi"]:
            if work["source"] == "ORCID" and not find_same_title(title_key, titles):
                skipped_no_doi.append(work["title"])
            continue
        if work["doi"] in known_dois or re.sub(r"/v\d+$", "", work["doi"]) in EXCLUDED_DOIS:
            continue
        note = ""
        match = find_same_title(title_key, titles) if title_key else None
        if match:
            if work["preprint"] or not (is_preprint_doi(match["doi"]) if match["doi"] else False):
                continue  # same paper already listed
            note = f"journal version of preprint `{match['key']}`; delete the preprint entry"
        try:
            key, title, abbr, year, entry = build_entry(work, taken_keys)
        except Exception as err:  # keep going; report at the end
            errors.append(f"{work['doi']}: {err}")
            continue
        if work["source"] == "OpenAlex":
            note = "; ".join(filter(None, [note, "found via OpenAlex, not on your ORCID: check authorship, then add it to ORCID"]))
        known_dois.add(work["doi"])
        titles[title_key] = {"key": key, "doi": work["doi"]}
        added.append({"key": key, "title": title, "abbr": abbr, "year": year, "doi": work["doi"], "entry": entry, "note": note})
        print(f"+ {key}: {title} ({abbr}, {year}){' [' + note + ']' if note else ''}")

    if added and not args.dry_run:
        # New entries go right after the @string line so the file stays newest-first.
        block = "\n\n".join(a["entry"] for a in added) + "\n\n"
        anchor = re.search(r"@string\{[^\n]*\n\s*", bib_text)
        pos = anchor.end() if anchor else bib_text.index("@")
        BIB_PATH.write_text(bib_text[:pos] + block + bib_text[pos:], encoding="utf-8")

    if args.summary:
        out = [f"Found {len(added)} new publication(s) on [ORCID](https://orcid.org/{ORCID}) / OpenAlex.", ""]
        for a in added:
            out.append(f"- **{a['title']}** ({a['abbr']}, {a['year']}), [doi:{a['doi']}](https://doi.org/{a['doi']}), key `{a['key']}`")
            if a["note"]:
                out.append(f"  - ⚠️ {a['note']}")
        out += [
            "",
            "Before merging:",
            "- [ ] Remove anything that isn't ours",
            "- [ ] Add `preview={...}` images (in `assets/img/publication_preview/`)",
            "- [ ] Mark highlights with `selected={true}`; tag research-page papers with `thrust={hierarchical|design|topology}`",
        ]
        if skipped_no_doi:
            out += ["", "On ORCID without a DOI (not added):"] + [f"- {t}" for t in skipped_no_doi]
        if errors:
            out += ["", "Errors:"] + [f"- {e}" for e in errors]
        args.summary.write_text("\n".join(out) + "\n", encoding="utf-8")

    print(f"{len(added)} new, {len(skipped_no_doi)} without DOI, {len(errors)} errors")
    return 1 if errors and not added else 0


if __name__ == "__main__":
    sys.exit(main())
