# Scoping review page: data and build

`review.html` (one level up) shows the state of the scoping review
*Graphicacy in the Generative AI Era: A PRISMA-ScR Scoping Review of an Emerging
Three-Way Intersection in Education* (Jia & Xu; protocol registered on OSF,
https://osf.io/s8ebf/). Every number on the page comes from the files in `data/`,
and `build.py` refuses to rebuild the page while any number disagrees with another.

## Files

| File | What it holds | Source of truth |
|---|---|---|
| `data/review.json` | Title, authors, OSF link, key dates | Protocol |
| `data/sources.csv` | One row per database or side route: platform, fields, run date, count, the recorded search string, and whether that string is word for word | `Search_Syntax` sheet (Appendix A) |
| `data/flow.csv` | Counts for each box of the PRISMA-ScR flow diagram, each marked `recorded`, `derived`, `provisional` or `pending` | Search log and screening notes |
| `data/studies.csv` | Descriptive fields for the included and construct-only studies | Generated from the `Charting_Codebook` sheet; do not edit by hand |
| `data/codebook.csv` | Allowed values for every coded field | Charting Codebook (Appendix C) |
| `data/deviations.csv` | Changes from the registered plan, each classed `minor` or `substantive` | Appendix F |

## Updating

1. **Charting.** In the `Charting_Codebook` Google Sheet, open the *1_Charting_Matrix*
   tab and choose File > Download > Comma-separated values. Then run:

   ```
   python3 review/build.py --import-charting ~/Downloads/Charting_Codebook\ -\ 1_Charting_Matrix.csv
   ```

   Rows are mapped by their Audit status: `Pending`, `Verified` and
   `Discrepancy resolved` become included studies, `Downgraded (§3.7)` becomes
   construct-only, and `Excluded (full-text)` rows are left out. A row whose status
   is not a codebook value is skipped with a note until it is resolved.
2. **Screening and full text.** When a stage finishes, put its number in
   `data/flow.csv` and change its status from `pending` to `recorded`. Keep
   `included` in step with the study list; the build checks this.
3. **Changes from the plan.** Add a row to `data/deviations.csv`. A `substantive`
   row must name its OSF registration update in `recorded_in`, or the build fails.
4. **Rebuild.** `python3 review/build.py` prints every check, then rewrites the data
   block inside `review.html`. `--check` runs the checks without touching the page.

## What is deliberately not published here

The importer never reads the charting columns that hold the review's own analysis:
outcome measures, key findings, author-acknowledged limitations, and audit notes.
Those belong to the write-up. Full-text exclusions are published as counts in the
flow diagram only, with reasons, once the stage is complete.

Standard library only; Python 3.8 or later.
