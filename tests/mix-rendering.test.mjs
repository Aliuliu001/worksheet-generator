import assert from 'node:assert/strict';
import fs from 'node:fs';
const source = fs.readFileSync(new URL('../assets/js/app.js', import.meta.url), 'utf8');
assert.match(source, /function mixAnagramPrompt/, 'Mix Anagram must scramble its prompt.');
assert.match(source, /function mixMatchingTerms/, 'Mix Matching must create a separate matching term list.');
assert.match(source, /function drawMixWritingLine/, 'Mix Typing must provide a writing line.');
assert.match(source, /Mix_Ma\$\{v\}_De\.pdf/, 'Mix proposal must use an explicit proposal filename.');
assert.match(source, /Mix_Ma\$\{v\}_Dap_an\.pdf/, 'Mix answer must use an explicit answer filename.');
console.log('PASS Mix exercise/answer rendering contract');
