/* Shared pure helpers for paste confirmation and Typing 2/3 A4 layout. */
(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined') module.exports = api;
  if (typeof window !== 'undefined') window.WorksheetSupport = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, () => {
  const clean = (value) => String(value ?? '').trim().replace(/\s+/g, ' ');
  const hasVietnamese = (value) => /[à-ỹđ]/i.test(clean(value).normalize('NFC'));
  const englishLike = (value) => /^[a-z][a-z .,'’!?-]*$/i.test(clean(value));
  function detectPasteDirection(first, second) {
    if (hasVietnamese(first) && !hasVietnamese(second)) return 'vi-to-en';
    if (!hasVietnamese(first) && hasVietnamese(second)) return 'en-to-vi';
    if (englishLike(first) && !englishLike(second)) return 'en-to-vi';
    if (!englishLike(first) && englishLike(second)) return 'vi-to-en';
    return 'uncertain';
  }
  function headerDirection(first, second) {
    const left = clean(first).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
    const right = clean(second).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
    if (['english', 'en', 'tienganh'].includes(left) && ['viet', 'vi', 'tiengviet'].includes(right)) return 'en-to-vi';
    if (['viet', 'vi', 'tiengviet'].includes(left) && ['english', 'en', 'tienganh'].includes(right)) return 'vi-to-en';
    return '';
  }
  function parsePastedPairs(text) {
    const pairs = String(text ?? '').split(/\r?\n/).map((line) => line.trim()).filter(Boolean).map((line) => line.split('\t').map(clean));
    if (!pairs.length || pairs.some((cells) => cells.length < 2)) throw new Error('Mỗi dòng dán cần đúng hai cột, ngăn bằng Tab.');
    let direction = headerDirection(pairs[0][0], pairs[0][1]);
    const data = direction ? pairs.slice(1) : pairs;
    if (!data.length) throw new Error('Chưa có dòng từ vựng sau hàng tiêu đề.');
    if (!direction) {
      const directions = data.map(([first, second]) => detectPasteDirection(first, second));
      direction = directions.find((item) => item !== 'uncertain') || 'uncertain';
    }
    return { direction, pairs: data.map(([first, second], index) => ({ first, second, sourceRow: index + 1 })), rows: data.map(([first, second], index) => direction === 'vi-to-en' ? { en: second, vi: first, sourceRow: index + 1 } : { en: first, vi: second, sourceRow: index + 1 }) };
  }
  function orientPastedPairs(parsed, direction) {
    if (!['en-to-vi', 'vi-to-en'].includes(direction)) throw new Error('Hãy chọn chiều cột trước khi thêm từ.');
    return parsed.pairs.map(({ first, second, sourceRow }) => direction === 'vi-to-en' ? { en: second, vi: first, sourceRow } : { en: first, vi: second, sourceRow });
  }
  function vocabularyLayout() {
    return { page: { widthMm: 297, heightMm: 210, orientation: 'landscape' }, marginMm: 5, header: 'Full name: ____________________', rows: 40, maxRows: 40, defaultRows: 30, headerHeightMm: 13, numberWidthMm: 12, minimumPromptWidthMm: 60, minimumAnswerWidthMm: 90, headerAlign: 'center', bodyAlign: 'left', flexibleColumns: true };
  }
  return { clean, detectPasteDirection, parsePastedPairs, orientPastedPairs, vocabularyLayout };
});
