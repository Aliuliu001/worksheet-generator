# Kế hoạch sửa lỗi và chuẩn hóa đầu ra — Bộ tạo phiếu bài tập

## Đợt hiện tại — Matching 2 và Typing nhìn hình

- Matching 2: chữ mặc định 15 pt, ba cột text rộng 30% / 30% / 40% (không kể hai khoảng cách an toàn 2 mm). Xếp 7 từ ngắn vào hai cột đầu (4 + 3), ba cụm dài nhất vào cột cuối. Chỉ co chữ nếu vẫn không vừa cột, không chồng cột. Mapping hình/chữ cái không đổi; Preview, bài làm và đáp án dùng cùng danh sách đã lưu.
- Typing nhìn hình: Preview phải dùng đúng ảnh ZIP, tiêu đề tiếng Anh, chữ 15 pt và cùng tọa độ với PDF. Đổi mật độ từ 30 xuống **20 hình/A5** (10 mỗi cột) để hình rộng 20 mm, cao tối đa một hàng; không kéo hình cao bằng 1,5–2 hàng. Muốn đổi số từ mỗi trang về sau, chỉ sửa `TYPING_IMAGE_PER_COL` ở `assets/js/app.js` (đồng thời kiểm tra Preview/PDF). Giữ tỉ lệ gốc của ảnh và đường viết không chạm hình.
- Kiểm tra mỗi dạng trong mục “Chọn phiếu cần tạo”: danh sách ảnh đã sửa trong bảng, font, ngôn ngữ đề, số trang Preview, file PDF thật, ảnh không thiếu, vị trí không tràn và đề/đáp án cùng thứ tự. Không đánh dấu hoàn tất cho các dạng khác khi chưa kiểm tra từng dạng.
- Dữ liệu thử hiện có dùng hình vuông đỏ làm ảnh mẫu, không phải lỗi tải ảnh: cần thử thêm ZIP ảnh thật của anh để xác nhận khả năng nhận diện hình trên giấy.
- Bước tiếp theo: rà riêng Flashcards, Anagram, Matching 1 và Typing nghĩa Việt bằng dữ liệu thật; chuẩn hóa tiêu đề tiếng Anh và cỡ chữ nơi cần thiết, rồi so Preview với từng PDF. Đợt này không tự đổi bố cục các dạng đã duyệt.

---

**Trạng thái:** Đã sửa và kiểm tra bằng browser fixture 31 từ: Preview và PDF dùng cùng quy tắc bố cục, tạo thành công ZIP gồm 6 PDF bài làm/đáp án. Đã render PDF thật để đối chiếu trực quan; chưa in thử trên máy in thật.

**Cập nhật 14/11/2026:** Matching 2 Preview dùng chung tọa độ PDF cho nhãn A–J và prompt nên khớp sát với bản in. Lề Matching 2 trái 7 mm, phải 3,2 mm; ba cột 30%/33%/37%. Typing 1 **Nhìn hình viết chữ** giữ 28 câu/A5, dòng viết hạ 2,8 mm. Đã thêm Typing 2 (Việt → English) và Typing 3 (English → Việt): A4 ngang, hai bảng 60 dòng lặp cạnh nhau theo form. Browser Preview, PDF thật và render PyMuPDF xác nhận 60 câu/1 trang, 61 câu/2 trang; font Unicode PDF hiển thị đúng dấu tiếng Việt. `node --check` và ba test Node đều đạt. Cần in thử Actual size / 100% trên giấy A5/A4.

## Đợt sửa kế tiếp — Matching 2: Preview và file tải xuống giống nhau

**Mục tiêu:** File PDF tải về phải giữ đúng bố cục đẹp như Preview: hình lớn, từng hình có khung nét đứt bo tròn, nhãn chữ cái nằm dưới hình rõ ràng, và text không chồng hay chạy sang cột kế bên.

### Hiện trạng đã xác nhận từ mã nguồn

- Preview web và PDF hiện dùng **hai đoạn vẽ riêng**. Vì vậy cùng một dữ liệu nhưng kích thước ảnh, khung, nhãn và chữ có thể lệch nhau.
- PDF đang dùng ô hình cao khoảng 19 mm, phần ảnh chỉ khoảng 12.2 mm; do đó hình tải về nhỏ hơn mong muốn.
- PDF đang đặt nhãn A–J *bên trong đáy* ô hình, nên dễ đè lên ảnh.
- Phần prompt hiện in thẳng cỡ 16 pt, không đo độ dài trước; cụm từ dài có thể tràn sang cột bên cạnh.

### Bước 1 — Tạo một bản bố cục chung

