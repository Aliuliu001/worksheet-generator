import assert from 'node:assert/strict';
import fs from 'node:fs';

const source = fs.readFileSync(new URL('../assets/js/app.js', import.meta.url), 'utf8');
const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');

assert.match(source, /const WORKSHEET_LEFT\s*=\s*mm\(10\)/, 'Worksheets must start 10 mm from the left');
assert.match(source, /const WORKSHEET_TOP\s*=\s*mm\(10\)/, 'Worksheets must start 10 mm from the top');
assert.match(source, /const WORKSHEET_RIGHT\s*=\s*mm\(5\)/, 'Worksheets must keep 5 mm on the right');
assert.match(source, /const WORKSHEET_BOTTOM\s*=\s*mm\(5\)/, 'Worksheets must keep 5 mm at the bottom');
assert.match(source, /const WORKSHEET_RIGHT_LIMIT\s*=\s*mm\(3\.2\)/, 'Long Matching 2 prompts may approach only 3.2 mm from the right');
assert.match(source, /function worksheetWidth\(right = WORKSHEET_RIGHT\)/, 'Worksheet width must use the asymmetric right margin');
assert.match(source, /function typing1PictureWriteLayout[\s\S]*worksheetWidth\(\)/, 'Typing 1 must use the shared asymmetric content width');
assert.match(source, /function typingVietnameseLayout[\s\S]*worksheetWidth\(\)/, 'Typing 2 must use the shared asymmetric content width');
assert.match(source, /const TYPING1_PICTURE_WRITE_PER_COL\s*=\s*14/, 'Typing 1 must use the approved 14-row layout');
assert.match(source, /const TYPING1_WRITING_LINE_DROP\s*=\s*mm\(4\)/, 'Typing 1 writing line must visibly drop 4 mm from the old baseline');
assert.match(source, /const writingLineY\s*=\s*baseline\s*\+\s*mm\(\.7\)\s*-\s*TYPING1_WRITING_LINE_DROP/, 'PDF Typing 1 line must use the shared 4 mm drop');
assert.match(source, /writingLineY[\s\S]*TYPING1_WRITING_LINE_DROP/, 'Preview Typing 1 line must use the shared layout coordinate');
assert.match(source, /const imageX = numberW \+ mm\(2\)/, 'Typing 1 image must start 2 mm after the number slot');
assert.match(source, /function drawDashedLinePdf/, 'PDF must explicitly draw dashed strokes');
assert.match(html, /Typing 1: Nhìn hình viết chữ/, 'Typing 1 label must use the approved name');
assert.match(html, /Typing 2: Nghĩa Việt viết English/, 'Typing 2 label must use the approved name');

console.log('PASS worksheet asymmetric margin and Typing 1 line contract');
