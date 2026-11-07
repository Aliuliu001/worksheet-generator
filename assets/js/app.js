/* global XLSX, JSZip, PDFLib, fontkit */
(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const state = { rows: [], images: new Map(), checked: false };
  const excelInput = $('excel-file');
  const zipInput = $('zip-file');
  const fileStatus = $('file-status');
  const notice = $('notice');
  const previewWrap = $('preview-wrap');
  const previewBody = $('preview-body');
  const exportButton = $('export-button');
  const progress = $('progress');

  function setNotice(message, type = 'muted') {
    notice.className = `notice ${type}`;
    notice.textContent = message;
  }
  function setProgress(message = '') { progress.textContent = message; }
  function clean(value) { return String(value ?? '').trim(); }
  function normalizeHeader(value) { return clean(value).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, ''); }
  function imageId(name) {
    const base = name.split('/').pop().replace(/\.[^.]+$/, '');
    return /^\d+$/.test(base.trim()) ? Number(base.trim()) : null;
  }
  function imageType(name) {
    const ext = name.split('.').pop().toLowerCase();
    return ({ jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png' })[ext] || null;
  }
  function markChanged() {
    state.checked = false;
    exportButton.disabled = true;
    previewWrap.hidden = true;
    setNotice('File vừa đổi. Bấm “Kiểm tra file” để đọc lại.', 'muted');
    setProgress('');
  }
  excelInput.addEventListener('change', () => { $('excel-box').classList.toggle('selected', !!excelInput.files[0]); fileStatus.textContent = describeFiles(); markChanged(); });
  zipInput.addEventListener('change', () => { $('zip-box').classList.toggle('selected', !!zipInput.files[0]); fileStatus.textContent = describeFiles(); markChanged(); });
  function describeFiles() {
    const x = excelInput.files[0] ? `Excel: ${excelInput.files[0].name}` : 'Chưa có Excel';
    const z = zipInput.files[0] ? `ZIP: ${zipInput.files[0].name}` : 'Chưa có ZIP';
    return `${x} · ${z}`;
  }
  async function parseExcel(file) {
    const book = XLSX.read(await file.arrayBuffer(), { type: 'array' });
    const sheet = book.Sheets[book.SheetNames[0]];
    const values = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
    if (!values.length) throw new Error('Excel đang trống.');
    const heads = values[0].map(normalizeHeader);
    const sttIndex = heads.findIndex((v) => ['stt', 'so', 'number', 'id'].includes(v));
    const enIndex = heads.findIndex((v) => ['en', 'english', 'tienganh', 'word', 'words'].includes(v));
    const viIndex = heads.findIndex((v) => ['vi', 'vietnamese', 'tiengviet', 'nghia'].includes(v));
    const hasHeaders = sttIndex >= 0 || enIndex >= 0;
    const start = hasHeaders ? 1 : 0;
    const indexes = hasHeaders ? { stt: sttIndex >= 0 ? sttIndex : 2, en: enIndex >= 0 ? enIndex : 0, vi: viIndex >= 0 ? viIndex : 1 } : { stt: 2, en: 0, vi: 1 };
    const result = [];
    values.slice(start).forEach((row, position) => {
      const en = clean(row[indexes.en]);
      const rawId = row[indexes.stt];
      const id = Number(rawId);
      if (!en && !clean(rawId) && !clean(row[indexes.vi])) return;
      result.push({ id, en, vi: clean(row[indexes.vi]), sourceRow: position + start + 1 });
    });
    return result;
  }
  async function parseZip(file) {
    const zip = await JSZip.loadAsync(await file.arrayBuffer());
    const found = new Map();
    const ignored = [];
    for (const [name, entry] of Object.entries(zip.files)) {
      if (entry.dir) continue;
      const id = imageId(name); const type = imageType(name);
      if (id === null || !type) { ignored.push(name); continue; }
      if (!found.has(id)) found.set(id, { name, type, entry });
    }
    return { found, ignored };
  }
  function validateRows(rows, images) {
    const errors = []; const warnings = [];
    const seen = new Set();
    rows.forEach((row) => {
      if (!Number.isInteger(row.id) || row.id < 1) errors.push(`Dòng Excel ${row.sourceRow}: STT phải là số nguyên từ 1 trở lên.`);
      else if (seen.has(row.id)) errors.push(`STT ${row.id} bị trùng trong Excel.`);
      else seen.add(row.id);
      if (!row.en) errors.push(`Dòng Excel ${row.sourceRow}: thiếu từ tiếng Anh.`);
      if (row.id && !images.has(row.id)) warnings.push(`STT ${row.id} (${row.en || 'không có từ'}) chưa có ảnh.`);
    });
    if (!rows.length) errors.push('Excel không có dòng từ vựng hợp lệ.');
    return { errors, warnings };
  }
  function renderPreview(rows, images) {
    previewBody.replaceChildren();
    rows.forEach((row) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${row.id || '—'}</td><td></td><td class="${images.has(row.id) ? 'yes' : 'no'}">${images.has(row.id) ? '✓ Có ảnh' : '✕ Thiếu ảnh'}</td>`;
      tr.children[1].textContent = row.en || '—'; previewBody.append(tr);
    });
    previewWrap.hidden = false;
  }
  $('check-button').addEventListener('click', async () => {
    if (!excelInput.files[0] || !zipInput.files[0]) { setNotice('Anh cần chọn đủ 1 Excel và 1 ZIP ảnh.', 'error'); return; }
    try {
      setProgress('Đang đọc Excel và ZIP…');
      const [rows, zip] = await Promise.all([parseExcel(excelInput.files[0]), parseZip(zipInput.files[0])]);
      const result = validateRows(rows, zip.found);
      state.rows = rows; state.images = zip.found; state.checked = !result.errors.length;
      renderPreview(rows, zip.found);
      exportButton.disabled = !state.checked;
      const info = [`Đã đọc ${rows.length} từ, tìm thấy ${zip.found.size} ảnh.`];
      if (result.errors.length) info.push(`Không thể tạo PDF: ${result.errors.length} lỗi. ${result.errors.slice(0, 2).join(' ')}`);
      if (result.warnings.length) info.push(`${result.warnings.length} ảnh còn thiếu — thẻ đó sẽ không xuất.`);
      if (zip.ignored.length) info.push(`Bỏ qua ${zip.ignored.length} file không phải ảnh tên-số.`);
      setNotice(info.join(' '), result.errors.length ? 'error' : result.warnings.length ? 'warning' : 'success');
      setProgress(state.checked ? 'Dữ liệu hợp lệ. Anh có thể tạo PDF.' : 'Sửa lỗi trong Excel rồi chọn lại file.');
    } catch (error) { console.error(error); setNotice(`Không đọc được file: ${error.message}`, 'error'); setProgress(''); }
  });

  function mm(value) { return value * 72 / 25.4; }
  async function loadImage(pdfDoc, imageInfo) {
    const data = await imageInfo.entry.async('uint8array');
    return imageInfo.type === 'image/png' ? pdfDoc.embedPng(data) : pdfDoc.embedJpg(data);
  }
  function fit(image, x, y, width, height) {
    const ratio = Math.min(width / image.width, height / image.height);
    const w = image.width * ratio; const h = image.height * ratio;
    return { x: x + (width - w) / 2, y: y + (height - h) / 2, width: w, height: h };
  }
  async function fetchFont(url) { const response = await fetch(url); if (!response.ok) throw new Error(`Không tải được font: ${url}`); return response.arrayBuffer(); }
  function pageDimensions(size) { return size === 'A4' ? [mm(210), mm(297)] : [mm(210), mm(148)]; }
  async function exportPdf() {
    if (!state.checked) return;
    const columns = Math.max(1, Math.min(8, Number($('columns').value) || 6));
    const rows = Math.max(1, Math.min(12, Number($('rows').value) || 7));
    const requestedSets = Math.max(0, Math.min(100, Number($('sets').value) || 0));
    const valid = state.rows.filter((item) => state.images.has(item.id));
    const capacity = columns * rows;
    if (!valid.length) { setNotice('Không có thẻ nào có đủ ảnh để xuất.', 'error'); return; }
    if (valid.length > capacity) { setNotice(`Có ${valid.length} từ có ảnh, nhưng mẫu này chỉ chứa ${capacity} thẻ/bộ. Giảm dữ liệu hoặc tăng số cột/hình.`, 'error'); return; }
    const columnsPerSet = Math.ceil(valid.length / rows);
    const setCapacity = columnsPerSet * rows;
    const setsPerPage = Math.floor(columns / columnsPerSet);
    const sets = requestedSets || Math.max(1, setsPerPage);
    exportButton.disabled = true;
    try {
      setProgress('Đang nhúng font và ảnh vào PDF…');
      const { PDFDocument, rgb } = PDFLib;
      const pdfDoc = await PDFDocument.create(); pdfDoc.registerFontkit(fontkit);
      const font = await pdfDoc.embedFont(await fetchFont('assets/fonts/KGPrimaryPenmanshipAlt.ttf'), { subset: true });
      const [pageW, pageH] = pageDimensions($('page-size').value);
      const margin = mm(5); const gap = 0; const cardW = (pageW - margin * 2 - gap * (columns - 1)) / columns;
      const cardH = (pageH - margin * 2) / rows;
      const imageCache = new Map();
      const pageCount = Math.ceil(sets / setsPerPage);
      for (let pageNo = 0; pageNo < pageCount; pageNo += 1) {
        const page = pdfDoc.addPage([pageW, pageH]);
        const firstSet = pageNo * setsPerPage;
        const onThisPage = Math.min(setsPerPage, sets - firstSet);
        for (let setIndex = 0; setIndex < onThisPage; setIndex += 1) {
          for (let itemIndex = 0; itemIndex < valid.length; itemIndex += 1) {
            const index = setIndex * setCapacity + itemIndex;
            const item = valid[itemIndex];
            const col = Math.floor(index / rows); const row = index % rows;
            const x = margin + col * (cardW + gap); const top = pageH - margin - row * cardH; const y = top - cardH;
            page.drawRectangle({ x, y, width: cardW, height: cardH, color: rgb(0.973, 0.984, 1), borderColor: rgb(0.78, 0.90, 0.98), borderWidth: .65 });
            const label = item.en;
            let size = Math.min(cardH * .20, 16);
            while (font.widthOfTextAtSize(label, size) > cardW - 7 && size > 5) size -= .4;
            const labelW = font.widthOfTextAtSize(label, size);
            page.drawText(label, { x: x + (cardW - labelW) / 2, y: top - size - 3, size, font, color: rgb(0, 0, 0) });
            if (!imageCache.has(item.id)) imageCache.set(item.id, await loadImage(pdfDoc, state.images.get(item.id)));
            const image = imageCache.get(item.id); const box = fit(image, x + 3, y + 3, cardW - 6, cardH - size - 12);
            page.drawImage(image, box);
          }
        }
        setProgress(`Đã tạo trang ${pageNo + 1}/${pageCount}…`);
      }
      const bytes = await pdfDoc.save(); const blob = new Blob([bytes], { type: 'application/pdf' });
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `The_Hinh_${$('page-size').value}_${columns}_Cot_${rows}_Hinh.pdf`; a.click(); URL.revokeObjectURL(a.href);
      setProgress(`Đã tải PDF: ${sets} bộ, mỗi bộ ${valid.length} thẻ, ${pageCount} trang.`);
      setNotice('Tạo PDF xong. Khi in, chọn Actual size / 100% để giữ đúng kích thước.', 'success');
    } catch (error) { console.error(error); setNotice(`Không tạo được PDF: ${error.message}`, 'error'); setProgress(''); }
    finally { exportButton.disabled = !state.checked; }
  }
  exportButton.addEventListener('click', exportPdf);
})();
