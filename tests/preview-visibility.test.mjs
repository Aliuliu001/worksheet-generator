import assert from 'node:assert/strict';
import fs from 'node:fs';

const source = fs.readFileSync(new URL('../assets/js/app.js', import.meta.url), 'utf8');

assert.match(source, /function revealPreview\(\)/, 'Preview must have one explicit reveal action after rendering.');
assert.match(source, /canvas\.scrollIntoView\(\{ behavior: 'auto', block: 'start' \}\)/, 'After Preview renders, it must immediately scroll to the first real page canvas.');
assert.match(source, /revealPreview\(\);/, 'Every successful Preview render must reveal the generated page.');

assert.match(source, /function flashPages\(items\)/, 'Flashcards must have one reusable page plan.');
assert.match(source, /async function drawFlashcardPreview\(canvas, groups\)/, 'Flashcard Preview must receive planned card positions, not a raw first slice.');
assert.match(source, /for \(const \{ item, col, row \} of groups\.flat\(\)\)/, 'Flashcard Preview must draw every repeated-set card position from the shared plan.');
assert.match(source, /const pages = flashPages\(items\)/, 'Flashcard Preview dispatch must use the PDF page plan.');
assert.match(source, /drawFlashcardPreview\(canvas, groups\)/, 'Flashcard Preview must render each planned PDF page.');

assert.match(source, /function anagramPlan\(items\)/, 'Anagram must retain one shuffled plan for Preview and PDF.');
assert.match(source, /async function makeAnagram\(entries\)/, 'Anagram PDF must receive the same prepared entries as Preview.');
assert.match(source, /makeAnagram\(anagramEntries\)/, 'Anagram export must pass the shared prepared plan to PDF generation.');
assert.match(source, /async function drawAnagramPreview\(/, 'Anagram must produce a real Preview canvas.');
assert.match(source, /drawAnagramText\(page, entry,/, 'Anagram PDF must draw the prepared entry rather than scramble again.');
assert.match(source, /function itemsKey\(items\).*item\.en/, 'Editing an English word must invalidate a cached Preview plan.');
assert.match(source, /async function drawMatchingPreview\(/, 'Matching 1 must produce a real Preview canvas.');
assert.match(source, /if \(type === 'anagram'\)/, 'Preview dispatch must render Anagram.');
assert.match(source, /if \(type === 'matching'\)/, 'Preview dispatch must render Matching 1.');

assert.match(source, /if \(renderedTypes\.size !== types\.length\)/, 'Preview may not report success unless every selected type rendered a canvas.');
assert.match(source, /if \(!\$\('canvas-pages'\)\.lastElementChild\)/, 'Preview must reject a selected type that did not create a page canvas.');

console.log('PASS Preview page plans and dispatch cover Flashcards, Anagram, Matching 1, and visibility checks');
