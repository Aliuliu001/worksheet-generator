import assert from 'node:assert/strict';
import fs from 'node:fs';
const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const source = fs.readFileSync(new URL('../assets/js/app.js', import.meta.url), 'utf8');

assert.match(html, /id="matching-3-count"[^>]*min="2"[^>]*max="12"/, 'Standalone Matching 3 must offer a 2–12 count.');
assert.match(source, /async function makeMatching3\(/, 'Matching 3 needs its own flexible-set PDF renderer.');
assert.match(source, /async function drawMatching3Preview\(/, 'Matching 3 needs a matching Preview renderer.');
assert.match(source, /if \(type === 'matching-3'\)/, 'Preview/export must dispatch Matching 3.');
assert.match(source, /async function makeMixMatching2Block\(/, 'Mix Matching 2 must render its real picture grid and prompts.');
assert.match(source, /async function drawMixMatching2Preview\(/, 'Mix Matching 2 Preview must use the real block renderer.');
assert.match(source, /const indivisible=original\.type==='matching-3'/, 'Only Matching 3 must stay intact when packing Mix pages.');
assert.match(source, /original\.type==='matching-2'\?Math\.min\(10,original\.items\.length-offset\)/, 'Matching 2 must be allowed to continue as self-contained groups of up to 10.');
assert.doesNotMatch(source, /async function makeMatching3\([^)]*\) \{ return makeMatching/, 'Matching 3 must not delegate to Matching 1 grouping.');
assert.doesNotMatch(source, /drawMatching3Preview\([^)]*\) \{ return drawMatchingPreview/, 'Matching 3 Preview must not delegate to Matching 1 grouping.');
assert.doesNotMatch(source, /AUTO_FILL_TYPES\.has\(section\.type\) && section\.type !== 'matching-2'/, 'Selected Matching 2 must be eligible for Mix auto-fill.');
assert.match(source, /shuffled\(items\.slice\(\)\)/, 'Matching 3 choices must be shuffled once and stored in the plan.');
console.log('PASS Matching 3 standalone and real Matching 2 Mix rendering contract');
