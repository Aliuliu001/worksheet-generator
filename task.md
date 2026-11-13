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

## Trải nghiệm và kiểm tra còn lại

- [x] Trạng thái tiến độ và FAQ ngắn.
- [x] Chạy thử trên trình duyệt local với fixture Excel/ZIP và kiểm tra PDF tải xuống.
- [ ] In thử trên máy in/thiết bị thật.
- [ ] In thử Actual size / 100% trên máy in thật.
- [ ] Kiểm tra Safari/điện thoại.
- [ ] GitHub Pages (chưa làm vì không có xác thực GitHub hợp lệ).
