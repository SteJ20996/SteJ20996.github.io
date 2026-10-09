# SteJ Delta Project (STEJDP)

**Aliases:** SteJ Delta Project, STEJDP, Delta, the Calibration Mirror, Quidence (the
learning site that replaced Delta on the portfolio, 2026-10-08).
When the owner mentions any of these names — in this repo or elsewhere — work inside the
framework defined in this file. This file is the project's persistent memory; keep it
updated when major decisions change.

**Owner:** Yizhen (Stephen) Jia — math educator (SAT/AP Calculus instructor), EdD student
in Leadership, Curriculum & Instruction at Westcliff University. Research lines: the
main cluster is GenAI's cognitive effects on learning (dissertation: how adult first-year
undergraduates judge that GenAI-assisted mathematics work is ready to submit; see §3);
graphicacy/data visualization as a tool for externalizing understanding, including a
PRISMA-ScR scoping review (Graphicacy × GenAI × Education) that doubles as Chapter 2.
"AI-native", "first generation", and similar cohort labels are retired everywhere.

**Owner's papers (both featured as cards in the portfolio's Research section, both
linked to EdArXiv preprints):**
- **MDC** — "Metacognitively Discordant Completion and the Aware Pass-Through of
  Non-Understanding in Generative AI Learning" (Jia, solo). Defines MDC as the
  conjunction of invested effort + formed first-person awareness that understanding has
  not occurred + releasing the completion anyway; distinguishes it from illusion/
  integrity/disengagement framings; grounds a planned interpretative phenomenological
  study anchored in graphicacy. When the owner says "MDC", this is what they mean.
  Preprint (live, moderation accepted 2026-08-24): https://osf.io/preprints/edarxiv/wzjxf_v1
  DOI: https://doi.org/10.35542/osf.io/wzjxf_v1 · Drive PDF backup:
  https://drive.google.com/file/d/16thgXqvKipqxEdw7ifAYVzbjH6gBkakn/view
- **ACB** — "The Absent Cognitive Baseline: Theorizing a Structural Gap in AI-Native
  College Students' Academic Self-Assessment" (Jia & Jiarui Xu). MDC's sibling
  construct: the case where a tool did the work before the skill formed, so no verdict
  about understanding can issue at all. Three dimensions: unknowability, false
  calibration, de-normalization of struggle; moderating-variable model (use/learner/
  environment-level); IPA proposed as the empirical path. Submitted to Postdigital Science and
  Education (2026-06-02; the site says "under journal review", never the venue).
  Preprint (live): https://osf.io/preprints/edarxiv/4cr8j_v5

