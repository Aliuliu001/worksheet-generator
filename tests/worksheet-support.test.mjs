import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { detectPasteDirection, parsePastedPairs, vocabularyLayout } = require('../assets/js/worksheet-support.js');

const enVi = parsePastedPairs('English\tViet\napple\tquả táo\nice cream\tkem');
assert.equal(enVi.direction, 'en-to-vi');
assert.deepEqual(enVi.rows.map(({ en, vi }) => [en, vi]), [['apple', 'quả táo'], ['ice cream', 'kem']]);

const viEn = parsePastedPairs('Tiếng Việt\tEnglish\nquả táo\tapple\nkem\tice cream');
assert.equal(viEn.direction, 'vi-to-en');
assert.deepEqual(viEn.rows.map(({ en, vi }) => [en, vi]), [['apple', 'quả táo'], ['ice cream', 'kem']]);
assert.equal(detectPasteDirection('cat', 'con mèo'), 'en-to-vi');
assert.equal(detectPasteDirection('con mèo', 'cat'), 'vi-to-en');
const uncertain = parsePastedPairs('red\txanh\nblue\tgreen');
assert.equal(uncertain.direction, 'uncertain', 'Ambiguous unheaded data must require an explicit direction.');

const layout = vocabularyLayout();
assert.deepEqual(layout.page, { widthMm: 297, heightMm: 210, orientation: 'landscape' });
assert.equal(layout.marginMm, 5);
assert.match(layout.header, /^Full name: _+$/, 'Only the full-name line belongs above the table.');
assert.ok(layout.rows <= 14, 'Landscape rows must be genuinely tall.');
assert.equal(layout.headerAlign, 'center');
assert.equal(layout.bodyAlign, 'left');
assert.equal(layout.flexibleColumns, true);
console.log('PASS worksheet support parsing, explicit uncertainty, and Typing 2/3 landscape layout');
