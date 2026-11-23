import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import fs from 'node:fs';

const require = createRequire(import.meta.url);
const { matching2PromptPosition, twoColumnPosition } = require('../assets/js/worksheet-support.js');
const source = fs.readFileSync(new URL('../assets/js/app.js', import.meta.url), 'utf8');

for (const count of [2, 5, 6, 7, 10]) {
  const positions = Array.from({ length: count }, (_, index) => matching2PromptPosition(index));
  assert.deepEqual(positions, positions.map((_, index) => ({ row: Math.floor(index / 3), column: index % 3 })), `Matching 2 ${count} prompts must read left-to-right by row.`);
}

for (const count of [1, 2, 5, 6, 7]) {
  const positions = Array.from({ length: count }, (_, index) => twoColumnPosition(index));
  assert.deepEqual(positions, positions.map((_, index) => ({ row: Math.floor(index / 2), column: index % 2 })), `Mix Typing ${count} items must be balanced in row-major order.`);
}

assert.match(source, /\$\{i\+1\}\. ______/, 'Mix Matching 3 learner labels need a writable blank.');
assert.match(source, /promptSize:\s*17/, 'Standalone Matching 2 prompt size must be 17 pt.');
assert.match(source, /promptSize:\s*14/, 'Mix Matching 2 prompt size must be 14 pt.');
assert.match(source, /MIX_TYPING_FONT_SIZE\s*=\s*12/, 'Mix Typing content must use 12 pt.');
assert.match(source, /makeMatching3[\s\S]*?size:\s*17/, 'Matching 3 learner number and blank must be increased to 17 pt.');
assert.match(source, /makeTypingImage[\s\S]*?size:17/, 'Standalone Typing 1 PDF number must be increased to 17 pt.');
console.log('PASS row-major Matching 2 and balanced Mix Typing layout rules');
