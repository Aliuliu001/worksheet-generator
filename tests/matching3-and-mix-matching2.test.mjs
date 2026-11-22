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
assert.match(source, /original\.type==='matching-3'\|\|original\.type==='matching-2'/, 'Both Matching blocks must stay intact when packing Mix pages.');
console.log('PASS Matching 3 standalone and real Matching 2 Mix rendering contract');
