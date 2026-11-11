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

console.log('PASS Matching 2 shared layout contract');
