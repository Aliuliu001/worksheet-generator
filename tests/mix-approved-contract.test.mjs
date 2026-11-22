import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { buildMixPlan } = require('../assets/js/mix-plan.js');

const rows = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1, en: `word ${index + 1}`, vi: `nghĩa ${index + 1}`,
  imageId: String(index + 1), hasImage: true, sourceRow: index + 2,
}));

const plan = buildMixPlan(rows, [
  { type: 'typing-2', target: 8 },
  { type: 'matching-3', target: 10 },
]);
assert.deepEqual(plan.errors, []);
assert.equal(plan.sections[0].type, 'matching-3', 'Matching 3 must be allocated and printed first.');
assert.equal(plan.sections[0].items.length, 10, 'Matching 3 keeps exactly one requested 2–12-item set.');
assert.equal(plan.sections[1].items.length, 8, 'A Mix request is a total, never a repeated batch.');
assert.equal(plan.usedIds.length, 18);
assert.equal(new Set(plan.usedIds).size, 18, 'No row can be reused in one Mix code.');
assert.equal(plan.remainingCount, 2);

const textOnly = rows.map((row, index) => ({ ...row, hasImage: index !== 0 }));
const typed = buildMixPlan(textOnly, [{ type: 'typing-3', target: 8 }]);
assert.deepEqual(typed.errors, [], 'Missing images must not block text-only Typing 3.');
assert.equal(typed.sections[0].items.length, 8);

const missingImage = buildMixPlan(textOnly, [{ type: 'matching-3', target: 20 }]);
assert.match(missingImage.errors.join('\n'), /Matching 3 needs 20 eligible words but only 19 are available/i);

const invalidMatching3 = buildMixPlan(rows, [{ type: 'matching-3', target: 13 }]);
assert.match(invalidMatching3.errors.join('\n'), /between 2 and 12/i);

console.log('PASS approved Mix totals, Matching 3 priority, and asset eligibility');