**Scoping review (Chapter 2) and its page (added 2026-09-27, live since PR #18 /
delta#17; owner approved it on 2026-09-27 as an interim version, labelled "Interim version" with numbers as of about
2026-06-15, via `review/data/review.json` `version` / `as_of_approx`):** "Graphicacy in the Generative AI Era: A PRISMA-ScR Scoping Review of an
Emerging Three-Way Intersection in Education" (Jia & Xu; R1 Jia, R2 Xu). Protocol
registered on OSF 2026-05-26: https://osf.io/s8ebf/ (five RQs; RQ3, construct
operationalization, carries the analytical weight). Source records live in the owner's
Drive: `ScopingReview_Protocol`, `Search_Syntax` (Appendix A), `Charting_Codebook`
(Appendix C, with the *1_Charting_Matrix* tab), `TA Screening Kickoff` (2026-06-10).
State as of those records: 11 databases searched 2026-05-29 (85 records; ACM 75,
Scopus 5, EdSource 3, WoS 2, all others 0; ERIC's count is the 2026-06-09 isolated
re-run), +1 Google Scholar record, 83 after de-duplication, 38 proceedings
front-matter records, 45 left for close title/abstract reading; later screening
numbers are not recorded in Drive. Charting: S001 Hung & Lai 2025 and S002 Yan et al.
2025 included (audit pending), S003 DataliVR excluded at full text but disputed
("Disagreed (in discussion)", not a codebook value), S004 Kleiman & Fitzgerald
downgraded to construct-only (its copyright notice forbids feeding the full text to AI
tools: never open that PDF in a session).
`review.html` + `review/` implement "the review as reproducible software": data CSVs,
`review/build.py` (stdlib; `--import-charting` maps the matrix by Audit status and never
reads outcome measures, key findings, limitations or audit notes), 11 automated checks
(the page is not rewritten while one fails), PRISMA-ScR flow SVG with download, and an
evidence map (chart skill × AI role / level / modality / measurement). Glyph ∩. Since
2026-09-27 (owner's call) the homepage papers band shows it as a third paper tile beside
ACB and MDC: tag "Scoping review · Interim version", → Read more to review.html, OSF as
the small link. Keep that tile's "interim" wording in step with review.json.

**Live site:** https://stephenjia.com/ (custom domain since site#1, 2026-10-08; the old
https://stej20996.github.io/ forwards there; paper pages `acb.html`, `mdc.html`,
`review.html`; `platform.html` is a short Quidence page). **Quidence:** https://www.quidence.com/
(the owner's learning site, separate repo SteJ20996/AA01; not yet deployed as of 2026-10-08).
**Repo:** SteJ20996/SteJ20996.github.io (GitHub Pages, publishes from `main`; the custom
domain is set by the `CNAME` file at the repo root, DNS lives on Cloudflare: four A records
`@` → 185.199.108.153 / .109.153 / .110.153 / .111.153 and a `www` CNAME →
`stej20996.github.io`, DNS-only during setup; HTTPS is enforced in Settings → Pages)
**Working branch convention:** feature branches merged to `main` via PR (owner merges).

**Lines in this repo.** Everything below describes the portfolio line (`index.html`,
`acb.html`, `mdc.html`, `review.html` + `review/`, `platform.html`, `README.md`, this
file). The repo also hosts an unrelated line, `local-llm.html`, a single-file local-model
benchmarking terminal that talks to Ollama from the browser; it shares only the design
system. Quidence, the owner's learning site, lives in its own repo and is only linked
from here (§1). Do not fold these together when reasoning about any of them.

---

## 1. Quidence (the product line; replaced Delta on the site 2026-10-08, delta#19)

**What it is.** A learning site for school and further mathematics, statistics, and
introductory physics: Pre-Algebra, Algebra I, Geometry, Algebra II; Pre-calculus,
Calculus, Statistics, Linear Algebra; Physics 1 and Physics 2 Foundations. Each course
has short lessons, "Test your understanding" check problems with several parts, and two
California-inspired field projects. Quidence checks the fixed parts of an answer and
saves calculations, drawings and explanations for review; it does not verify every
written step. Records stay in the learner's browser; accounts and cloud sync are paused
for public testing. (All of this from the AA01 README and homepage as of 2026-10-08.)

**Source of truth.** Repo `SteJ20996/AA01` (attach with add_repo; clone lands at
/home/user/aa01): `README.md`, `CURRENT_STATUS.md` (状态入口), `BRAND_MIGRATION.md`
(display brand Quidence; internal storage keys keep `cluevera_*`; registered domains
quidence.com / .app / .org, `.com` canonical), `LOCAL_ONLY_REVIEW.md`,
`PRIVACY_AND_RETENTION_DRAFT.md`. Its CI runs checks only; `npm run build:static` makes
the `static-release/` bundle for hosting.

**Hosting.** Canonical address `https://www.quidence.com/` (owner's instruction,
2026-10-08). Nothing was deployed there yet on that date (no DNS record). The owner will
move all Quidence content to that site themselves.

**What the portfolio does with it, and nothing more.** The homepage's Q·Quidence tile
and the short `platform.html` page describe Quidence in a few plain sentences and link
to www.quidence.com. **Never embed, copy, mirror or build the AA01 app into this repo**
(owner, 2026-10-08: "目前链接里不要把这个zip里的内容全部放进去，目前先放
www.quidence.com这个链接"). Brand colors for the tile: navy #142236, teal #71ddc5 /
#62c4af, Q icon (AA01 `assets/favicon.svg`). Site-copy rules (§5) apply to every word
written about Quidence here: plain language, no em dashes, nothing that reads as a
study, recruitment or data collection.

## 2. The Delta record (retired)

Delta, the Calibration Mirror, and Graph Lab were the portfolio's prototype line from
2026-07 to 2026-10-08: a browser-only adaptive-tutor demo (CBM certainty, silent
behavior channel, misconception-tagged items), Graph Lab's table / chart / figure rooms,
and the metacognitive AI-use training direction (instrumental vs. executive
help-seeking). On 2026-10-08 the owner replaced Delta with Quidence on the site:
`platform.html` became the short Quidence page, `graphs.html` was deleted, the paper
pages' "Delta prototype" links went, and the homepage tile became Quidence. The full
design record is preserved in git: `git show 07937b2:CLAUDE.md` (sections 1, 1a, 1b, 2),
`git show 07937b2:platform.html`, `git show 07937b2:graphs.html`. Those notes may inform
Quidence; none of it is live, and none of it is a dissertation instrument (§3).

## 3. Dissertation linkage (the research framework)

**Source of truth:** the owner's handoff document "学位论文进展总览 / Dissertation Status
Handoff" (dated 2026-09-08, supplied 2026-09-09; kept by the owner, not in this repo).
It supersedes everything recorded here before it: the 2026-08 quantitative design
(withdrawn 2026-09-06, never to be referenced again) and the 2026-09-06 "Delta as
elicitation stimulus" option (superseded: the interview design closed as purely
retrospective). Consult the handoff, or ask the owner, before touching any research
wording.

- **Delta is not part of the dissertation.** It is the product line only: no instrument
  role, no elicitation task, no research mode, no questionnaire, no data sink. The site
  must never suggest otherwise.
- **Working title (provisional, 2026-09-01):** "How Adult First-Year Undergraduates Judge
  That GenAI-Assisted Mathematics Work Is Ready to Submit" (no colon; whether to restore
  "whether" in title and central RQ is an open decision).
