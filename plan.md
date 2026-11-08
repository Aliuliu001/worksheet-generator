# Kế hoạch sửa lỗi và chuẩn hóa đầu ra — Bộ tạo phiếu bài tập

**Trạng thái:** Đã triển khai các bố cục PDF riêng, lọc dòng Excel rỗng theo dữ liệu thô và preview theo dạng phiếu. Còn kiểm tra máy in/thiết bị thật.

## Lỗi cần sửa trước

### 1. Excel đọc dư dòng

**Hiện tượng:** Excel có 12 từ nhưng trang đọc 100 dòng và báo lỗi ở các dòng trống như dòng 14.

**Cách sửa:** Chỉ giữ dòng có dữ liệu thật trong ít nhất một trong bốn cột `STT`, `English`, `Viet`, `ID_Anh`; bỏ toàn bộ dòng chỉ còn định dạng, khoảng trắng hoặc ô trống.

**Kiểm tra:** Excel 12 từ có các hàng đã định dạng đến dòng 100 phải chỉ hiển thị đúng 12 dòng.

### 2. Khôi phục preview

**Hiện tượng:** Sau khi thêm chọn loại phiếu, nút preview chỉ còn phục vụ Flashcards hoặc hoạt động không đúng loại phiếu đã chọn.

**Cách sửa:** Nút đổi thành **👁️ Xem trước phiếu đang chọn**. Preview dùng đúng dữ liệu đã sửa trên bảng, đúng loại phiếu chọn và mã đề 1. Nếu chọn nhiều loại, hiển thị preview từng loại có nhãn rõ ràng.

### 3. Tách đầu ra theo từng loại phiếu

Không dùng chung lưới Flashcards cho bài tập. Mỗi loại có bố cục và PDF riêng. Khi chọn nhiều loại/mã đề thì tải ZIP; chỉ một PDF thì tải trực tiếp. Matching luôn có PDF đáp án riêng.

---

## Quy tắc dữ liệu giữ nguyên

- Excel có 4 cột: `STT | English | Viet | ID_Anh`.
- `ID_Anh` chỉ nhập số; ZIP tự nhận ảnh có cùng số với các đuôi ảnh phổ biến.
- Bảng kiểm tra được sửa trực tiếp `English`, `Viet`, `ID_Anh`; thay đổi áp dụng ngay cho preview/PDF trong lần mở trang.
- Ảnh web: 120 × 72 px, không đổi ảnh in.
- PDF: A5 dọc, lề 3 mm.

---

## Bố cục đầu ra đã chốt

### A. Flashcards — giữ nguyên

- A5 dọc, 6 cột × 7 hàng.
- 1–7 từ: 6 set/tờ; 8–14: 3 set/tờ; 15–21: 2 set/tờ; 22–42: 1 set/tờ.
- Set mới luôn bắt đầu tại cột mới; phần trống cuối cột không chứa set khác.

### B. Anagram — đã chốt

- A5 dọc, **2 cột**.
- Mỗi cột tối đa **14 câu**, tức một trang tối đa 28 câu.
- Mỗi câu: `STT + hình + chữ cái bị xáo + dòng trả lời`.
- Với cụm từ, xáo từng từ riêng và giữ khoảng trắng giữa các từ.
- Dùng mẫu Colab/ảnh Anagram anh đã gửi làm chuẩn bố cục.

### C. Matching — đã chốt

- A5 dọc, tối đa **11 cặp/trang**, theo ảnh mẫu anh đã gửi.
- Bên trái: số thứ tự + hình.
- Bên phải: A, B, C… + đúng các từ tiếng Anh được trộn.
- Không có từ dư.
- Khoảng giữa dành để học sinh kẻ nối.
- PDF đáp án riêng theo đúng lượt trộn, ví dụ `1-C, 2-A`.

### D. Typing dạng 1 — đã chốt

- Hình + dòng chấm để học sinh tự viết từ tiếng Anh.
- A5 dọc chia **2 cột**.
- Tối đa **15 câu/cột**, tức 30 câu/trang.
- Hình phải đủ nhận ra; dòng điền nằm cạnh/dưới hình theo bố cục 2 cột.

### E. Typing dạng 2 — đã chốt

- Dành cho học sinh lớp lớn: hiển thị **nghĩa tiếng Việt** từ cột `Viet`, học sinh điền English.
- Không dùng phiên âm và không thêm cột mới vào Excel.
- Không dùng hình; xuất theo bảng bài tập phù hợp với mẫu tham khảo nhưng đổi cột gợi ý thành `Nghĩa tiếng Việt` và phần trả lời `English của học sinh`.
- Chia 2 cột trên A5 dọc; số dòng được tính theo kích thước chữ để không tràn.

---

## Kế hoạch triển khai sau khi nhận đủ mẫu

### Bước 1 — Sửa dữ liệu và preview

1. Lọc đúng dòng Excel có nội dung, sửa lỗi 12 từ thành 100 dòng.
2. Khôi phục preview theo phiếu được chọn.
3. Kiểm tra preview và PDF cùng dùng dữ liệu sau khi sửa trực tiếp trên bảng.

### Bước 2 — Xây từng bộ xuất PDF riêng

1. Giữ Flashcards hiện có.
2. Làm Anagram 2 cột × 14 câu theo mẫu đã có.
3. Làm Matching 11 cặp/trang và PDF đáp án.
4. Làm Typing dạng 1 sau khi chốt số câu/cột.
5. Làm Typing dạng 2 theo mẫu ảnh.

### Bước 3 — Mã đề, ZIP và kiểm tra

1. Mỗi mã đề trộn thứ tự câu; Matching trộn thêm danh sách từ bên phải.
2. Đáp án Matching lấy đúng kết quả của lần trộn đó.
3. Một PDF tải trực tiếp; từ hai PDF trở lên tải ZIP.
4. Test Excel 12 từ có dòng trống cuối, Anagram 1/14/15/28 câu, Matching 1/11/12 cặp, hai Typing và nhiều mã đề.
5. Render/kiểm tra PDF thật, sau đó đẩy GitHub.

## Điều kiện đã đủ để code

- Matching: tối đa 11 cặp/A5 dọc, không từ dư.
- Anagram: 2 cột × tối đa 14 câu/cột; dùng mẫu Colab và ảnh đã nhận.
- Typing dạng 1: 2 cột × 15 câu/cột, có hình và dòng điền.
- Typing dạng 2: nghĩa Việt từ cột `Viet` → học sinh viết English; không hình, không phiên âm, không thêm cột.

Có thể bắt đầu sửa lỗi dữ liệu/preview và triển khai riêng từng PDF.