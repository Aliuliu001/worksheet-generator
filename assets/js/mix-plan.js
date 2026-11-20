/* Pure Mix allocation and A4 page plan. */
(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined') module.exports = api;
  if (typeof window !== 'undefined') window.MixPlan = api;
  if (typeof exports === 'undefined') globalThis.MixPlan = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, () => {
  const IMAGE_TYPES = new Set(['anagram', 'matching', 'matching-2', 'typing-image']);
  const TEXT_TYPES = new Set(['typing-2', 'typing-3']);
  const LABELS = { anagram: 'Anagram', matching: 'Matching 1', 'matching-2': 'Matching 2', 'typing-image': 'Typing 1', 'typing-2': 'Typing 2', 'typing-3': 'Typing 3' };
  function clean(value) { return String(value ?? '').trim().replace(/\s+/g, ' '); }
  function normalizePair(en, vi) { return `${clean(en).toLocaleLowerCase()}\u0000${clean(vi).toLocaleLowerCase()}`; }
  function eligible(row, type) {
    if (!clean(row.en)) return false;
    if (IMAGE_TYPES.has(type)) return !!clean(row.imageId) && !!row.hasImage;
    return TEXT_TYPES.has(type) ? !!clean(row.vi) : false;
  }
  function validGroupSize(type, count) {
    if (type === 'matching') return count >= 6 && count % 6 === 0;
    if (type === 'matching-2') return count >= 5 && (count % 5 === 0 || count % 10 === 0);
    return count > 0;
  }
  function minimumGroup(type) { return type === 'matching' ? 6 : type === 'matching-2' ? 5 : 1; }
  function buildMixPlan(inputRows, settings) {
    const rows = inputRows.map((row, index) => ({ ...row, id: String(row.id ?? index + 1), hasImage: row.hasImage ?? false }));
    const sections = settings.filter((section) => LABELS[section.type] && Number(section.target) > 0).map((section, order) => ({ ...section, target: Number(section.target), order, items: [] }));
    const errors = []; const warnings = []; const seenPairs = new Map();
    for (const row of rows) {
      const pair = normalizePair(row.en, row.vi);
      if (clean(row.en) && clean(row.vi)) {
        if (seenPairs.has(pair)) errors.push(`Duplicate English/Vietnamese pair: ${row.en} / ${row.vi} (IDs ${seenPairs.get(pair)} and ${row.id}).`);
        else seenPairs.set(pair, row.id);
      }
    }
    const unused = rows.slice(); const take = (section, count) => {
      const chosen = [];
      for (let index = 0; index < unused.length && chosen.length < count;) {
        if (eligible(unused[index], section.type)) chosen.push(...unused.splice(index, 1)); else index += 1;
      }
      return chosen;
    };
    // Repeated rounds use every eligible row; no row returns to the pool.
    while (unused.some((row) => sections.some((section) => eligible(row, section.type)))) {
      let progressed = false;
      // Allocate Vietnamese-dependent sections first so image-capable rows
      // do not consume their only candidates.
      const allocationOrder = [...sections].sort((a, b) => (TEXT_TYPES.has(b.type) ? 1 : 0) - (TEXT_TYPES.has(a.type) ? 1 : 0));
      for (const section of allocationOrder) {
        const candidates = unused.filter((row) => eligible(row, section.type));
        if (!candidates.length) continue;
        let count = Math.min(section.target, candidates.length);
        if (IMAGE_TYPES.has(section.type) && TEXT_TYPES.has(sections.find((s) => s.type)?.type)) { /* no-op: explicit eligibility drives allocation */ }
        if ((section.type === 'matching' || section.type === 'matching-2') && count < minimumGroup(section.type)) continue;
        if (section.type === 'matching') count -= count % 6;
        if (section.type === 'matching-2' && count > 5 && count < 10) count = 5;
        const allocated = take(section, count);
        if (allocated.length) { section.items.push(...allocated); progressed = true; }
      }
      if (!progressed) break;
    }
    for (const section of sections) {
      const remainingEligible = unused.filter((row) => eligible(row, section.type));
      if (remainingEligible.length && (section.type === 'matching' || section.type === 'matching-2')) errors.push(`${LABELS[section.type]} has ${remainingEligible.length} eligible row(s) left that cannot form a valid ${LABELS[section.type]} group.`);
      const excluded = rows.filter((row) => !eligible(row, section.type));
      if (excluded.length) warnings.push(`${LABELS[section.type]}: ${excluded.length} row(s) are not eligible for this section.`);
    }
    const usedIds = sections.flatMap((section) => section.items.map((row) => row.id));
    const pages = []; let page = { sections: [] };
    for (const section of sections) {
      for (let start = 0; start < section.items.length; start += section.target) {
        if (page.sections.length === 3) { pages.push(page); page = { sections: [] }; }
        page.sections.push({ type: section.type, label: LABELS[section.type], items: section.items.slice(start, start + section.target) });
      }
    }
    if (page.sections.length) pages.push(page);
    return { sections, pages, usedIds, unused, warnings, errors, totalUnique: rows.length };
  }
  return { normalizePair, eligible, validGroupSize, buildMixPlan, IMAGE_TYPES, TEXT_TYPES, LABELS };
});
