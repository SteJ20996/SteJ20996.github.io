#!/usr/bin/env python3
"""Check the scoping-review data files and rebuild review.html from them.

Usage (run from anywhere):
  python3 review/build.py                       check the data, then rebuild review.html
  python3 review/build.py --check               check only; exit 1 if any check fails
  python3 review/build.py --import-charting FILE.csv
      refresh data/studies.csv from a CSV download of the Charting Matrix tab
      (Google Sheets: File > Download > Comma-separated values), then build

Standard library only (Python 3.8+). The page is never rewritten while a check fails.
"""
import argparse
import csv
import json
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
DATA = HERE / "data"
PAGE = HERE.parent / "review.html"

STUDY_COLUMNS = [
    "id", "short", "citation", "doi", "year", "country", "language", "source",
    "population", "sample_size", "level", "prior_ai", "methodology", "design",
    "genai_role", "genai_system", "genai_modality", "activities",
    "primary_activity", "chart_types", "domain", "measurement", "status", "check",
]

# Charting Matrix header -> public column. Matching ignores case and punctuation,
# so both the matrix's short headers and the codebook's field names work.
# Columns not listed here (outcome measures, key findings, author limitations,
# audit notes) are the review's own analysis and are deliberately never imported.
HEADER_ALIASES = {
    "id": ["study id"],
    "citation": ["authors"],
    "year": ["year"],
    "country": ["country"],
    "language": ["language"],
    "source": ["source db", "source database"],
    "population": ["population"],
    "sample_size": ["sample size"],
    "level": ["age band"],
    "prior_ai": ["prior ai exp", "prior ai exposure"],
    "methodology": ["methodology", "methodology type"],
    "design": ["design type"],
    "genai_role": ["genai role"],
    "genai_system": ["genai system", "genai system family"],
    "genai_modality": ["genai modality"],
    "activities": ["activity types present"],
    "primary_activity": ["primary activity", "primary activity type"],
    "chart_types": ["chart types"],
    "domain": ["domain context"],
    "measurement": ["measurement target"],
    "audit": ["audit status"],
}

AUDIT_TO_STATUS = {
    "Pending": ("included", "awaiting second-reviewer check"),
    "Verified": ("included", "checked by the second reviewer"),
    "Discrepancy resolved": ("included", "checked by the second reviewer"),
    "Downgraded (§3.7)": ("construct_only", ""),
    "Excluded (full-text)": ("excluded", ""),
}

CODED_KEYS = ["language", "source", "level", "prior_ai", "methodology", "design",
              "genai_role", "genai_system", "genai_modality", "activities",
              "primary_activity", "chart_types", "domain", "measurement"]

MAIN_CHAIN = ["identified_databases", "after_dedup", "screened", "excluded_frontmatter",
              "screened_substantive", "excluded_ta_other", "fulltext_assessed",
              "excluded_fulltext", "included"]


# ---------- small helpers ----------

def norm_header(h):
    return re.sub(r"[^a-z0-9 ]", "", h.lower()).strip()


def base(value):
    """Codebook value without its parenthetical detail: 'Mixed (UG 77; ...)' -> 'Mixed'."""
    v = value.strip()
    if v.lower().startswith("other"):
        return "Other"
    return re.sub(r"\s*\(.*\)\s*$", "", v).strip()


def split_outside_parens(value, sep):
    parts, depth, cur = [], 0, ""
    i = 0
    while i < len(value):
        ch = value[i]
        if ch == "(":
            depth += 1
        elif ch == ")":
            depth = max(0, depth - 1)
        if depth == 0 and value.startswith(sep, i):
            parts.append(cur.strip())
            cur = ""
            i += len(sep)
            continue
        cur += ch
        i += 1
    if cur.strip():
        parts.append(cur.strip())
    return parts


def split_multi(value, how):
    if not value.strip():
        return []
    if how == "slash":
        return split_outside_parens(value, " / ")
    if how == "semicolon":
        return split_outside_parens(value, ";")
    if how == "plus":
        return [p.strip() for p in value.split("+") if p.strip()]
    return [value.strip()]


def short_name(citation, year):
    authors = citation.split(f"({year})")[0] if year else citation.split("(")[0]
    surnames = re.findall(r"([A-Z][A-Za-z'À-ɏ-]+(?: [A-Z][A-Za-z'À-ɏ-]+)*), (?:[A-Z]\.[\s-]?)+", authors)
    if not surnames:
        return ""
    if len(surnames) == 1:
        who = surnames[0]
    elif len(surnames) == 2:
        who = f"{surnames[0]} & {surnames[1]}"
    else:
        who = f"{surnames[0]} et al."
    return f"{who} ({year})" if year else who


def find_doi(text):
    m = re.search(r"10\.\d{4,9}/[^\s,;]+", text)
    return m.group(0).rstrip(".") if m else ""


def read_csv(path):
    with open(path, newline="", encoding="utf-8-sig") as f:
        return list(csv.DictReader(f))


# ---------- import from the Charting Matrix ----------

