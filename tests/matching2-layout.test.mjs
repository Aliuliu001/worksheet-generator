import assert from 'node:assert/strict';
import fs from 'node:fs';

const source = fs.readFileSync(new URL('../assets/js/app.js', import.meta.url), 'utf8');

assert.match(source, /const MATCHING2_LAYOUT\s*=/, 'Matching 2 needs one shared layout contract');
assert.match(source, /cardGap:\s*mm\(2\)/, 'Matching 2 cards must be spaced 2 mm apart');
assert.match(source, /letterSize:\s*16/, 'Picture letters must be 16 pt');
assert.match(source, /letterBold:\s*true/, 'Picture letters must be bold');
assert.match(source, /drawDashedRoundedCard/, 'Preview and PDF need the same dashed rounded card helper');
assert.match(source, /fitPromptText/, 'Long prompts need one shared shrink-to-fit helper');
assert.match(source, /fitPromptText\(.*column\.width/s, 'PDF prompt renderer must constrain text to its column');
assert.match(source, /fitPromptText\(.*column\.width/s, 'Preview prompt renderer must constrain text to its column');
assert.match(source, /function matching2ActiveDividers\(group\)/, 'Matching 2 must decide dividers from active prompt columns');
assert.match(source, /matching2ActiveDividers\(group\)/, 'Both renderers must use the same active-divider decision');
assert.doesNotMatch(source, /if \(type === 'matching' \|\| type === 'matching-2'\)/, 'Matching 2 must not remain in the obsolete generic preview branch');
assert.match(source, /if \(type === 'matching-2'\) \{[\s\S]*drawMatching2Preview/, 'Matching 2 preview must use only the shared renderer');

const start = source.indexOf('function matching2ActiveDividers(group)');
const end = source.indexOf('\n  function drawMatching2ColumnDividers', start);
assert.ok(start >= 0 && end > start, 'Could not locate the active-divider helper');
const helperSource = source.slice(start, end).replace('function matching2ActiveDividers', 'return function matching2ActiveDividers');
const matching2ActiveDividers = new Function(helperSource)();
for (const count of [1, 2, 4]) assert.deepEqual(matching2ActiveDividers({ prompts: Array(count) }), [], `${count} prompts: no vertical divider`);
for (const count of [5, 7]) assert.deepEqual(matching2ActiveDividers({ prompts: Array(count) }), [0], `${count} prompts: only first divider`);
for (const count of [8, 10]) assert.deepEqual(matching2ActiveDividers({ prompts: Array(count) }), [0, 1], `${count} prompts: both dividers`);

console.log('PASS Matching 2 shared layout and active-divider contract');
