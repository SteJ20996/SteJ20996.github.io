# SteJ Delta Project (STEJDP)

**Aliases:** SteJ Delta Project, STEJDP, Delta, the Calibration Mirror.
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

**Live site:** https://stej20996.github.io/ (portfolio) · https://stej20996.github.io/platform.html (Delta vision page)
**Repo:** SteJ20996/SteJ20996.github.io (GitHub Pages, publishes from `main`)
**Working branch convention:** feature branches merged to `main` via PR (owner merges).

**Two project lines share this repo.** Everything below describes the *Delta* line
(`index.html`, `platform.html`, this file). The repo also hosts an unrelated line —
`local-llm.html`, a single-file local-model benchmarking terminal that talks to Ollama
from the browser. It shares only the design system; no code, no research framing, no
compliance surface. Do not fold the two together when reasoning about either.

---

## 1. Vision (what Delta is)

An adaptive learning platform whose working thesis is: **the feeling of understanding
and actual understanding often come apart (the metacognitive-miscalibration literature),
so a tutor should estimate understanding from what the learner does and adapt**
difficulty, spacing, and representation to close the gap between *felt* and *real*
understanding. This is a product stance. It stays out of the dissertation's voice
(§3, §5 wording rules) and the site never phrases it as behavior-versus-self-report.

Core principles (all deliberate, all defended on the page):
- **Effort is the mechanism, not the price** (Bjork's desirable difficulties): retrieval,
  committing to answers, predicting confidence, writing explanations — each both teaches
  and emits diagnostic data.
- **No "learning styles"**: the popular visual/auditory/kinesthetic framing is debunked;
  Delta adapts on evidence-based axes instead (difficulty/ZPD, misconceptions, spacing,
  representation).
- **The mirror is the intervention**: showing the learner what the system inferred about
  them (calibration gap, misconceptions, behavior-report disagreement) is itself the
  metacognitive training.
- **Honest seams**: everything rule-based is labeled as such; the model-agnostic engine
  interface (`diagnose()` / `updateModel()` / `nextStep()`) is the documented seam where a
  Claude model drops in at Phase 1. Never fake AI; never hide what is heuristic.
- **Positioning inversion vs photo-solver apps**: they use your homework to hand you
  answers; Delta uses the same input to map your understanding.

## 2. Product state (platform.html)

Single self-contained page, since 2026-08-24 (delta#11) a compact bento sheet (~2
screens at default zoom, was ~10 screens of long scroll) in the black-gold dark system:
charcoal ground #1d1c19, bright warm text #f0ede4, brass accent #c9a45c, cards #262420,
rules #3d3a31, good #72b98d, warn #d9a83d; fonts unchanged (DM Serif Display /
Instrument Sans / JetBrains Mono); Δ motif echoing the portfolio's ∫. Accent buttons
carry near-black text on gold (white-on-gold fails contrast); the .work code block is
darker than its card (#121110) rather than ink-inverted. All logic in-browser; **no data leaves the page** (a stated
compliance asset).

The Calibration Mirror demo:
- **Level picker** → three age bands, six items each:
  - Elementary (3–5): equals-sign, area-vs-perimeter, regrouping subtraction, unit
    fractions, ×0.5, division-as-fitting.
  - Middle (6–8): (−3)², inverse proportion, fraction division, median-vs-mean,
    distributive law, dice sums.
  - High (SAT-hard, long-form multi-step): mean-in-totals, no-solution parameter,
    per-year rate from per-period exponential, mixture-by-replacement, work-rate with
    head start, circle completing-the-square. Every trap answer maps to a named
    misconception.
- **Per item:** free numeric answer (tolerant bilingual parser: units, currency,
  fractions, unicode minus) → required written explanation (EN or 中文) → CBM certainty
  (Gardner-Medwin: Guessing +1/0, Fairly sure +2/−2, Certain +3/−6; payoff table shown;
  honesty is the expected-score-maximizing strategy).
- **Silent behavioral channel:** per-item timing, answer changes; cross-checked against
  stated certainty (disagreement is itself diagnostic).
- **No feedback until the end** (measurement independence); then a full report: claimed-vs-
  real bars, per-item cards (misconception with source attribution: answer / explanation /
  both), key-idea presence in explanations, learner model, next move.
- Explanation analysis = transparent bilingual keyword heuristic, explicitly labeled a
  stand-in for the Phase-1 Claude grader.

Page structure: masthead (Δ orbit art, back link) → tile band 01 problem / 02 effort /
03 honest caveat (learning styles) → 04 demo tile (the interactive card, engine and
markup untouched by the redesign) → tile band 05 loop / 06 dimensions / 07 contract →
band 08 homework-photo concept (Phase 1 design contract) / 09 roadmap (Phase 0 done;
1: Claude behind the seam + homework photos; 2: persistent learner model; 3: study &
evidence) → sticky contact strip with the shared zoom control (`yj-zoom`). The old nav,
hero, long prose sections, and reveal-on-scroll JS are gone; all engine JS is intact.

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
  zoom is 5 tiles -> 4+1 -> 3+2; glyph family ∫ (home), Δ (Delta), ∅ (ACB), ≠ (MDC).
  Exception (2026-08-24, delta#12, owner settled here after trying all-white-gold and
  all-black-gold): the homepage's Δ·Prototype tile alone is hardcoded to platform.html's
  black-gold (tile #1d1c19, text #f0ede4, brass #c9a45c) as a theme preview of the
  Delta page; the rest of the portfolio stays graphite-indigo.
  `platform.html` uses the black-gold dark system (see section 2, delta#11);
  `local-llm.html` keeps the original warm-paper terracotta system.
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
- `delta#n` — the Delta line (`index.html`, `platform.html`, `CLAUDE.md`)
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
- Item bank expansion (product line only; no study statistics attached).
- Phase 1: Claude behind the seam (needs key-proxy decision); homework-photo flow.
- Working name "Delta" is provisional; project name is SteJ Delta Project (STEJDP).
