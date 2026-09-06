# SteJ Delta Project (STEJDP)

**Aliases:** SteJ Delta Project, STEJDP, Delta, the Calibration Mirror.
When the owner mentions any of these names — in this repo or elsewhere — work inside the
framework defined in this file. This file is the project's persistent memory; keep it
updated when major decisions change.

**Owner:** Yizhen (Stephen) Jia — math educator (SAT/AP Calculus instructor), EdD student
in Leadership, Curriculum & Instruction at Westcliff University. Research lines:
graphicacy/data visualization in math education; how college students who grew up with
generative AI experience judging their own understanding (the dissertation line,
qualitative/IPA only; see section 3).

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
  environment-level); IPA proposed as the empirical path. Submitted to IJETHE
  (2026-06). Preprint (live): https://osf.io/preprints/edarxiv/4cr8j_v5

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

An adaptive learning platform whose thesis is: **students are poor judges of their own
understanding (metacognitive miscalibration), so an AI tutor must diagnose understanding
from BEHAVIOR, not self-report** — and adapt difficulty, spacing, and representation to
close the gap between *felt* and *real* understanding.

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

**Decision (owner, 2026-09-06): the dissertation is a qualitative study only.** The
2026-08 quantitative design (descriptive/correlational, Delta as measurement instrument,
3 sessions x 6 items, CBM-to-Brier mapping, bias index, power and N targets, item
statistics, per-stage timestamps) is withdrawn. Do not revive it, do not use it as a
spec, and do not build research-mode data collection for it. Delta's CBM and report
machinery stay product features only.

- **Design: interpretative phenomenological analysis (IPA)**, the empirical path both
  preprints propose. Idiographic case-by-case analysis first, then cross-case themes;
  double hermeneutic; claims stay idiographic with modest transferability.
- **Phenomenon:** how undergraduate students who completed most of their secondary
  schooling with generative AI available experience judging their own understanding of
  mathematical work completed with AI assistance. Three foci: the moment of releasing
  work as complete (MDC condition III), what they draw on to tell whether understanding
  occurred (ACB reference points), and sense-making of episodes where work was released
  without understanding (MDC condition II). ACB's struggle dimension is an optional
  fourth focus. ACB's "unknowability" is a limit case: it cannot be reported
  retrospectively, which is why the elicitation session below exists.
- **Delta's role: pre-interview elicitation stimulus, not an instrument.** A
  researcher-administered, offline six-item session (answer, written explanation,
  certainty choice) gives every participant a fresh, concrete episode; the interview
  uses the participant's own explanation text and certainty choices as stimulated-recall
  prompts. Nothing from the session is analyzed quantitatively. If the chair keeps
  MDC's graphicacy anchor, the session uses a graphicacy task set instead of Delta's
  arithmetic/algebra bands (open thread, section 6). Fallback if the chair declines a
  task session: retrospective interviews about remembered coursework episodes.
- **Sample:** one homogeneous slice (single institution, lower-division, one required
  quantitative course, self-reported frequent GenAI use during high school), single-digit
  N per professional-doctorate IPA convention (confirm against Smith, Flowers & Larkin),
  none of the owner's own students. The ACB moderating variables (use, learner,
  environment) are described as case context, never treated as variables.
