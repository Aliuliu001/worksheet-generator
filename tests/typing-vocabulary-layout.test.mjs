import assert from 'node:assert/strict';
import fs from 'node:fs';

const source = fs.readFileSync(new URL('../assets/js/app.js', import.meta.url), 'utf8');
const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');

assert.match(source, /const VOCABULARY_CHECK_PAGE\s*=\s*\[mm\(297\),\s*mm\(210\)\]/, 'Typing 2/3 must use A4 landscape');
assert.match(source, /const VOCABULARY_CHECK_ROWS_PER_PAGE\s*=\s*60/, 'Each repeated A4 panel must hold 60 rows');
assert.match(source, /function vocabularyCheckLayout\(index\)/, 'Typing 2/3 must share one A4 layout');
assert.match(source, /async function vocabularyCheckFontFor\(doc\)/, 'Typing 2/3 need a Unicode Vietnamese PDF font');
assert.match(source, /assets\/fonts\/DejaVuSans\.ttf/, 'Typing 2/3 must load the bundled Unicode Vietnamese font');
assert.match(source, /function makeVocabularyCheck\(items, mode\)/, 'Typing 2/3 must share one PDF renderer');
assert.match(source, /function drawVocabularyCheckPreview\(canvas, items, mode\)/, 'Typing 2/3 must share one Preview renderer');
assert.match(source, /mode === 'vi-to-en' \? item\.vi : item\.en/, 'Typing 2 must show Vietnamese and Typing 3 English');
assert.match(html, /Typing 2: Cho tiếng Việt, viết tiếng Anh/, 'Typing 2 must be named clearly');
assert.match(html, /Typing 3: Cho tiếng Anh, viết tiếng Việt/, 'Typing 3 must be named clearly');

console.log('PASS A4 vocabulary typing layout contract');