def import_charting(path):
    with open(path, newline="", encoding="utf-8-sig") as f:
        rows = list(csv.reader(f))
    header_at = next((i for i, r in enumerate(rows) if r and norm_header(r[0]) == "study id"), None)
    if header_at is None:
        sys.exit(f"{path}: no header row starting with 'Study ID' was found.")
    header = [norm_header(h) for h in rows[header_at]]
    col = {}
    for key, aliases in HEADER_ALIASES.items():
        for i, h in enumerate(header):
            if h in aliases:
                col[key] = i
                break
    missing = [k for k in HEADER_ALIASES if k not in col]
    if missing:
        sys.exit(f"{path}: missing columns for {', '.join(missing)}.")

    studies, notes = [], []
    for r in rows[header_at + 1:]:
        cell = lambda k: r[col[k]].strip() if col[k] < len(r) else ""
        sid = cell("id")
        if not sid or not any(cell(k) for k in col if k != "id"):
            continue
        audit = cell("audit")
        if audit not in AUDIT_TO_STATUS:
            notes.append(f"{sid}: audit status '{audit or '(blank)'}' is not a codebook value, "
                         "so the row is left out until it is resolved.")
            continue
        status, check = AUDIT_TO_STATUS[audit]
        if status == "excluded":
            continue
        rec = {k: cell(k) for k in col if k != "audit"}
        rec["status"], rec["check"] = status, check
        rec["doi"] = find_doi(rec["citation"])
        rec["short"] = short_name(rec["citation"], rec["year"])
        studies.append({k: rec.get(k, "") for k in STUDY_COLUMNS})

    with open(DATA / "studies.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=STUDY_COLUMNS)
        w.writeheader()
        w.writerows(studies)
    print(f"Imported {len(studies)} studies into data/studies.csv "
          f"({sum(s['status'] == 'included' for s in studies)} included).")
    for n in notes:
        print("  note:", n)


# ---------- checks ----------

def run_checks(meta, sources, flow, studies, codebook, deviations):
    checks = []

    def add(cid, label, level, detail):
        checks.append({"id": cid, "label": label, "level": level, "detail": detail})

    fl = {r["key"]: r for r in flow}
    num = lambda k: int(fl[k]["count"]) if fl.get(k) and fl[k]["count"].strip() else None

    # 1. every source has a date and a whole-number count
    bad = [s["name"] for s in sources
           if not s["date_run"].strip() or not s["records"].strip().isdigit()]
    add("sources-complete", "Every source has a run date and a count",
        "fail" if bad else "pass",
        ("Missing for: " + ", ".join(bad)) if bad else f"{len(sources)} sources logged.")

    # 2. database counts add up to the identification box
    dbs = [s for s in sources if s["group"] == "database"]
    total = sum(int(s["records"]) for s in dbs if s["records"].isdigit())
    ident = num("identified_databases")
    add("db-sum", "Database counts add up",
        "pass" if total == ident else "fail",
        " + ".join(s["records"] for s in dbs) + f" = {total}; the flow diagram says {ident}.")

    # 3. duplicates line up with what went into the screening pool
    other, after, dup = num("identified_other"), num("after_dedup"), num("duplicates_removed")
    ok = None not in (ident, other, after, dup) and ident + other - dup == after
    add("dedup", "Duplicates line up with the screening pool",
        "pass" if ok else "fail", f"{ident} + {other} - {dup} = {after}.")

    # 4. front-matter step
    scr, fm, sub = num("screened"), num("excluded_frontmatter"), num("screened_substantive")
    ok = None not in (scr, fm, sub) and scr == after and scr - fm == sub
    add("frontmatter", "Front-matter step adds up",
        "pass" if ok else "fail", f"{scr} - {fm} = {sub}.")

    # 5. unfinished stages carry no numbers, and nothing after them is final
    problems, seen_pending = [], False
    for k in MAIN_CHAIN:
        r = fl.get(k)
        if r is None:
            problems.append(f"'{k}' is missing")
            continue
        st, has = r["status"], bool(r["count"].strip())
        if st == "pending" and has:
            problems.append(f"'{k}' is pending but has a number")
        if st != "pending" and not has:
            problems.append(f"'{k}' is {st} but has no number")
        if seen_pending and st in ("recorded", "derived"):
            problems.append(f"'{k}' is marked {st} after an unfinished stage")
        seen_pending = seen_pending or st == "pending"
    add("pending", "Unfinished stages are marked, not guessed",
        "fail" if problems else "pass",
        "; ".join(problems) if problems else "Stages after the first unfinished one are pending or running counts.")

    # 6. included count matches the study list
    inc = [s for s in studies if s["status"] == "included"]
    con = [s for s in studies if s["status"] == "construct_only"]
    ok = num("included") == len(inc) and num("construct_only") == len(con)
    add("included", "Included count matches the study list",
        "pass" if ok else "fail",
        f"Diagram: {num('included')} included, {num('construct_only')} construct-only. "
        f"Study list: {len(inc)} and {len(con)}.")

    # 7. every code is in the codebook; blank cells in included rows are flagged
    cb = {c["key"]: c for c in codebook}
    off, blank = [], []
    for s in studies:
        for k in CODED_KEYS:
            v = s.get(k, "")
            if not v.strip():
                if s["status"] == "included":
                    blank.append(f"{s['id']} {k}")
                continue
            allowed = {base(a) for a in cb[k]["values"].split(" / ")}
            for part in split_multi(v, cb[k]["multi"]):
                if base(part) not in allowed:
                    off.append(f"{s['id']} {k}: '{part}'")
    level = "fail" if off else ("warn" if blank else "pass")
    detail = []
    if off:
        detail.append("Not in the codebook: " + "; ".join(off))
    if blank:
        detail.append("Not yet charted: " + ", ".join(blank))
    add("codebook", "Every code comes from the codebook", level,
        " ".join(detail) or f"{len(studies)} charted rows, all codes valid.")

    # 8. main skill is among the skills present
    bad = [s["id"] for s in inc
           if base(s["primary_activity"]) not in {base(a) for a in split_multi(s["activities"], "slash")}]
    add("primary", "Main skill is one of the skills present",
        "fail" if bad else "pass",
        ("Check " + ", ".join(bad)) if bad else f"True for all {len(inc)} included studies.")

    # 9. search strings are word for word
    para = [s["name"] for s in sources if s["query_status"] == "paraphrased"]
    diff = [s["name"] for s in sources if s["query_status"] == "differs_from_run"]
    parts = []
    if para:
        parts.append("Paraphrased: " + ", ".join(para) + ".")
    if diff:
        parts.append("Recorded string differs from the run: " + ", ".join(diff) + ".")
    add("verbatim", "Search strings are recorded word for word",
        "warn" if parts else "pass", " ".join(parts) or "All strings are verbatim.")

    # 10. references carry a DOI
    nodoi = [s["id"] for s in inc if not s["doi"]]
    add("doi", "Included references carry a DOI",
        "warn" if nodoi else "pass",
        ("No DOI in the charted reference: " + ", ".join(nodoi)) if nodoi else "All included references link to a DOI.")

    # 11. changes from the plan are classified
    bad = [d["id"] for d in deviations if d["class"] not in ("minor", "substantive")]
    unreg = [d["id"] for d in deviations if d["class"] == "substantive" and "osf" not in d["recorded_in"].lower()]
    add("deviations", "Changes from the plan are classified",
        "fail" if (bad or unreg) else "pass",
        ("Unclassified: " + ", ".join(bad) + ". " if bad else "")
        + ("Substantive but no OSF update: " + ", ".join(unreg) if unreg else "")
        or f"{len(deviations)} logged, all minor (reported in Appendix F).")

    return checks


# ---------- build ----------

def load():
    meta = json.loads((DATA / "review.json").read_text(encoding="utf-8"))
    return (meta, read_csv(DATA / "sources.csv"), read_csv(DATA / "flow.csv"),
            read_csv(DATA / "studies.csv"), read_csv(DATA / "codebook.csv"),
            read_csv(DATA / "deviations.csv"))


def build(check_only=False):
    meta, sources, flow, studies, codebook, deviations = load()
    checks = run_checks(meta, sources, flow, studies, codebook, deviations)
    mark = {"pass": "ok  ", "warn": "WARN", "fail": "FAIL"}
    for c in checks:
        print(f"[{mark[c['level']]}] {c['label']}: {c['detail']}")
    failed = [c for c in checks if c["level"] == "fail"]
    if failed:
        print(f"\n{len(failed)} check(s) failed. review.html was not changed.")
        return 1
    if check_only:
        return 0

    for s in sources:
        s["records"] = int(s["records"])
    for r in flow:
        r["count"] = int(r["count"]) if r["count"].strip() else None
    payload = {
        "meta": meta,
        "sources": sources,
        "flow": {r["key"]: r for r in flow},
        "studies": [s for s in studies if s["status"] in ("included", "construct_only")],
        "codebook": {c["key"]: c["values"].split(" / ") for c in codebook},
        "deviations": deviations,
        "checks": checks,
    }
    blob = json.dumps(payload, ensure_ascii=False, indent=1).replace("</", "<\\/")
    html = PAGE.read_text(encoding="utf-8")
    pattern = re.compile(r'(<script id="review-data" type="application/json">)(.*?)(</script>)', re.S)
    if not pattern.search(html):
        print("review.html has no <script id=\"review-data\"> block to fill.")
        return 1
    html = pattern.sub(lambda m: m.group(1) + "\n" + blob + "\n" + m.group(3), html, count=1)
    PAGE.write_text(html, encoding="utf-8")
    print(f"\nreview.html rebuilt ({len(payload['studies'])} studies, {len(checks)} checks).")
    return 0


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--check", action="store_true", help="check only; do not rebuild the page")
    ap.add_argument("--import-charting", metavar="FILE.csv", help="CSV download of the Charting Matrix tab")
    args = ap.parse_args()
    if args.import_charting:
        import_charting(args.import_charting)
    sys.exit(build(check_only=args.check))


if __name__ == "__main__":
    main()