- **Frameworks:** theoretical = metacognitive monitoring and control (Nelson & Narens;
  Koriat's cue utilization; Winne & Hadwin SRL); conceptual = ACB and MDC as sensitizing
  concepts, declared as fore-structures and bracketed, with active negative-case search,
  a reflexivity log, and an audit trail so the constructs can be disconfirmed.
- **Research questions (draft, pending chair):** central RQ on the experience of judging
  one's understanding of AI-assisted work; RQ1 the release decision; RQ2 reference points
  drawn on; RQ3 sense-making of releasing work known not to be understood; RQ4
  (optional) effort and difficulty. Full wording, problem statement, and purpose
  statement in the review artifact linked in section 6.
- **Glossary v1 (freeze after chair):** "verdict" / "judging one's understanding" in the
  dissertation; "perceived understanding" only when engaging literature; "calibration"
  only in the literature review and the Delta product; "self-assessment" and "AI-native"
  only as historical text in the ACB title; Delta "estimates", never "diagnoses".

## 4. Compliance decisions (agreed; re-derived for the qualitative design 2026-09-06)

- **IRB approval from Westcliff BEFORE any data collection**; owner contacts chair/adviser
  to start. CITI training likely required. Expect exempt/expedited (interviews with
  adults on educational topics, minimal risk); confirm the category once the
  task-anchored session is in the protocol.
- Participants: **18+ undergraduates only**, which follows from the IPA population; no
  minors. Interview data are confidential rather than anonymous: pseudonyms, recordings
  and transcripts stored per IRB, consent states the point after which withdrawal is no
  longer possible (once transcripts are de-identified and merged into analysis, or as
  IRB specifies).
- **No recruiting the owner's own students** (power-dynamics/coercion); recruit through
  a partner site (a department, course, or learning center the owner does not teach in).
- Data path for the dissertation: **none through the site.** No research mode, no
  questionnaire, no submission button, no Qualtrics/Forms sink. The elicitation task is
  researcher-administered (offline copy of Delta or a printed task set), nothing leaves
  the page, and the participant's written explanations and certainty choices are kept
  only as interview material under the same consent as the recording.
- The former quantitative pipeline (opt-in research mode, background questionnaire,
  Brier and per-stage timestamps, session blocks, Qualtrics handoff) is withdrawn with
  the quantitative design. A Cloudflare Worker remains a **product-phase** item only,
  for the Phase 1 Claude proxy; it is not a research data sink.
- Site-side rules stand: no PII, no IP logging, no signup or interest lists before IRB
  approval; field-period rules in section 6.

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
- Bilingual (EN/中文) heuristics for anything that reads student text.
- Item traps must map to *named*, literature-plausible misconceptions.
- Test every demo change end-to-end in headless Chromium (Playwright at
  /opt/node22/lib/node_modules/playwright) before committing.
- Owner merges PRs themselves; Pages deploys from `main` (~1 min; hard-refresh or `?v=N`
  to bust cache).
- Commit style: descriptive multi-paragraph messages explaining the pedagogy/method
  rationale, not just the diff.
- Research skills (installed 2026-09-06): HKUSTDial's Supervisor-Skills live under
  `.claude/skills/` (12 skills, CC BY-NC-SA 4.0, provenance in `.claude/skills/README.md`).
  For the dissertation and the education papers use the non-STEM routes: `idea-evaluator`
  (references/domain-evaluation-frameworks.md, empirical-social-science weighting),
  `tech-paper-template` for the logic chain, `paper-writer` / `paper-polish` for prose,
  `deep-research` for literature sweeps, `pre-submission-reviewer` before any submission.
  The STEM-specific advice in those skills (baselines, ablations, leaderboards) does not
  transfer; do not apply it to the research line.

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

- **Dissertation design: qualitative only (owner's decision, recorded 2026-09-06).** The
  2026-08 quantitative design is withdrawn (section 3). Remaining decisions, all with
  the chair: (1) the task-anchored elicitation session and its IRB category; (2) sample
  slice, size, and partner site; (3) graphicacy task set versus general math items for
  the elicitation; (4) wording of the GenAI-use-history sampling criterion; (5) whether
  the committee accepts the owner's own constructs as declared-and-bracketed
  fore-structures or wants a second analyst; (6) freezing the glossary. Full review with
  drafts (problem statement, purpose, frameworks, RQs), verified 2025-2026 literature,
  timeline, and the chair questions:
  https://claude.ai/code/artifact/e325b227-a6c4-4a43-bf64-d0574e3f5eb0 (private artifact).
  The earlier 16-question chair list was written for the withdrawn design (3x6 sessions,
  N, scales); replace it with the questions above before the meeting.

- Field-period rules from the 99-guideline doc (recorded now, execute at IRB package
  stage): recruitment page as a standalone /study.html with experience-near language
  only (no ACB/MDC/baseline/discordant/misjudge/calibration/integrity/cheating terms);
  during fieldwork, no prominent homepage link to it and no paper/prototype links from
  it; no signup form, interest list, or email collection anywhere before IRB approval;
  participants' residual exposure to the site is not probed in interviews, it goes to
  the reflexivity log and limitations.

- Elicitation task set: if the chair keeps the graphicacy anchor, build a six-item
  graphicacy task set (graph construction and reading, with written explanation and a
  certainty choice) for the pre-interview session; Delta's current bands have no graph
  items. Item statistics, parallel forms, and item-bank expansion are product-line
  concerns only and no longer a dissertation need.
- Phase 1: Claude behind the seam (needs key-proxy decision); homework-photo flow.
- Working name "Delta" is provisional; project name is SteJ Delta Project (STEJDP).
