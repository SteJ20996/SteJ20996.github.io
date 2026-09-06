# Project skills

Skills in this directory are loaded by Claude Code for this repository. Invoke one by
name (for example `/idea-evaluator` or "use the tech-paper-template skill") or let the
assistant pick it from the description in each `SKILL.md`.

## Supervisor-Skills (installed 2026-09-06)

- Source: https://github.com/HKUSTDial/Supervisor-Skills (Yuyu Luo, HKUST Guangzhou,
  DIAL lab), version 2.1 line, upstream commit `207bc6f7a1aa107e544099c2c7cc86816fba9628`.
- License: CC BY-NC-SA 4.0 (see `LICENSE-supervisor-skills`). Non-commercial use with
  attribution; derivative skills must carry the same license.
- Reader guides copied verbatim from upstream: `GUIDE.zh.md` (中文) and `GUIDE.en.md`.
- Trimmed on install: `drawio-reconstruction/assets/` (README showcase images) and the
  example input PNGs under `drawio-reconstruction/examples/` (about 12 MB of binaries
  that do not belong in a GitHub Pages repository). The example `.drawio` files and all
  scripts are kept. Re-copy from upstream if the showcase images are ever needed.
- Validated with upstream's `scripts/lint_skills.py` (12 skills clean).

| Skill | Role in this repo's research line |
|---|---|
| `idea-evaluator` | Vet a study or paper idea; non-STEM route (education / social science) applies. |
| `deep-research` | Survey-grade literature sweep with per-citation verification. |
| `tech-paper-template` | Lock the logic chain (background, gaps, goal, challenges, method, contributions) before drafting. |
| `intro-drafter` | Six-paragraph Introduction prose from the locked chain. |
| `paper-writer` | Evidence-gated section drafting (has a non-STEM CER path). |
| `paper-polish` | Meaning-preserving polish, AI-tone removal, 中譯英. |
| `pre-submission-reviewer` | Reviewer-style pass before submission. |
| `rebuttal-guidance` | Structured responses to reviewer comments. |
| `figure-designer` / `drawio-reconstruction` | Figure planning; rebuild reference figures as editable Draw.io. |
| `benchmark-paper-template` | Benchmark/evaluation papers (not currently used here). |
| `vibe-research-workflow` | Behavioral rules for AI-assisted research sessions. |

Upstream's skills are written for STEM venues (SIGMOD, NeurIPS, ...). For the
dissertation and the education papers, the relevant paths are the non-STEM routes inside
`idea-evaluator` (references/domain-evaluation-frameworks.md) and `paper-writer`; the
STEM-specific advice (baselines, ablations, leaderboards) does not transfer.
