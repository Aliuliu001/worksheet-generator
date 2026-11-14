# Danh sách việc — Bộ tạo phiếu bài tập tiếng Anh

**Quy ước:** Chỉ đánh dấu `[x]` cho phần đã có trong bản chạy trên trình duyệt. Kiểm tra máy in/thiết bị thật vẫn để mở.

## Nền tảng dữ liệu

- [x] Đọc Excel 4 cột và ZIP ảnh trên trình duyệt.
- [x] Nhận ID ảnh dạng số và các đuôi ảnh phổ biến.
- [x] Cảnh báo STT lỗi, thiếu English, thiếu ID hoặc thiếu ảnh.
- [x] Bảng review cho sửa English/Viet/ID_Anh; thumbnail cập nhật theo ID.
- [x] Thumbnail web cố định 120 × 72 px.

## Thẻ hình

- [x] A5 dọc, 6 cột × 7 hàng, lề 3 mm.
- [x] Lặp whole-column sets; không lẫn set ở cột thiếu.
- [x] Giữ vị trí dọc của nhãn dài/ngắn ổn định.
- [x] Xem trước toàn bộ trang thẻ hình bằng canvas.

## Phiếu bài tập

- [x] Thêm UI chọn Flashcards, Anagram, Matching, Typing.
- [x] Anagram xáo ký tự theo từng từ trong cụm từ và có dòng trả lời.
- [x] Matching có ảnh trái, từ tiếng Anh được trộn phải, không có từ thừa.
- [x] Matching 1 tạo PDF đáp án riêng, ghi cặp số–chữ cái.
- [x] Matching 2: A5 dọc 20 hình/trang, 2 nhóm độc lập 10 hình (5 × 2), nhãn A–J và prompt 4/3/3; từng ảnh có khung nét đứt bo tròn, cách nhau 2 mm; nhãn 16pt đậm nằm dưới ảnh.
- [x] Matching 2 dùng một quy tắc bố cục chung cho Preview/PDF: cùng mapping, vùng ảnh, nhãn, khoảng cách và ba cột prompt. Prompt bắt đầu 16pt, tự thu nhỏ trong phạm vi cột (và cắt `...` nếu vẫn quá dài), không wrap/chồng cột. Nhóm thiếu hàng ảnh thứ hai đặt prompt sát ngay dưới hàng ảnh thực tế.
- [x] Đã chạy browser fixture 20, 22 và 24 từ, preview ảnh ZIP thật và xuất ZIP gồm PDF bài làm/đáp án; đã xem canvas nhóm cuối thiếu hàng.
- [x] Preview Matching 1 và Matching 2 vẽ ảnh ZIP thật và dùng mapping đã lưu của trang đầu.
- [x] Typing có ảnh và dòng viết.
- [x] Chọn 1–10 mã đề; mã từ 2 trở lên đổi thứ tự câu.
- [x] Toggle Việt → English dùng Viet làm gợi ý khi viết/ghép.
- [x] Một PDF tải trực tiếp; nhiều file xuất ZIP bằng JSZip.

## Đợt Matching 2 + Typing nhìn hình

- [x] Matching 2: font 15 pt, 3 cột 30/30/40, từ dài nhất vào cột ba; dùng chung dữ liệu cho Preview, PDF và đáp án.
- [x] Typing nhìn hình: Preview dùng ảnh ZIP thật, tiêu đề tiếng Anh, số và tiêu đề 15 pt; 20 hình/A5, mỗi cột 10 hình, ảnh rộng tối đa 20 mm.
- [x] Chạy mẫu 31 hình trên trình duyệt: Preview hiện 2 trang Matching 2 và 2 trang Typing; ZIP xuất 3 PDF, mỗi PDF 2 trang, số ảnh 20+11.
- [ ] Thử thêm bằng ZIP ảnh bài học thật (mẫu hiện tại là hình vuông đỏ).
- [ ] Kiểm tra riêng bốn dạng còn lại: Flashcards, Anagram, Matching 1, Typing nghĩa Việt — ảnh, font, tiếng Anh, Preview so PDF và trang cuối thiếu câu.
- [ ] In thử phiếu Typing trên giấy A5 để chốt 20 hình/trang có đủ lớn.

