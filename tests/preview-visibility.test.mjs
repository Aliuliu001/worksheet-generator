import assert from 'node:assert/strict';
import fs from 'node:fs';

const source = fs.readFileSync(new URL('../assets/js/app.js', import.meta.url), 'utf8');

assert.match(source, /function revealPreview\(\)/, 'Preview must have one explicit reveal action after rendering.');
assert.match(source, /canvas\.scrollIntoView\(\{ behavior: 'auto', block: 'start' \}\)/, 'After Preview renders, it must immediately scroll to the first real page canvas.');
assert.match(source, /revealPreview\(\);/, 'Every successful Preview render must reveal the generated page.');

console.log('PASS Preview automatically reveals the generated worksheet page');
