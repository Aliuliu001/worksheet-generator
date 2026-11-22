import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { buildMixPlan, autoFillMixSection } = require('../assets/js/mix-plan.js');

const rows = Array.from({ length: 15 }, (_, index) => ({
  id: String(index + 1), en: `word ${index + 1}`, vi: `nghĩa ${index + 1}`,
  imageId: String(index + 1), hasImage: true,
}));

const anagramAndTyping3 = buildMixPlan(rows, [
  { type: 'anagram', target: 3 }, { type: 'typing-3', target: 3 },
]);
assert.deepEqual(anagramAndTyping3.errors, []);
const filledTyping3 = autoFillMixSection(anagramAndTyping3, 'typing-3', 4);
assert.equal(filledTyping3.added.length, 4, 'Selected Typing 3 can receive unused eligible rows.');
assert.equal(filledTyping3.section.items.length, 7);
assert.equal(new Set(filledTyping3.plan.usedIds).size, 10, 'Auto-fill cannot reuse a word already allocated in Mix.');
assert.equal(filledTyping3.plan.sections.some((section) => section.type === 'typing-2'), false, 'A Mix without Typing 2 must never create Typing 2.');
assert.equal(filledTyping3.plan.autoAddedByType['typing-3'], 4);

const matching3AndTyping2 = buildMixPlan(rows, [
  { type: 'matching-3', target: 7 }, { type: 'typing-2', target: 2 },
]);
const filledTyping2 = autoFillMixSection(matching3AndTyping2, 'typing-2', 20);
assert.equal(filledTyping2.added.length, 6, 'Only remaining eligible words can be added.');
assert.equal(filledTyping2.plan.sections[0].items.length, 7, 'Matching 3 stays exactly the requested fixed set.');
assert.equal(filledTyping2.plan.autoAddedByType['matching-3'] || 0, 0, 'Matching 3 cannot auto-grow.');

const matching2Only = buildMixPlan(rows, [{ type: 'matching-2', target: 5 }]);
const filledMatching2 = autoFillMixSection(matching2Only, 'matching-2', 9);
assert.equal(filledMatching2.added.length, 5, 'Matching 2 may only add a complete extra group of five.');
assert.equal(filledMatching2.section.items.length, 10, 'Matching 2 remains a valid 10-item group after auto-fill.');

console.log('PASS Mix auto-fill uses only selected flexible types and never reuses words');