1. Tạo một “bản tọa độ” chung cho Matching 2: vị trí từng ô hình, khoảng cách 2 mm, vùng ảnh, vùng nhãn A–J, và ba cột text.
2. Cả Preview web và PDF chỉ đọc bản tọa độ này; không tự tính riêng ở hai nơi nữa.
3. Giữ nguyên mapping/xáo chữ cái A–J đang dùng để Preview, phiếu học sinh và đáp án luôn khớp nhau.

**Kết quả cần thấy:** Cùng một đề, Preview và PDF có cùng số hàng, đúng vị trí ảnh, đúng nhãn và cùng thứ tự từ.

### Bước 2 — Sửa lưới hình và nhãn chữ cái

1. Tăng vùng chứa ảnh trong từng ô, ưu tiên hình nhìn rõ trên A5.
2. Mỗi hình nằm trong một **khung nét đứt bo tròn**; khoảng trống giữa hai khung là **2 mm**.
3. Chừa một dải nhãn cố định *bên dưới ảnh*, tách khỏi vùng hình; nhãn A–J cỡ **16 pt, in đậm**, căn giữa.
4. Ảnh tự thu/phóng theo tỉ lệ để không bị méo hoặc đụng khung.
5. Áp dụng cùng màu, độ dày nét đứt, bán kính bo góc ở Preview lẫn PDF.

**Kết quả cần thấy:** Không có chữ A/B/C nào chồng lên hình; hình lớn hơn rõ rệt nhưng vẫn đủ 10 hình/nhóm.

### Bước 3 — Chống chồng text dài giữa 3 cột

1. Xác định chiều rộng cố định của từng cột text, kèm khoảng an toàn trước cột kế tiếp.
2. Trước khi in mỗi dòng, đo cả chuỗi `số + chỗ trống + từ/cụm từ`.
3. Mặc định dùng font 16 pt; chỉ khi vượt bề rộng cột mới giảm dần font đến mức nhỏ nhất đọc được.
4. Nếu vẫn quá dài ở cỡ nhỏ nhất, cắt gọn có dấu `…` trong *chính cột đó*, tuyệt đối không xuống dòng và không chạy sang cột kế.
5. Dùng đúng hàm đo/thu nhỏ này cho Preview, PDF bài làm và PDF đáp án.

**Kết quả cần thấy:** Các cụm dài như `play with a kitten` vẫn nằm gọn một dòng trong cột của nó; không đè lên cột bên cạnh, không tự wrap.

### Bước 4 — Đồng nhất tiêu đề, đáp án và khoảng cách nhóm

1. Dùng cùng quy tắc đặt tiêu đề, khoảng cách lưới–text và đường nét đứt chia hai nhóm trên cả hai đầu ra.
2. PDF đáp án giữ bố cục hình giống phiếu học sinh; chỉ thay chỗ trống bằng chữ cái đáp án.
3. Khi nhóm chỉ có 1 hàng hình, tính chiều cao thật rồi đẩy phần text lên sát phía dưới, không để khoảng trắng giả.

### Bước 5 — Kiểm tra bằng file thật trước khi đẩy web

1. Dùng đúng bộ Excel/ZIP có 10 từ trong ảnh mẫu, gồm các cụm ngắn và cụm dài.
2. Mở Preview web, lưu ảnh đối chiếu và xuất PDF thật.
3. Render trang PDF vừa xuất thành ảnh, so sánh trực tiếp với Preview theo các điểm: 10 khung, khoảng cách 2 mm, nhãn 16 pt đậm nằm dưới hình, 10 dòng text không chồng.
4. Kiểm tra thêm các mốc: 1–5 hình, 6–10 hình, 11–20 hình, và 21 hình để chắc trang/nhóm sau không bị vỡ.
5. Chỉ khi toàn bộ điều kiện đạt mới commit, đẩy GitHub Pages, tăng số phiên bản link và báo anh tải lại trang bằng **Ctrl + Shift + R**.

### Tệp dự kiến sửa

- `assets/js/app.js` — gom quy tắc bố cục Matching 2, vẽ Preview/PDF bằng chung tọa độ, thêm co chữ theo bề rộng cột.
- `plan.md` — ghi kết quả kiểm tra thực tế sau khi hoàn tất.

### Điều kiện nghiệm thu

- [ ] Mỗi hình có khung **nét đứt bo tròn**, cách nhau 2 mm.
- [ ] Hình trong PDF lớn, rõ; không méo.
- [ ] Nhãn A–J **16 pt, đậm**, nằm dưới hình và không chồng lên ảnh.
- [ ] Text mặc định 16 pt; text dài tự nhỏ vừa đủ trong cột, không wrap/chồng cột.
- [ ] Preview web, PDF bài làm và PDF đáp án cùng mapping và cùng bố cục.
- [ ] Đã kiểm tra PDF xuất thật, không chỉ kiểm tra code/Preview.

---

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

### B. Anagram — điều chỉnh theo mẫu đã duyệt

