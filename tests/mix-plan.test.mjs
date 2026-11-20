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
  { type: 'matching', target: 6 }, { type: 'anagram', target: 8 }, { type: 'typing-2', target: 8 },
]);
assert.equal(complete.errors.length, 0, complete.errors.join('\n'));
assert.equal(complete.usedIds.length, 30, 'Mix must keep allocating until every eligible row is exhausted');
assert.equal(new Set(complete.usedIds).size, 30, 'A code must never reuse a row ID');
assert.equal(complete.pages.every((page) => page.sections.length <= 3), true, 'No Mix page may have more than three types');

const imageOnly = rows.map((row, index) => ({ ...row, vi: index === 0 ? '' : row.vi }));
const eligibility = buildMixPlan(imageOnly, [{ type: 'typing-image', target: 8 }, { type: 'typing-2', target: 8 }]);
assert.equal(eligibility.usedIds.includes('1'), true, 'English+image row remains usable by an image section');
assert.match(eligibility.warnings.join('\n'), /Typing 2/, 'Missing Vietnamese must be reported by section');

const matchingLeftover = buildMixPlan(rows.slice(0, 7), [{ type: 'matching', target: 6 }]);
assert.match(matchingLeftover.errors.join('\n'), /cannot form a valid Matching 1 group/i, 'Invalid matching leftovers must not be silently dropped');
assert.equal(matchingLeftover.usedIds.length, 6);

const duplicate = buildMixPlan([...rows.slice(0, 2), { ...rows[0], id: 99 }], [{ type: 'typing-2', target: 2 }]);
assert.match(duplicate.errors.join('\n'), /Duplicate English\/Vietnamese pair/i);

console.log('PASS Mix allocation, eligibility, grouping, and no-reuse contract');
