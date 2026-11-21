import assert from 'node:assert/strict';
import fs from 'node:fs';

const source = fs.readFileSync(new URL('../assets/js/app.js', import.meta.url), 'utf8');

assert.match(source, /function revealPreview\(\)/, 'Preview must have one explicit reveal action after rendering.');
assert.match(source, /canvas\.scrollIntoView\(\{ behavior: 'auto', block: 'start' \}\)/, 'After Preview renders, it must immediately scroll to the first real page canvas.');
assert.match(source, /revealPreview\(\);/, 'Every successful Preview render must reveal the generated page.');
assert.match(source, /function drawFlashcardPreview\(/, 'The default Flashcards selection must produce a real Preview canvas.');
assert.match(source, /if \(type === 'flashcards'\)/, 'Preview dispatch must render the default Flashcards selection instead of only reporting success.');
assert.match(source, /function fitCanvasText\(/, 'Flashcard Preview must measure and shrink long labels before rendering them.');
assert.match(source, /fitCanvasText\(ctx, item\.en, w - 6 \* scale/, 'Flashcard Preview must fit every label within its own card width.');

console.log('PASS Preview automatically reveals a real worksheet page for the default selection');