- **Phenomenon:** deciding whether GenAI-assisted mathematics work is ready to submit.
  "authorizing / release decision" is a post-analysis researcher metaphor and never
  appears in titles, RQs, recruitment, or coding.
- **Design:** interpretative phenomenological analysis (Smith, Flowers & Larkin, 2022);
  purely retrospective interviews, remote, audio only; optional participant-led,
  show-only artifact elicitation (nothing retained, nothing recorded, no account or LMS
  access, no files). Two contrasting task contexts (geometry proof, statistics
  interpretation), explicitly not comparison groups. Graphicacy is a tool for
  externalizing understanding, not the object of study.
- **Population:** adults (18+), high-school class of 2026, first-time degree-seeking
  undergraduates entering fall 2026, described as a cohort whose secondary-school years
  substantially overlapped with publicly available GenAI. Excludes high-school students
  and anyone the owner has ever taught. If timing slips, the label becomes "Fall 2026
  entering cohort"; never a younger class.
- **Pipeline:** screen roughly 40–60 → consent about 15 → complete and analyze 12–14 →
  committed reporting floor 8–12; every completed interview is analyzed, no typicality
  selection.
- **Construct discipline:** ACB and MDC never appear in RQs, recruitment materials, or
  coding labels; findings are written in experiential language; theory talk is confined
  to Chapter 5; the two preprints are mention-tier only. Time-layer rule: write "came to
  see the earlier submission as not understood", never "had not understood". Nothing in
  the study tests anyone's current understanding.
- **Problem statement:** organized as two issues (Adu & Miles, 2023 alignment): (1) the
  judgment students make at submission is undescribed; (2) the place of their own
  understanding in that judgment is assumed, not examined. Binds to two purpose
  objectives and two research questions.
- **Five distinctions held without presuming separation:** artifact correctness ≠
  completeness ≠ personal understanding ≠ independent reproducibility ≠ readiness to
  submit.
- **Timeline (coarse):** prospectus course through late October 2026; department review
  up to six weeks; chair assigned; proposal defense before IRB (the chair submits IRB);
  interviews likely spring/summer 2027; defense deadline December 2027.

## 4. Compliance decisions (re-derived for the qualitative design)

- Order of operations: prospectus → department review → chair → proposal defense →
  IRB submission by the chair → IRB approval → only then any recruitment. **Nothing that
  resembles recruitment, an interest list, or a signup may appear on the site before IRB
  approval.**
- Human-subjects and RCR training completed 2024-10, valid to 2027-10-05; a refresher is
  planned if data collection runs past that date.
- No recruiting or interviewing anyone the owner has ever taught (methodological reason
  first: such a sample would not resemble real cases; power-dynamics protection second).
