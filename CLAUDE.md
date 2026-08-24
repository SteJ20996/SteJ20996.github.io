# SteJ Delta Project (STEJDP)

**Aliases:** SteJ Delta Project, STEJDP, Delta, the Calibration Mirror.
When the owner mentions any of these names — in this repo or elsewhere — work inside the
framework defined in this file. This file is the project's persistent memory; keep it
updated when major decisions change.

**Owner:** Yizhen (Stephen) Jia — math educator (SAT/AP Calculus instructor), EdD student
in Leadership, Curriculum & Instruction at Westcliff University. Research lines:
graphicacy/data visualization in math education; GenAI's impact on cognition and
self-assessment calibration of AI-native students.

**Owner's papers (both featured as cards in the portfolio's Research section, both
linked to EdArXiv preprints):**
- **MDC** — "Metacognitively Discordant Completion and the Aware Pass-Through of
  Non-Understanding in Generative AI Learning" (Jia, solo). Defines MDC as the
  conjunction of invested effort + formed first-person awareness that understanding has
  not occurred + releasing the completion anyway; distinguishes it from illusion/
  integrity/disengagement framings; grounds a planned interpretative phenomenological
  study anchored in graphicacy. When the owner says "MDC", this is what they mean.
  Preprint: https://osf.io/preprints/edarxiv/wzjxf_v1 (v1 still pending moderation as
  of 2026-08-09 — link may 404 for the public until approved). Drive PDF backup:
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

Single self-contained page, same design system as the portfolio (DM Serif Display /
Instrument Sans / JetBrains Mono; paper #f5f2ed, ink #1a1a1e, accent #b04a32; Δ motif
echoing the portfolio's ∫). All logic in-browser; **no data leaves the page** (a stated
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

Page sections: 01 problem → 02 effort → 03 honest caveat (learning styles) → 04 demo →
05 loop → 06 dimensions → 07 contract → 08 homework-photo concept (Phase 1 design
contract) → 09 roadmap (Phase 0 done; 1: Claude behind the seam + homework photos;
2: persistent learner model; 3: study & evidence).

## 3. Dissertation linkage (the research framework)

Delta is the dissertation's **instrument**, not an illustration. Agreed frame:
- **Primary: Design B (descriptive/correlational).** RQ family: how calibrated are
  AI-native college students in math problem solving (claimed certainty vs actual
  performance); does self-reported GenAI usage correlate with calibration accuracy?
- **Qualitative strand: Design D.** The written explanations are codable reasoning
  traces (misconception taxonomy = codebook seed). Case studies, extreme-calibration
  cases, and heuristic-vs-human-coding agreement (Cohen's κ) as a methods contribution.
- **Design A (instrument validity/reliability) reported inside the methods chapter.**

**Session/measurement design (evidence-grounded, 2026-08; pending chair approval):**
- **3 sessions × 6 items (≤25 min each), days apart** — resolves the tension between
  test-fatigue evidence (attention collapse at ~7–9 min; open-ended + high-demand items
  are the strongest dropout multipliers; single-session cap ≈ 6–8 items) and calibration
  stability (per-person bias index stabilizes near ~40 judgments; 18/person via
  Spearman-Brown ≈ .75 reliability, acceptable with attenuation reported).
- **Primary analyses on session 1** (fullest N, no attrition bias); person-level
  stability analyses on 3-session completers. Item order randomized per person
  (position effects otherwise confound item comparisons).
- **Fixed core + voluntary continuation**: causal/primary claims only on the fixed core;
  self-selected continuation analyzed observationally (voluntary dose as a finding).
- **Disclosure**: state full session count and honest durations upfront (expectation-
  reality match is the strongest completion lever); avoid long-task progress bars.
- **Brier**: CBM levels map to p = .50/.75/.92; primary index = bias (mean confidence −
  accuracy, most robust at moderate item counts); person-level Brier secondary; Murphy
  decomposition at GROUP level only (person-level resolution needs ~100+ items — out of
  scope). The p-mapping is a stated methods convention, revisitable empirically.
- **Power/N**: core N = 84 (r ≈ .30, α = .05, power = .80); Green's 104+m ≈ 108 as the
  conservative cross-check; recruit 120–130 for attrition. Item statistics need ≥30–50
  responses/item (gold standard 100); 120 × full 18-item coverage clears it.
- **Timestamps**: four stages per item (read → answer → explain → certainty) + edit
  counts, all computed locally, included in the opt-in submission payload.

## 4. Compliance decisions (agreed)

- **IRB approval from Westcliff BEFORE any data collection**; owner contacts chair/adviser
  to start. CITI training likely required. Expect exempt/expedited (anonymous, minimal
  risk, educational).
- Participant age for the study: **undecided**, but architecture must keep the study
  fully anonymous; participants self-select the age band truthfully. If minors are ever
  included: parental consent + assent, COPPA (<13), FERPA/state laws if via schools —
  heavy; the lighter default is 18+ college students (matches the GenAI research line).
- **No recruiting the owner's own students** (power-dynamics/coercion).
- Data path: **research mode is opt-in** — consent screen → background questionnaire →
  test → explicit "submit my anonymized session" action. Nothing collected without it.
- **Dissertation phase: Qualtrics/Google-Forms as the data sink** (no custom backend,
  IRB-familiar). **Product phase: migrate to Cloudflare Worker** (same worker later
  proxies the Claude API for Phase 1).
- No PII, no IP logging, random session IDs; consent discloses that anonymous data
  cannot be withdrawn after submission.

## 5. Working agreements

- Match the existing design system exactly for anything on the site; the Δ motif and the
  section-numbering pattern continue.
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

- Chair meeting: 16-question list delivered (scope, 3×6 design, N, scales, IRB route,
  age/recruitment, qualitative coding, timeline). Awaiting outcomes → then build
  research mode (consent + questionnaire + Brier + per-stage timestamps + session
  blocks + Qualtrics handoff).
- Item bank expansion to ~18 with parallel forms; pilot for item stats.
- Phase 1: Claude behind the seam (needs key-proxy decision); homework-photo flow.
- Working name "Delta" is provisional; project name is SteJ Delta Project (STEJDP).
