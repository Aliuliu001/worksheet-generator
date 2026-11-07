# Kế hoạch triển khai — Bộ tạo đề kiểm tra tiếng Anh

**Trạng thái hiện tại:** Đã có trang thử nghiệm đầu tiên (thẻ hình 6×7 A5). Anh yêu cầu hoàn thiện đầy đủ theo các phase bên dưới.

---

## Phase 1: Hoàn thiện phần nhập liệu và preview

### 1.1. Upload file với drag & drop

- [x] Thêm vùng kéo thả cho cả Excel và ZIP.
- [x] Hiện tên file, kích thước và trạng thái upload.
- [x] Cho phép thay file đã chọn trước khi kiểm tra.

### 1.2. Form Excel mẫu để tải về

- [x] Tạo file `Template_Input.xlsx` với 4 cột: `STT`, `English`, `Viet`, `ID_Anh`.
- [x] Nút **📥 Tải form Excel mẫu** trên trang web.
- [x] Ghi chú rõ:
  - Cột `STT`: số thứ tự hàng (1, 2, 3…).
  - Cột `English`: từ/cụm từ tiếng Anh.
  - Cột `Viet`: nghĩa tiếng Việt (dùng cho dạng bài sau).
  - Cột `ID_Anh`: chỉ ghi số của ảnh (ví dụ `6`, `7`); trang tự nhận đuôi ảnh.

### 1.3. Xử lý Excel đúng cấu trúc mới

- [x] Đọc Excel có header dòng 1: `STT | English | Viet | ID_Anh`.
- [x] Bỏ qua dòng header khi xử lý.
- [x] Dùng `ID_Anh` thay vì `STT` để tìm ảnh trong ZIP.
- [x] Hiện **thumbnail ảnh 120×120px** trong bảng xem trước.

### 1.4. Sửa bug kiểm tra dữ liệu

- [x] Không đếm dòng header vào số từ.
- [x] Chỉ báo thiếu ảnh khi `ID_Anh` không tìm thấy trong ZIP.
- [x] Hiện rõ: "Dòng X: ID ảnh `abc.png` không có trong ZIP."

### 1.5. Preview mẫu PDF trước khi xuất

- [x] Sau khi bấm "Kiểm tra", hiện nút **👁️ Xem toàn bộ PDF**.
- [x] Vẽ canvas preview toàn bộ các trang theo đúng số cột, số hình và số bản in đã chọn.
- [x] Người dùng thấy bố cục thật trước khi tải PDF.

### 1.6. Sắp xếp lại phần cài đặt

- [x] Đưa 4 ô cài đặt lên **1 hàng ngang**.
- [x] Mặc định: `A5 | 6 cột | 7 hình/cột | 1 bản`.
- [x] Ô "Số bộ giống nhau" đổi thành: **Số bản in giống nhau** (ghi rõ: in nhiều bản từ cùng dữ liệu).
- [x] Xóa ghi chú về Colab.

**Xong Phase 1 khi:** Upload bằng kéo thả, tải được form mẫu, đọc đúng 4 cột Excel, hiện thumbnail ảnh, preview canvas PDF, không còn bug header.

---

## Phase 2: Thêm 3 dạng bài

### 2.1. Chọn dạng bài

- [ ] Thêm phần **"Chọn dạng bài"** với 3 checkbox:
  - ☐ **Anagram** (xáo chữ có hình)
  - ☐ **Matching** (nối hình–từ)
  - ☐ **Typing** (nhìn hình điền từ)
- [ ] Cho phép tích nhiều dạng cùng lúc → xuất nhiều PDF.

### 2.2. Anagram (xáo chữ có hình)

- [ ] Anh gửi lại file Colab hoặc ảnh mẫu Anagram.
- [ ] Em chuyển logic xáo chữ sang JavaScript.
- [ ] Mỗi thẻ: hình + chữ bị xáo + dòng trống để viết đáp án.
- [ ] Xuất `Anagram.pdf`.

### 2.3. Matching (nối hình–từ)

