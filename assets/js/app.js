/* global XLSX, JSZip, PDFLib, fontkit */
(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const state = { rows: [], images: new Map(), checked: false, urls: [] };
  const excelInput = $('excel-file');
  const zipInput = $('zip-file');
  const fileStatus = $('file-status');
  const notice = $('notice');
  const previewWrap = $('preview-wrap');
  const previewBody = $('preview-body');
  const exportButton = $('export-button');
  const progress = $('progress');
  const previewCard = $('pdf-preview-card');
  const previewStatus = $('pdf-preview-status');
  const canvasPages = $('canvas-pages');

  function setNotice(message, type = 'muted') { notice.className = `notice ${type}`; notice.textContent = message; }
  function setProgress(message = '') { progress.textContent = message; }
  function clean(value) { return String(value ?? '').trim(); }
  function normalizeHeader(value) { return clean(value).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, ''); }
  function imageType(name) { const ext = name.split('.').pop().toLowerCase(); return ({ jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', gif: 'image/gif', bmp: 'image/bmp' })[ext] || 'image/*'; }
  function imageKey(filename) {
    const stem = clean(filename).split('/').pop().replace(/\.[^.]+$/, '').trim();
    const number = Number(stem);
    return Number.isInteger(number) && number > 0 ? String(number) : '';
  }
  function numericImageId(value) {
    const number = Number(clean(value));
    return Number.isInteger(number) && number > 0 ? String(number) : '';
  }
  function describeFile(file, label) { return file ? `${label}: ${file.name} (${(file.size / 1024 / 1024).toFixed(1)} MB)` : `Chưa có ${label}`; }
  function describeFiles() { return `${describeFile(excelInput.files[0], 'Excel')} · ${describeFile(zipInput.files[0], 'ZIP')}`; }
  function clearUrls() { state.urls.forEach(URL.revokeObjectURL); state.urls = []; }
  function markChanged() {
    state.checked = false; state.rows = []; state.images = new Map(); clearUrls();
    exportButton.disabled = true; previewWrap.hidden = true; previewCard.hidden = true; canvasPages.replaceChildren();
    setNotice('File vừa đổi. Bấm “Kiểm tra file” để đọc lại.', 'muted'); setProgress('');
  }
  function assignFile(input, file) {
    const transfer = new DataTransfer(); transfer.items.add(file); input.files = transfer.files;
    $(input === excelInput ? 'excel-box' : 'zip-box').classList.add('selected'); fileStatus.textContent = describeFiles(); markChanged();
  }
  [[$('excel-box'), excelInput], [$('zip-box'), zipInput]].forEach(([box, input]) => {
    input.addEventListener('change', () => { box.classList.toggle('selected', !!input.files[0]); fileStatus.textContent = describeFiles(); markChanged(); });
    ['dragenter', 'dragover'].forEach((eventName) => box.addEventListener(eventName, (event) => { event.preventDefault(); box.classList.add('dragover'); }));
    ['dragleave', 'drop'].forEach((eventName) => box.addEventListener(eventName, (event) => { event.preventDefault(); box.classList.remove('dragover'); }));
    box.addEventListener('drop', (event) => { const file = event.dataTransfer.files[0]; if (file) assignFile(input, file); });
  });

  $('template-button').addEventListener('click', () => {
    const sheet = XLSX.utils.aoa_to_sheet([['STT', 'English', 'Viet', 'ID_Anh'], [1, 'apple', 'quả táo', 1], [2, 'ice cream', 'kem', 2]]);
    sheet['!cols'] = [{ wch: 10 }, { wch: 25 }, { wch: 25 }, { wch: 18 }];
    const book = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(book, sheet, 'Tu_vung'); XLSX.writeFile(book, 'Template_Input.xlsx');
  });

  async function parseExcel(file) {
    const book = XLSX.read(await file.arrayBuffer(), { type: 'array' }); const sheet = book.Sheets[book.SheetNames[0]];
    const values = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' }); if (!values.length) throw new Error('Excel đang trống.');
    const heads = values[0].map(normalizeHeader);
    const required = { stt: ['stt'], en: ['english', 'en', 'tienganh'], vi: ['viet', 'vi', 'tiengviet'], imageId: ['idanh', 'imageid', 'anhid'] };
    const indexes = Object.fromEntries(Object.entries(required).map(([key, names]) => [key, heads.findIndex((head) => names.includes(head))]));
    const missing = Object.entries(indexes).filter(([, value]) => value < 0).map(([key]) => ({ stt: 'STT', en: 'English', vi: 'Viet', imageId: 'ID_Anh' }[key]));
    if (missing.length) throw new Error(`Dòng tiêu đề thiếu cột: ${missing.join(', ')}. Hãy tải form Excel mẫu để dùng đúng 4 cột.`);
    const result = [];
    values.slice(1).forEach((row, position) => {
      const id = Number(row[indexes.stt]); const en = clean(row[indexes.en]); const vi = clean(row[indexes.vi]); const imageId = clean(row[indexes.imageId]);
      if (!clean(row[indexes.stt]) && !en && !vi && !imageId) return;
      result.push({ id, en, vi, imageId, sourceRow: position + 2 });
    });
    return result;
  }
  async function parseZip(file) {
    const zip = await JSZip.loadAsync(await file.arrayBuffer()); const found = new Map(); const ignored = [];
    for (const [name, entry] of Object.entries(zip.files)) {
      if (entry.dir) continue;
      const key = imageKey(name); if (!key) { ignored.push(name); continue; }
      found.set(key, { name, type: imageType(name), entry });
    }
    return { found, ignored };
  }
  function validateRows(rows, images) {
    const errors = []; const warnings = []; const seen = new Set();
    rows.forEach((row) => {
      if (!Number.isInteger(row.id) || row.id < 1) errors.push(`Dòng ${row.sourceRow}: STT phải là số nguyên từ 1 trở lên.`);
      else if (seen.has(row.id)) errors.push(`Dòng ${row.sourceRow}: STT ${row.id} bị trùng.`); else seen.add(row.id);
      if (!row.en) errors.push(`Dòng ${row.sourceRow}: thiếu English.`); if (!row.imageId) errors.push(`Dòng ${row.sourceRow}: thiếu ID_Anh.`);
      else if (!images.has(numericImageId(row.imageId))) warnings.push(`Dòng ${row.sourceRow}: ID ảnh “${row.imageId}” không có trong ZIP.`);
    });
    if (!rows.length) errors.push('Excel không có dòng từ vựng hợp lệ (dòng tiêu đề không được tính là từ).'); return { errors, warnings };
  }
  async function imageUrl(imageInfo) { const blob = await imageInfo.entry.async('blob'); const url = URL.createObjectURL(new Blob([blob], { type: imageInfo.type })); state.urls.push(url); return url; }
  async function renderPreview(rows, images) {
    previewBody.replaceChildren();
    for (const row of rows) {
      const tr = document.createElement('tr'); const image = images.get(numericImageId(row.imageId));
      tr.innerHTML = `<td>${row.id || '—'}</td><td></td><td></td><td></td><td class="${image ? 'yes' : 'no'}"></td>`;
      tr.children[1].textContent = row.en || '—'; tr.children[2].textContent = row.vi || '—'; tr.children[3].textContent = row.imageId || '—';
      if (image) { const thumb = document.createElement('img'); thumb.className = 'thumbnail'; thumb.alt = `Ảnh ${row.en}`; thumb.src = await imageUrl(image); tr.children[4].append(thumb); }
      else tr.children[4].textContent = '✕ Thiếu ảnh'; previewBody.append(tr);
    }
    previewWrap.hidden = false;
  }
  $('check-button').addEventListener('click', async () => {
    if (!excelInput.files[0] || !zipInput.files[0]) { setNotice('Anh cần chọn đủ 1 Excel và 1 ZIP ảnh.', 'error'); return; }
    try {
      clearUrls(); setProgress('Đang đọc Excel và ZIP…'); const [rows, zip] = await Promise.all([parseExcel(excelInput.files[0]), parseZip(zipInput.files[0])]); const result = validateRows(rows, zip.found);
      state.rows = rows; state.images = zip.found; state.checked = !result.errors.length; await renderPreview(rows, zip.found); exportButton.disabled = !state.checked; previewCard.hidden = !state.checked;
      const info = [`Đã đọc ${rows.length} từ (không tính dòng tiêu đề), tìm thấy ${zip.found.size} ảnh.`];
      if (result.errors.length) info.push(`Không thể tạo PDF: ${result.errors.length} lỗi. ${result.errors.slice(0, 2).join(' ')}`);
      if (result.warnings.length) info.push(`${result.warnings.length} ảnh còn thiếu — dòng đó không được đưa vào PDF.`); if (zip.ignored.length) info.push(`Bỏ qua ${zip.ignored.length} file không phải ảnh PNG/JPG/JPEG.`);
      setNotice(info.join(' '), result.errors.length ? 'error' : result.warnings.length ? 'warning' : 'success'); setProgress(state.checked ? 'Dữ liệu hợp lệ. Anh có thể xem trước hoặc tạo PDF.' : 'Sửa lỗi trong Excel rồi chọn lại file.');
    } catch (error) { console.error(error); setNotice(`Không đọc được file: ${error.message}`, 'error'); setProgress(''); }
  });

  const COLS_PER_A5 = 6; const CARDS_PER_COL = 7;
  function validRows() { return state.rows.filter((item) => state.images.has(numericImageId(item.imageId))); }
  function mm(value) { return value * 72 / 25.4; }
  function pageDimensions() { return [mm(210), mm(148)]; }
  function buildPages(items) {
    const capacity = COLS_PER_A5 * CARDS_PER_COL;
    if (items.length <= capacity) {
      const colsPerSet = Math.ceil(items.length / CARDS_PER_COL);
      const setsPerPage = Math.floor(COLS_PER_A5 / colsPerSet);
      return [{ placements: Array.from({ length: setsPerPage }, (_, set) => items.map((item, itemIndex) => ({ item, col: set * colsPerSet + Math.floor(itemIndex / CARDS_PER_COL), row: itemIndex % CARDS_PER_COL }))), colsPerSet, setsPerPage }];
    }
    const pages = [];
    for (let offset = 0; offset < items.length; offset += capacity) {
      const chunk = items.slice(offset, offset + capacity);
      pages.push({ placements: [chunk.map((item, itemIndex) => ({ item, col: Math.floor(itemIndex / CARDS_PER_COL), row: itemIndex % CARDS_PER_COL }))], colsPerSet: COLS_PER_A5, setsPerPage: 1 });
    }
    return pages;
  }
  async function previewAll() {
    if (!state.checked) return; const items = validRows(); const pages = buildPages(items);
    canvasPages.replaceChildren(); previewStatus.textContent = `Đang vẽ ${pages.length} trang…`;
    const imageCache = new Map(); for (const item of items) imageCache.set(item.imageId, await imageUrl(state.images.get(numericImageId(item.imageId))));
    const renderW = 1000; const [pdfW, pdfH] = pageDimensions(); const renderH = Math.round(renderW * pdfH / pdfW);
    for (let pageNo = 0; pageNo < pages.length; pageNo += 1) {
      const label = document.createElement('p'); label.className = 'canvas-label'; label.textContent = `Trang ${pageNo + 1}/${pages.length}`; const canvas = document.createElement('canvas'); canvas.className = 'canvas-page'; canvas.width = renderW; canvas.height = renderH; const ctx = canvas.getContext('2d'); ctx.fillStyle = '#fffdf9'; ctx.fillRect(0, 0, renderW, renderH);
      const margin = 24; const cardW = (renderW - margin * 2) / COLS_PER_A5; const cardH = (renderH - margin * 2) / CARDS_PER_COL;
      for (const placement of pages[pageNo].placements.flat()) {
        const { item, col, row } = placement; const x = margin + col * cardW; const y = margin + row * cardH;
        ctx.fillStyle = '#f8fbff'; ctx.strokeStyle = '#c7e2f8'; ctx.lineWidth = 1; ctx.fillRect(x, y, cardW, cardH); ctx.strokeRect(x, y, cardW, cardH);
        ctx.fillStyle = '#2d241d'; let fontSize = Math.min(cardH * .2, 20); ctx.font = `${fontSize}px KGPen, sans-serif`; while (ctx.measureText(item.en).width > cardW - 12 && fontSize > 7) { fontSize -= 1; ctx.font = `${fontSize}px KGPen, sans-serif`; } ctx.textAlign = 'center'; ctx.fillText(item.en, x + cardW / 2, y + fontSize + 4);
        const image = new Image(); image.src = imageCache.get(item.imageId); await new Promise((resolve, reject) => { image.onload = resolve; image.onerror = () => reject(new Error(`Không đọc được ảnh ${item.imageId}.`)); }); const maxW = cardW - 10; const maxH = cardH - fontSize - 18; const scale = Math.min(maxW / image.naturalWidth, maxH / image.naturalHeight); const w = image.naturalWidth * scale; const h = image.naturalHeight * scale; ctx.drawImage(image, x + (cardW - w) / 2, y + fontSize + 9 + (maxH - h) / 2, w, h);
      }
      canvasPages.append(label, canvas);
    }
    const first = pages[0]; previewStatus.textContent = items.length > 42 ? `Đã hiển thị ${pages.length} trang A5 cho 1 set ${items.length} từ.` : `Đã hiển thị 1 tờ A5: 1 set dùng ${first.colsPerSet} cột; tờ này có ${first.setsPerPage} set.`;
  }
  $('pdf-preview-button').addEventListener('click', () => previewAll().catch((error) => { console.error(error); previewStatus.textContent = `Không vẽ được preview: ${error.message}`; }));

  async function loadImage(pdfDoc, imageInfo) {
    const data = await imageInfo.entry.async('uint8array');
    if (imageInfo.type === 'image/png') return pdfDoc.embedPng(data);
    if (imageInfo.type === 'image/jpeg') return pdfDoc.embedJpg(data);
    const sourceUrl = URL.createObjectURL(new Blob([data], { type: imageInfo.type }));
    try {
      const image = new Image(); image.src = sourceUrl;
      await new Promise((resolve, reject) => { image.onload = resolve; image.onerror = () => reject(new Error(`Không chuyển được ảnh ${imageInfo.name} sang PDF.`)); });
      const canvas = document.createElement('canvas'); canvas.width = image.naturalWidth; canvas.height = image.naturalHeight;
      canvas.getContext('2d').drawImage(image, 0, 0);
      const pngBlob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
      if (!pngBlob) throw new Error(`Không chuyển được ảnh ${imageInfo.name} sang PDF.`);
      return pdfDoc.embedPng(new Uint8Array(await pngBlob.arrayBuffer()));
    } finally { URL.revokeObjectURL(sourceUrl); }
  }
  function fit(image, x, y, width, height) { const ratio = Math.min(width / image.width, height / image.height); const w = image.width * ratio; const h = image.height * ratio; return { x: x + (width - w) / 2, y: y + (height - h) / 2, width: w, height: h }; }
  async function fetchFont(url) { const response = await fetch(url); if (!response.ok) throw new Error(`Không tải được font: ${url}`); return response.arrayBuffer(); }
  async function exportPdf() {
    if (!state.checked) return; const valid = validRows(); if (!valid.length) { setNotice('Không có thẻ nào có đủ ảnh để xuất.', 'error'); return; }
    const layoutPages = buildPages(valid); exportButton.disabled = true;
    try {
      setProgress('Đang nhúng font và ảnh vào PDF…'); const { PDFDocument, rgb } = PDFLib; const pdfDoc = await PDFDocument.create(); pdfDoc.registerFontkit(fontkit); const font = await pdfDoc.embedFont(await fetchFont('assets/fonts/KGPrimaryPenmanshipAlt.ttf'), { subset: true }); const [pageW, pageH] = pageDimensions(); const margin = mm(5); const cardW = (pageW - margin * 2) / COLS_PER_A5; const cardH = (pageH - margin * 2) / CARDS_PER_COL; const imageCache = new Map();
      for (let pageNo = 0; pageNo < layoutPages.length; pageNo += 1) {
        const page = pdfDoc.addPage([pageW, pageH]);
        for (const { item, col, row } of layoutPages[pageNo].placements.flat()) {
          const x = margin + col * cardW; const top = pageH - margin - row * cardH; const y = top - cardH;
          page.drawRectangle({ x, y, width: cardW, height: cardH, color: rgb(.973, .984, 1), borderColor: rgb(.78, .90, .98), borderWidth: .65 });
          let size = Math.min(cardH * .20, 16); while (font.widthOfTextAtSize(item.en, size) > cardW - 7 && size > 5) size -= .4; const labelW = font.widthOfTextAtSize(item.en, size); page.drawText(item.en, { x: x + (cardW - labelW) / 2, y: top - size - 3, size, font, color: rgb(0, 0, 0) });
          if (!imageCache.has(item.imageId)) imageCache.set(item.imageId, await loadImage(pdfDoc, state.images.get(numericImageId(item.imageId))));
          page.drawImage(imageCache.get(item.imageId), fit(imageCache.get(item.imageId), x + 3, y + 3, cardW - 6, cardH - size - 12));
        }
        setProgress(`Đã tạo trang ${pageNo + 1}/${layoutPages.length}…`);
      }
      const bytes = await pdfDoc.save(); const url = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' })); const a = document.createElement('a'); a.href = url; a.download = 'The_Hinh_A5_Tu_Dong.pdf'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 500); setProgress(`Đã tải PDF: ${valid.length} từ, ${layoutPages.length} trang A5.`); setNotice('Tạo PDF xong. Khi in, chọn Actual size / 100% để giữ đúng kích thước.', 'success');
    } catch (error) { console.error(error); setNotice(`Không tạo được PDF: ${error.message}`, 'error'); setProgress(''); } finally { exportButton.disabled = !state.checked; }
  }
  exportButton.addEventListener('click', exportPdf);
})();