import assert from 'node:assert/strict';
import fs from 'node:fs';

const source = fs.readFileSync(new URL('../assets/js/app.js', import.meta.url), 'utf8');
const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');

assert.match(source, /WORKSHEET_MARGIN\s*=\s*mm\(10\)/, 'Worksheet content must begin 10 mm from the left edge');
assert.match(source, /WORKSHEET_TOP\s*=\s*mm\(10\)/, 'Worksheet content must begin 10 mm from the top edge');
assert.match(source, /const TYPING_IMAGE_PER_COL\s*=\s*14/, 'Typing 1 must use the approved denser 14-row trial');
assert.match(source, /const imageX = numberW \+ mm\(2\)/, 'Typing 1 image must start 2 mm after the number slot');
assert.match(source, /function drawDashedLinePdf/, 'PDF must explicitly draw dashed strokes, not rely on SVG dash support');
assert.match(source, /drawMatching2ColumnDividers\(page, group\)/, 'Matching 2 PDF needs two dashed prompt-column dividers');
assert.match(source, /drawMatching2ColumnDividers\(ctx, group, scale\)/, 'Matching 2 preview needs the same prompt-column dividers');
assert.match(html, /Typing 1: Nhìn hình viết từ/, 'Typing 1 label must use the approved name');
assert.match(html, /Typing 2: Nghĩa Việt viết English/, 'Typing 2 label must use the approved name');

console.log('PASS worksheet spacing and dash contract');
