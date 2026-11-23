# Layout regression rules

- Matching 3 learner rows always show `N. ______` in standalone and Mix previews/PDFs; preserve the frozen image-to-letter mapping and connection dots.
- Matching 3 standalone uses the fixed 12-row-compatible `MATCHING3_ROW_HEIGHT`, not remaining height divided by entered count. Thus a 6–7 question set ends early instead of stretching to the page bottom.
- Matching 3 two-up is explicit and off by default: it prints two independent copies of the same 2–12-item set in side-by-side A5 panels on one A4 landscape sheet. Freeze each panel's shuffled letter mapping in the worksheet plan; Preview, learner PDF and answer PDF must use those exact mappings. Do not split ten questions into two five-question halves or squeeze 20 rows into A5.
- Mix Matching 3 derives picture box, number/blank baseline, term baseline and dots from one shared row helper. Do not calculate the picture from a different `y` reference, or it visibly falls toward the next row.
- Matching 2 prompt placement is row-major in standalone and Mix: `1 | 2 | 3`, then `4 | 5 | 6`. Keep the shuffled picture/letter map frozen while moving prompts.
- Matching 2 prompt rows use `ceil(count / 3)`. Draw vertical dividers only between populated prompt columns.
- Mix Typing 1/2/3 uses balanced two-column row-major cells. Continue section numbering across page blocks, and derive packing from `ceil(count / 2)` rows.
- Keep standalone Typing layouts separate from Mix two-column geometry.
