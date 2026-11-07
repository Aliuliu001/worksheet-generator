# Kế hoạch — Bộ tạo thẻ hình và phiếu bài tập tiếng Anh

**Trạng thái:** Phase 2–4 đã được triển khai trong bản chạy trên trình duyệt; chưa kiểm tra bằng máy in thật hay thiết bị Safari/điện thoại.

## Dữ liệu đầu vào

Excel gồm 4 cột: `STT`, `English`, `Viet`, `ID_Anh`.

- `ID_Anh` chỉ là số; ZIP có thể chứa `60.png`, `60.jpg`, `60.webp`, `60.gif`… kể cả trong thư mục con.
- Có thể sửa trực tiếp `English`, `Viet`, `ID_Anh` trong bảng kiểm tra. Thay đổi được dùng cho preview/PDF trong lần mở trang hiện tại.
- Ảnh xem trước web cố định 120 × 72 px, không làm thay đổi kích thước ảnh in.

## Đã triển khai

### Thẻ hình (Flashcards)

- A5 dọc, 6 cột × 7 hàng, lề PDF **3 mm**.
- Mỗi set dùng số cột nguyên vẹn và lặp tự động theo cột: 1–7 từ = 6 set; 8–14 = 3 set; 15–21 = 2 set; 22–42 = 1 set.
- Trên 42 từ, một set tự sang tờ A5 kế tiếp.
- Vùng chữ cố định giúp nhãn dài/nhãn ngắn giữ cùng hàng dọc.

### Ba dạng phiếu

- **Xáo chữ:** ảnh, các chữ trong từng từ/cụm từ được xáo, và dòng trả lời.
- **Nối hình – từ:** hình bên trái, đúng số từ được trộn ở bên phải, không có từ thừa; luôn tạo một PDF đáp án riêng.
- **Nhìn hình viết từ:** ảnh và dòng viết đáp án.
- Có 1–10 mã đề; các mã từ 2 trở lên đổi thứ tự câu. Bật “Việt → English” để dùng cột Viet làm gợi ý cho các phiếu viết/ghép.

### Xuất và trải nghiệm

- Một PDF duy nhất được tải trực tiếp.
- Nhiều dạng/mã đề tạo ZIP bằng JSZip, bao gồm đáp án Matching.
- Có trạng thái tiến độ, kiểm tra lỗi/cảnh báo ảnh, và FAQ ngắn trên trang.

## Việc còn lại

- [ ] In thử PDF trên máy in thật (Actual size / 100%) để duyệt bố cục.
- [ ] Kiểm tra trực tiếp trên Safari và điện thoại.
- [ ] Bật GitHub Pages khi có quyền xác thực GitHub hợp lệ.
