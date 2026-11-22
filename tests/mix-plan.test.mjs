import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { buildMixPlan, normalizePair } = require('../assets/js/mix-plan.js');

const rows = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1, en: `word ${index + 1}`, vi: `nghĩa ${index + 1}`,
  imageId: String(index + 1), hasImage: true, sourceRow: index + 2,
}));

assert.equal(normalizePair('  ICE   Cream ', ' Kem '), 'ice cream\u0000kem');

const complete = buildMixPlan(rows, [
  { type: 'matching-3', target: 6 }, { type: 'anagram', target: 8 }, { type: 'typing-2', target: 8 },
]);
assert.equal(complete.errors.length, 0, complete.errors.join('\n'));
assert.equal(complete.usedIds.length, 22, 'Each Mix count is its requested total, not a repeated batch.');
assert.equal(new Set(complete.usedIds).size, 22, 'A code must never reuse a row ID');
assert.equal(complete.sections[0].type, 'matching-3', 'Matching 3 must print first.');
assert.equal(complete.remainingCount, 8);

const imageOnly = rows.map((row, index) => ({ ...row, vi: index === 0 ? '' : row.vi }));
const eligibility = buildMixPlan(imageOnly, [{ type: 'typing-image', target: 23 }, { type: 'typing-2', target: 8 }]);
assert.equal(eligibility.usedIds.includes('1'), true, 'English+image row remains usable by an image section');
assert.match(eligibility.errors.join('\n'), /Typing 2 needs 8 eligible words but only 7/i, 'Short selected type must block rather than silently reduce.');

const matchingOne = buildMixPlan(rows, [{ type: 'matching', target: 6 }]);
assert.match(matchingOne.errors.join('\n'), /not available in Mix/i, 'Matching 1 must remain hidden from Mix.');

const duplicate = buildMixPlan([...rows.slice(0, 2), { ...rows[0], id: 99 }], [{ type: 'typing-2', target: 2 }]);
assert.match(duplicate.errors.join('\n'), /Duplicate English\/Vietnamese pair/i);

console.log('PASS Mix allocation, eligibility, approved Matching 3, and no-reuse contract');