- [ ] Cột trái: số thứ tự + hình (giữ nguyên thứ tự 1, 2, 3…).
- [ ] Cột phải: chữ cái A, B, C… + từ tiếng Anh bị **trộn ngẫu nhiên**.
- [ ] Khoảng trống giữa để học sinh kẻ nối.
- [ ] Tạo file **đáp án riêng** `Matching_DapAn.pdf`: `1-C, 2-A, 3-B…`.
- [ ] Tùy chọn thêm 0–3 từ thừa để tăng độ khó.

### 2.4. Typing (nhìn hình điền từ)

- [ ] Mỗi thẻ: số thứ tự + hình + **1 dòng trống** để viết.
- [ ] Không có gợi ý chữ cái.
- [ ] Xuất `Typing.pdf`.

**Xong Phase 2 khi:** Tích được 3 dạng bài, xuất 3 PDF khác nhau từ cùng dữ liệu, Matching có file đáp án riêng.

---

## Phase 3: Nhiều mã đề và nâng cao

### 3.1. Tạo nhiều mã đề

- [ ] Thêm ô **Số mã đề** (mặc định 1, tối đa 10).
- [ ] Mỗi mã đề trộn thứ tự câu và đáp án khác nhau.
- [ ] Tên file rõ ràng: `Anagram_Ma_1.pdf`, `Matching_Ma_2.pdf`, `DapAn_Ma_1.pdf`.

### 3.2. Dùng cột `Viet` cho dạng bài ngược

- [ ] Dạng **Vietnamese → English**: cho nghĩa Việt, học sinh viết tiếng Anh.
- [ ] Checkbox **Đảo ngược ngôn ngữ** trong phần chọn dạng bài.

### 3.3. Xuất gộp ZIP

- [ ] Khi có nhiều mã đề hoặc nhiều dạng → nút **📦 Tải tất cả (ZIP)**.
- [ ] Một file ZIP chứa tất cả PDF thay vì tải từng file.

**Xong Phase 3 khi:** Tạo được 3 mã đề khác nhau, có dạng bài ngược Việt→Anh, tải gộp ZIP.

---

## Phase 4: Hoàn thiện UX và tài liệu

### 4.1. Cải thiện giao diện

- [ ] Thêm loading spinner khi đang tạo PDF.
- [ ] Progress bar chi tiết: "Đang nhúng font… Đang xử lý trang 1/3…"
- [ ] Toast thông báo thành công/lỗi rõ ràng.

### 4.2. Hướng dẫn đầy đủ

- [ ] Video hoặc ảnh minh họa từng bước trong README.
- [ ] Phần **FAQ**: xử lý lỗi thường gặp (thiếu ảnh, Excel sai cột, ảnh quá nặng).
- [ ] Thêm trang **/guide** với hướng dẫn chi tiết hơn README.

### 4.3. Kiểm tra đa trình duyệt

- [ ] Test Chrome, Firefox, Safari, Edge.
- [ ] Test trên điện thoại (upload từ Google Drive, Dropbox).
- [ ] Đảm bảo font hiển thị đúng trên mọi thiết bị.

**Xong Phase 4 khi:** Giao diện mượt, hướng dẫn đầy đủ, chạy ổn định trên 4 trình duyệt chính.

---

## Lịch triển khai đề xuất

| Phase | Thời gian ước tính | Ghi chú |
|-------|-------------------|---------|
| Phase 1 | 1–2 ngày | Nền tảng quan trọng nhất |
| Phase 2 | 2–3 ngày | Cần anh gửi mẫu Anagram |
| Phase 3 | 1 ngày | Tận dụng logic đã có |
| Phase 4 | 1 ngày | Hoàn thiện trải nghiệm |

**Tổng:** ~5–7 ngày làm việc (không tính thời gian chờ anh duyệt mẫu).

---

## Câu hỏi cần anh trả lời trước khi bắt đầu Phase 1

1. **Form Excel mẫu:** Anh có muốn thêm cột nào khác không? (ví dụ: cột `Category` để phân loại từ)
2. **Thumbnail ảnh:** Hiện ảnh thu nhỏ bao nhiêu pixel? (đề xuất 80×80px)
3. **Preview PDF:** Canvas preview đủ 1 trang đầu hay cần xem cả 3 trang?
4. **Anagram:** Anh gửi lại file Colab hoặc ảnh mẫu bố cục để em làm đúng.
5. **Matching:** Số từ thừa mặc định bao nhiêu? (0, 1, 2 hay 3?)