- Adults only; no minors, no high-school students.
- Artifact elicitation: participant-led, optional, show-only; the researcher keeps
  nothing; no prompts, assignments, feedback, or grades collected; no permissibility
  questions; refusal to show is never data; displayed material never enters the audio.
- Participant data are handled with GenAI fully excluded.
- The former opt-in research mode / questionnaire / Qualtrics / Cloudflare data path is
  withdrawn with the quantitative design. The site collects nothing and must stay that way.

## 5. Working agreements

- Two design systems since 2026-08-24 (owner's choice, delta#9). Portfolio pages
  (`index.html`, `acb.html`, `mdc.html`) use the graphite-indigo "broadsheet bento"
  system: ink #16181e, paper #f3f4f6, accent #31548e; one-viewport sheet of
  hairline-ruled tiles (flex-wrap, gap 1px over a rule-colored ground); a zoom control
  (0.8x-1.6x, five steps, persisted in localStorage key `yj-zoom`) whose buttons sit in
  the sticky contact strip's reserved left padding so they never cover text; reflow on
  zoom is 5 tiles -> 4+1 -> 3+2; glyph family ∫ (home), Q (Quidence), ∅ (ACB), ≠ (MDC),
  ∩ (scoping review, `review.html`); Δ retired with Delta.
  Exception (since 2026-10-08, delta#19; before that the tile previewed Delta's
  black-gold): the homepage's Q·Quidence tile alone is hardcoded to Quidence's own brand
  (navy #142236 ground, teal #71ddc5 label and link, teal #62c4af Q watermark) as a
  preview of www.quidence.com; the rest of the portfolio stays graphite-indigo. The tile
  is a `<section>`: its "→ Open Quidence" link stretches an overlay over the whole tile,
  so any click opens www.quidence.com in a new tab. With three paper tiles,
  laptop-height screens (861px+ wide, 940px or less tall) hide the About tile's closing
  aside (`.about p.dim`) so the homepage still fits one screen from 1280×800 to
  2560×1440; the 820px compact mode is otherwise unchanged.
  `platform.html` is a short Quidence page in the portfolio chassis (kept so old links
  land somewhere); `local-llm.html` keeps the original warm-paper terracotta system.
  Fonts are shared across all systems; the section-numbering pattern continues.
- Owner copy rules (2026-08-24): no em dashes anywhere in site copy (en-dash ranges like
  K–8 are tolerated); no phone number publicly listed on the site.
- Research-wording rules (2026-08-24, owner's 99-guideline revision doc, delta#13).
  Site self-description must not pre-state study conclusions: process wording only
  (banned in自述: "misjudge", "often wrongly", "poor judge"-style assertions about
  learners; use "come to judge" / "experience judging"). "AI-native" and first-cohort
  claims are retired from site copy; published paper titles, subtitles, abstracts and
  citations are historical text, verbatim, never edited. The prototype "estimates"
  understanding, never "diagnoses"; no behavior-vs-self-report opposition anywhere on
  the site (the dissertation itself is interview/self-report research). "calibration"
  stays out of the dissertation research-line description (the study measures perceived
  understanding, not calibration accuracy) but remains valid inside the Delta product
  context (Calibration Mirror, CBM machinery).
- Plain-language rule for all site copy (2026-09-09, delta#14, at the owner's request):
  write for a general reader. A technical term appears only next to an everyday
  explanation (e.g. the scoring is described plainly, then "the method is called
  certainty-based marking" in parentheses). Adopted from the owner's 99 writing rules for
  site use: no "rather than" (say it plainly or use "instead of"), short everyday words
  over Latinate ones, one idea per sentence, no em dashes. The demo's report strings and
  button labels count as site copy; the engine's item labels and key-idea labels are
  content and may keep mathematical vocabulary.
- Bilingual (EN/中文) heuristics for anything that reads student text.
- Item traps must map to *named*, literature-plausible misconceptions.
- Test every demo change end-to-end in headless Chromium (Playwright at
  /opt/node22/lib/node_modules/playwright) before committing.
- Owner merges PRs themselves; Pages deploys from `main` (~1 min; hard-refresh or `?v=N`
  to bust cache).
- Commit style: descriptive multi-paragraph messages explaining the pedagogy/method
  rationale, not just the diff.

**Work references (adopted 2026-08-24).** GitHub's PR/Issue counter is repo-global and
cannot be reset or namespaced, so it is an internal serial only — never a work reference.
The canonical reference is `<line>#<n>`, counted separately per project line:
- `delta#n` — the Delta line (`index.html`, `platform.html`, `CLAUDE.md`); closed at
  `delta#19` (2026-10-08, the PR that replaced Delta with Quidence on the site)
- `site#n` — the portfolio line from 2026-10-08 on (`index.html`, `acb.html`, `mdc.html`,
  `review.html` + `review/`, `platform.html`, `README.md`, `CLAUDE.md`); starts at `site#1`
- `llm#n` — the local-llm terminal line (`local-llm.html`)

Every PR title carries its reference as a `[line#n]` prefix. Already assigned: PRs #1–#8
retitled `delta#1`–`delta#8`; PR #9 is `llm#1`. Before opening a new PR, find the highest
`[<line>#n]` used on that line and increment it — do **not** derive the number from
GitHub's. A new project line starts its own counter at 1.

## 6. Open threads (update as they resolve)

- Field-period rules from the 99-guideline doc (recorded now, execute at IRB package
  stage): recruitment page as a standalone /study.html with experience-near language
  only (no ACB/MDC/baseline/discordant/misjudge/calibration/integrity/cheating terms);
  during fieldwork, no prominent homepage link to it and no paper/prototype links from
  it; no signup form, interest list, or email collection anywhere before IRB approval;
  participants' residual exposure to the site is not probed in interviews, it goes to
  the reflexivity log and limitations.

- Dissertation pending decisions live in the owner's handoff document (§10 there, 16
  items as of 2026-09-08: title/RQ "whether", compressing to two RQs, purpose rewrite,
  interview window, eligibility details, GenAI-involvement threshold, geometry/statistics
  balance, ACB/MDC naming in the framework week, Chapter 2 lineage, perceived vs
  demonstrated understanding, IRB confirmations, protocol consistency, and several
  editing items). None of them touch the site.
- Unmerged branch `claude/supervisor-skills-thesis-setup-i01ig8` (2026-09-06) carries a
  CLAUDE.md rewrite that the 2026-09-08 handoff has since superseded, plus roughly 15k
  lines of Supervisor-Skills. Owner to decide: merge (then this file's §3/§4 win), rebase,
  or drop.
- Scoping review page: live as an interim version and carried on the homepage as a paper
  tile (2026-09-27). Still open: Jiarui Xu, as co-author, and the chair should know the
  interim counts are public. Data follow-ups the build already flags: CNKI and Airiti search
  strings are paraphrases (verbatim copies from screenshots pending); ACM's recorded
  string (title/abstract/keyword) differs from the executed full-text "Anywhere" run;
  S002's charted reference lacks its DOI (10.1016/j.compedu.2025.105322). Not in the
  data, for the owner to classify: the screening kickoff's agreement rule (≥75% raw
  agreement on a 20-record pilot) differs from protocol §3.5 (Cohen's κ ≥ .70 on a 10%
  subsample), which §5.1 lists as a substantive amendment needing an OSF update.
- Quidence hosting: `www.quidence.com` had no DNS record on 2026-10-08; the portfolio
  already links there (homepage tile, `platform.html`, README). When the owner deploys
  Quidence, nothing on the portfolio needs to change. This repo never hosts or copies
  Quidence content (owner, 2026-10-08).
- stephenjia.com: domain bought on Cloudflare (2026-10-08); zone active (DNS setup
  "Full"). site#1 adds the `CNAME` file and switches README/CLAUDE.md to the new
  address. Order that avoids downtime: Cloudflare records first (see the Repo line), then
  merge site#1, then GitHub Settings → Pages: wait for "DNS check successful", tick
  "Enforce HTTPS" (certificate can take up to a day). Optional afterwards: verify the
  domain under the account's Pages settings (prevents takeover); Cloudflare Email Routing
  for a you@stephenjia.com forward; turning on the Cloudflare proxy (orange cloud) only
  with SSL/TLS mode "Full (strict)". Content inventory lives in the owner's Claude Doc
  "stephenjia.com 内容整理".
- Delta is retired on the site (2026-10-08, delta#19); its design record stays at commit
  07937b2 (§2). The project's own name remains SteJ Delta Project (STEJDP) in the
  aliases so the owner's references keep routing here.