- A5 dọc, **2 cột** × tối đa 14 câu/cột (28 câu/trang).
- Có một đường **nét đứt dọc** ở chính giữa trang để tách/cắt hai cột.
- Nội dung từng cột nằm sát đường giữa: khoảng cách từ chữ xáo và dòng đáp án tới đường nét đứt chỉ **2–3 mm**, để ưu tiên bề ngang cho học sinh viết đáp án.
- Mỗi câu: `STT sát hình + hình cao đủ 2 hàng + chữ cái xáo ở hàng 1 + dòng trả lời ở hàng 2`.
- Tiêu đề tiếng Anh: **Unscramble the Words**.
- Từ/cụm từ tiếng Anh được xáo từng từ; giữa các từ hiển thị 3 khoảng trống để học sinh nhận ra ranh giới từ.
- Font mặc định 12pt; từ dài đổi dấu ` / ` sang `/` trước, rồi chỉ giảm tối đa tới 11pt.

### C. Matching 1: Look and Match — đã chốt (dạng nối đang làm)

- Tiêu đề tiếng Anh: **Task 1. Look and match.**
- A5 dọc, **12 từ/trang**, chia thành 2 bộ × 6 từ; mỗi bộ chỉ xáo trong chính 6 từ đó và có nét đứt ngang ngăn bộ.
- Cột trái mỗi dòng: `1. ______` để học sinh tự điền chữ cái A/B/C… + một dấu tròn lớn + hình.
- Cột phải mỗi dòng: từ tiếng Anh được trộn, kèm một dấu tròn lớn ở phía gần khu nối.
- Các dấu tròn ở cả hai phía thẳng hàng theo chiều dọc; khoảng giữa để trống hoàn toàn cho đường nối.
- Font 15pt, căn trái; toàn bộ nội dung thụt 1 cm từ lề trái.
- Không có từ dư. PDF đáp án riêng theo đúng lượt trộn, ví dụ `1-C, 2-A`.

### D. Nút 🔀 Xáo lại — cần thêm cho mọi dạng

- Nút nằm cạnh phần xem trước, giữ nguyên Excel/ZIP và các ô đã sửa.
- Mỗi lần bấm tạo một lượt ngẫu nhiên mới: thứ tự câu, chữ xáo Anagram, thứ tự từ Matching 1, nhãn chữ cái Matching 2.
- Preview cập nhật theo lượt mới; bấm Tạo PDF sẽ dùng đúng lượt đang xem, không tự xáo thêm.
- Mục tiêu: giáo viên có thể tạo/luyện nhiều lượt mà học sinh không nhớ đáp án cũ.

### E. Matching 2 — đã triển khai và kiểm tra browser/PDF

- Tên trong mục **Chọn phiếu cần tạo**: **Matching 2**.
- Không kẻ đường nối. Một nhóm gồm tối đa 10 hình mang nhãn A–J; phía dưới là đúng số từ tiếng Anh tương ứng, học sinh ghi chữ cái vào chỗ trống.
- Bao nhiêu hình thì có bấy nhiêu từ; **không có từ dư**.
- Một A5 có tối đa 20 hình, gồm 2 nhóm độc lập × tối đa 10 hình: Nhóm ảnh 1 + Text 1, sau đó Nhóm ảnh 2 + Text 2.
- Mỗi hình có khung bo tròn riêng để phân cách rõ với hình bên cạnh; nhãn A–J nằm ổn định dưới/tại ảnh.
- Font phần text mặc định **15pt**. Ba cột theo tỉ lệ **30% / 30% / 40%**, ngăn nhau 2 mm; từ ngắn ở hai cột đầu, cụm dài ở cột ba. Chỉ thu nhỏ chữ nếu chuỗi thực tế vượt giới hạn cột.
- Khi một nhóm thiếu hàng thứ hai (ví dụ chỉ 2–5 hình): chỉ vẽ số hàng ảnh thực tế, sau đó đẩy Text của chính nhóm đó sát lên ngay dưới lưới ảnh. Không giữ khoảng trắng giả của hàng ảnh trống.
- Các nhãn A–J và thứ tự text được xáo riêng trong từng nhóm. Preview, PDF bài làm và PDF đáp án dùng cùng một mapping lưu trong lần mở trang.
- PDF đáp án riêng; Preview phải dùng cùng phép tính chiều cao nhóm động như PDF, không được để khác output.

### F. Typing dạng 1 — đã chốt

- Hình + dòng chấm để học sinh tự viết từ tiếng Anh.
- A5 dọc chia **2 cột**.
- Tối đa **15 câu/cột**, tức 30 câu/trang.
- Hình phải đủ nhận ra; dòng điền nằm cạnh/dưới hình theo bố cục 2 cột.

### G. Typing dạng 2 — đã chốt

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