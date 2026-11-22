/* Pure Mix allocation. Rendering decides physical A4 page placement. */
(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined') module.exports = api;
  if (typeof window !== 'undefined') window.MixPlan = api;
  if (typeof exports === 'undefined') globalThis.MixPlan = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, () => {
  const IMAGE_TYPES = new Set(['anagram', 'matching', 'matching-2', 'matching-3', 'typing-image']);
  const TEXT_TYPES = new Set(['typing-2', 'typing-3']);
  const LABELS = {
    anagram: 'Anagram', matching: 'Matching 1', 'matching-2': 'Matching 2',
    'matching-3': 'Matching 3', 'typing-image': 'Typing 1',
    'typing-2': 'Typing 2', 'typing-3': 'Typing 3',
  };
  const MIX_TYPES = new Set(['anagram', 'matching-2', 'matching-3', 'typing-image', 'typing-2', 'typing-3']);
  const AUTO_FILL_TYPES = new Set(['anagram', 'matching-2', 'typing-image', 'typing-2', 'typing-3']);
  function clean(value) { return String(value ?? '').trim().replace(/\s+/g, ' '); }
  function normalizePair(en, vi) { return `${clean(en).toLocaleLowerCase()}\u0000${clean(vi).toLocaleLowerCase()}`; }
  function eligible(row, type) {
    if (!clean(row.en)) return false;
    if (IMAGE_TYPES.has(type)) return !!clean(row.imageId) && !!row.hasImage;
    return TEXT_TYPES.has(type) ? !!clean(row.vi) : false;
  }
  function validGroupSize(type, count) {
    if (type === 'matching') return count >= 6 && count % 6 === 0;
    if (type === 'matching-2') return count >= 5 && count % 5 === 0;
    if (type === 'matching-3') return count >= 2 && count <= 12;
    return count > 0;
  }
  function summarize(plan) {
    plan.usedIds = plan.sections.flatMap((section) => section.items.map((row) => row.id));
    const used = new Set(plan.usedIds);
    plan.unused = plan.rows.filter((row) => !used.has(row.id));
    plan.remainingCount = plan.unused.length;
    plan.autoAddedByType = plan.autoAddedByType || {};
    return plan;
  }
  function buildMixPlan(inputRows, settings) {
    const rows = inputRows.map((row, index) => ({ ...row, id: String(row.id ?? index + 1), hasImage: row.hasImage ?? false }));
    const errors = []; const warnings = []; const seenPairs = new Map();
    for (const row of rows) {
      const pair = normalizePair(row.en, row.vi);
      if (clean(row.en) && clean(row.vi)) {
        if (seenPairs.has(pair)) errors.push(`Duplicate English/Vietnamese pair: ${row.en} / ${row.vi} (IDs ${seenPairs.get(pair)} and ${row.id}).`);
        else seenPairs.set(pair, row.id);
      }
    }
    const requested = settings.filter((section) => Number(section.target) > 0).map((section, order) => ({ ...section, target: Number(section.target), order }));
    for (const section of requested) {
      if (!MIX_TYPES.has(section.type)) errors.push(`${LABELS[section.type] || section.type} is not available in Mix. Matching 1 remains a separate six-item worksheet.`);
      else if (!validGroupSize(section.type, section.target)) errors.push(section.type === 'matching-3' ? 'Matching 3 must contain one set between 2 and 12 questions.' : `${LABELS[section.type]} has an invalid requested total (${section.target}).`);
    }
    const ordered = [...requested].sort((a, b) => (a.type === 'matching-3' ? -1 : b.type === 'matching-3' ? 1 : a.order - b.order));
    const unused = rows.slice(); const sections = [];
    for (const request of ordered) {
      const candidates = unused.filter((row) => eligible(row, request.type));
      if (candidates.length < request.target) { errors.push(`${LABELS[request.type]} needs ${request.target} eligible words but only ${candidates.length} are available.`); continue; }
      const picked = candidates.slice(0, request.target); const pickedIds = new Set(picked.map((row) => row.id));
      for (let index = unused.length - 1; index >= 0; index -= 1) if (pickedIds.has(unused[index].id)) unused.splice(index, 1);
      sections.push({ type: request.type, label: LABELS[request.type], target: request.target, requested: request.target, autoAdded: 0, items: picked, order: sections.length });
      const excluded = rows.filter((row) => !eligible(row, request.type)).length;
      if (excluded) warnings.push(`${LABELS[request.type]}: ${excluded} row(s) are not eligible for this section.`);
    }
    return summarize({ rows, sections, pages: [], warnings, errors, totalUnique: rows.length, autoAddedByType: {} });
  }
  function autoFillMixSection(plan, type, requestedCount) {
    if (!AUTO_FILL_TYPES.has(type) || requestedCount <= 0) return { plan, added: [], section: null };
    const section = plan.sections.find((item) => item.type === type);
    if (!section) return { plan, added: [], section: null };
    const used = new Set(plan.usedIds);
    const candidates = plan.rows.filter((row) => !used.has(row.id) && eligible(row, type));
    let count = Math.min(Number(requestedCount) || 0, candidates.length);
    if (type === 'matching-2') count -= count % 5;
    const added = candidates.slice(0, count);
    section.items.push(...added); section.autoAdded = (section.autoAdded || 0) + added.length;
    plan.autoAddedByType[type] = (plan.autoAddedByType[type] || 0) + added.length;
    return { plan: summarize(plan), added, section };
  }
  return { normalizePair, eligible, validGroupSize, buildMixPlan, autoFillMixSection, IMAGE_TYPES, TEXT_TYPES, LABELS, MIX_TYPES, AUTO_FILL_TYPES };
});
