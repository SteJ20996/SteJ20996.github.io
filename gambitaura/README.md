# GambitAura

A series of small two-player strategy games: open information, no dice, no timer.
Domain: gambitaura.com (registered 2026-10-28; not yet pointed at these files).
Working name before that: NeoChess.

## Games

| # | Game | Folder | State |
|---|------|--------|-------|
| 01 | 借路 Jielu | `jielu/` | Playable demo; rules v0.4 with the proposed v0.5 opening as default |

## 借路 Jielu

- `jielu/index.html`, `app.js`: the game page (zh-Hant / English, vs computer or two players on one device).
- `jielu/engine.js`: the rules, pure functions, shared by the page, the Web Worker and the Node checks.
- `jielu/ai.js`, `ai-worker.js`: the computer player (alpha-beta with a fixed node budget, so it is deterministic).
- `jielu/docs/mechanics-v0.4.md`: the owner's mechanics document, as supplied.
- `jielu/analysis/`: the rules review (`index.html`) and the solver that backs it (`solver.c` plus Node checks).

Key result: the v0.4 opening (water on B2 D2 B4 D4) is a forced win for the second player
within 22 moves. The proposed v0.5 opening (water on A2 E2 A4 E4) is a theoretical draw and
plays close to 50/50 between equal players. Details and reproduction steps are in
`jielu/analysis/index.html`.

## Checks before changing the rules or the opening

1. `gcc -O3 -march=native -fopenmp -o solver jielu/analysis/solver.c`
2. `./solver check 200000` and `./solver perft 7` (must match `perft()` in `engine.js`)
3. `./solver solve table.bin && ./solver analyze table.bin` for the start value
4. `./solver dump 3000 300 > games.txt && node jielu/analysis/replay.mjs games.txt ./jielu/engine.js`

The solver covers every terrain with four water squares and the pieces anywhere; a change to
the board size, the number of water squares, the flags or the move rules needs the solver
updated first.
