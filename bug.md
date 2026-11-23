# Layout regression rules

- Matching 3 learner rows always show `N. ______` in standalone and Mix previews/PDFs; preserve the frozen image-to-letter mapping and connection dots.
- Matching 2 prompt placement is row-major in standalone and Mix: `1 | 2 | 3`, then `4 | 5 | 6`. Keep the shuffled picture/letter map frozen while moving prompts.
- Matching 2 prompt rows use `ceil(count / 3)`. Draw vertical dividers only between populated prompt columns.
- Mix Typing 1/2/3 uses balanced two-column row-major cells. Continue section numbering across page blocks, and derive packing from `ceil(count / 2)` rows.
- Keep standalone Typing layouts separate from Mix two-column geometry.