## Đợt lề 10 mm, Typing 1 và nét đứt đen — 13/11/2026

- [x] Bốn phiếu Matching 1, Matching 2, Typing 1, Typing 2 dùng điểm bắt đầu nội dung trái/trên 10 mm; Flashcards và Anagram vẫn giữ lề cũ.
- [x] Đổi tên chọn phiếu thành **Typing 1: Nhìn hình viết chữ** và **Typing 2: Nghĩa Việt viết English**.
- [x] Typing 1 thử mức 14 dòng/cột (28 câu/A5): hình bắt đầu 2 mm sau ô số, có khoảng cách với đường viết và không tràn trang.
- [x] Matching 2: PDF dùng nét đứt đen mảnh vẽ bằng đoạn thẳng PDF thực, không còn phụ thuộc `borderDashArray`; có thêm hai vạch nét đứt dọc giữa ba cột text.
- [x] Đã nạp fixture thật qua browser: 31 từ/31 ảnh, xem Preview 6 trang và tải ZIP 6 PDF. Dùng PyMuPDF xác nhận A5 148 × 210 mm, đúng phân trang (2/2/2/2/3/3 trang) và render các PDF ra ảnh để kiểm tra trực quan.
- [x] `node --check` và 2 test Node đều qua.
- [x] Matching 1 và Typing 1/2: lề trái/trên 10 mm, phải/dưới 5 mm. Matching 2: lề trái 7 mm, phải 3,2 mm; vùng rộng thêm được chia đồng thời cho 3 cột 30%/33%/37%.
- [x] Matching 2: 1–4 prompt không có vạch dọc; 5–7 có một vạch; 8–10 có hai vạch. Preview, PDF bài làm và đáp án dùng chung quy tắc.
- [x] Typing 1: vẫn 28 câu/A5, ảnh cách số 2 mm, dòng viết hạ 2,8 mm bằng chung tọa độ cho Preview/PDF (kéo lên 1,2 mm từ mức trước).
- [x] Đã nạp fixture 2 từ với ảnh thật qua browser, Preview và PDF thật chỉ còn hai khung A/B nét đứt bo góc; không còn vạch prompt hay vạch ngăn nhóm thừa.
- [x] Đã nạp fixture ảnh thật Typing 1: PDF 28 câu có đủ 14 dòng/cột, không tràn; 29 câu tự sang trang hai. Dòng viết thấp hơn rõ ràng và không chạm hình/hàng kế.
- [x] Matching 2 Preview dùng đúng các tọa độ baseline PDF (nhãn A–J và prompt), khớp sát hơn với bản in.
- [x] Typing 2/3: A4 ngang, 2 bảng lặp giống nhau; tối đa 30 từ/bảng/trang, cỡ chữ 13,5 pt, header đậm/căn giữa và có lưới kẻ ô đầy đủ. 31 từ tự thành 2 trang; PDF dùng Unicode font cho tiếng Việt.
- [x] Typing 2/3 nhận Excel chỉ gồm English/Viet hoặc dán trực tiếp hai cột, dán nối thêm vào bảng đang có, sửa/xóa từng dòng trước khi xuất; chỉ làm Typing không cần ZIP.
- [x] Matching 2: Preview dùng cùng font KGPen, vùng đo prompt đã trừ lề 2 mm như PDF để tránh Preview có chữ lớn hơn output.
- [ ] In thử Actual size / 100% trên giấy A5/A4.

## Trải nghiệm và kiểm tra còn lại

- [x] Trạng thái tiến độ và FAQ ngắn.
- [x] Chạy thử trên trình duyệt local với fixture Excel/ZIP và kiểm tra PDF tải xuống.
- [ ] In thử trên máy in/thiết bị thật.
- [ ] In thử Actual size / 100% trên máy in thật.
- [ ] Kiểm tra Safari/điện thoại.
- [ ] GitHub Pages (chưa làm vì không có xác thực GitHub hợp lệ).
