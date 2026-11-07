# Kế hoạch: Bộ tạo đề kiểm tra tiếng Anh tự động

**Trạng thái:** Chờ anh duyệt kế hoạch và mẫu Matching trước khi lập trình.  
**Mục tiêu đợt 1:** Từ 1 file Excel từ vựng + 1 file ZIP ảnh, tạo được PDF để in cho 3 dạng: **Xáo chữ có hình**, **Nối hình–từ**, và **Nhìn hình viết từ**; có PDF đáp án riêng khi cần.

## 1. Kết quả cần có

Anh mở một đường link web, làm lần lượt:

1. Bấm **📥 Chọn file từ vựng Excel**.
2. Bấm **🖼️ Chọn file ảnh ZIP**.
3. Xem danh sách dòng hợp lệ và lỗi thiếu ảnh/từ trùng.
4. Tích chọn một hoặc nhiều dạng đề.
5. Chọn A4/A5, số câu/trang, số mã đề, có/không đáp án.
6. Bấm **📄 Tạo và tải đề PDF**.

Kết quả tải về máy gồm:
- `De-Xao-chu.pdf`
- `De-Noi-cap.pdf`
- `De-Nhin-hinh-viet-tu.pdf`
- `Dap-an.pdf` (chỉ khi anh bật tạo đáp án)

File không được tải lên máy chủ; mọi xử lý diễn ra trên chính trình duyệt của anh.

---

## 2. Phạm vi đợt 1

### Có trong đợt 1

- Giữ nguyên kiểu xáo chữ có hình từ notebook Colab đang có.
- Matching: **hình ở bên trái ↔ từ tiếng Anh bị trộn ở bên phải**.
- Look and Write: hình + dòng trống để học sinh tự viết từ.
- Tạo nhiều mã đề bằng cách đổi thứ tự câu và đáp án.
- Tạo PDF đáp án riêng cho Matching và dạng chọn đáp án về sau.
- Kiểm tra rõ: thiếu cột, trùng số, thiếu ảnh, file không đọc được, từ quá dài.
- Dùng được Excel theo kiểu cũ của notebook để anh không phải sửa toàn bộ dữ liệu.
- Đưa lên GitHub Pages để mở bằng link.

### Chưa làm trong đợt 1

- Tự tạo câu ngữ pháp/đọc hiểu/viết câu dài.
- Đăng nhập, lưu dữ liệu lớp, chấm điểm trực tuyến.
- Âm thanh/nghe; sẽ làm đợt sau nếu anh có file audio.
- Tự sửa ảnh hoặc AI tạo nội dung.

---

## 3. Dữ liệu đầu vào

### Excel

Ứng dụng nhận cả hai kiểu cột sau:

**Kiểu hiện có (được ưu tiên để tương thích notebook):**
- Cột 1: `en` — từ/cụm từ tiếng Anh
- Cột 2: `vi` — nghĩa tiếng Việt, có thể để trống
- Cột 3: `stt` — số duy nhất của từ

**Kiểu rõ ràng hơn cho file mới:**
- `stt`, `en`, `vi`, `category` (chủ đề, không bắt buộc)

Ví dụ:

| stt | en | vi | category |
|---:|---|---|---|
| 1 | apple | quả táo | Food |
| 2 | ice cream | kem | Food |

### ZIP ảnh

- Mỗi ảnh mang đúng tên số ở cột `stt`: `1.png`, `2.jpg`, `3.webp`...
- Không bắt buộc tất cả cùng đuôi ảnh.
- Ảnh thiếu sẽ được liệt kê cụ thể; anh có thể chọn vẫn tạo đề, nhưng câu thiếu ảnh sẽ không được đưa vào dạng cần ảnh.

---

## 4. Mẫu đề cần anh duyệt trước khi lập trình

### A. Xáo chữ có hình

- Giữ thiết kế hiện có: số thứ tự + hình + chữ cái bị xáo + dòng chấm viết đáp án.
- Từ nhiều cụm như `ice cream`: xáo từng cụm riêng, không trộn lẫn thành một từ.

### B. Nối hình–từ (Matching)

- Cột trái: số + hình, giữ theo thứ tự 1, 2, 3...
- Cột phải: A, B, C... + từ tiếng Anh, bị trộn thứ tự.
- Có khoảng trống giữa hai cột cho học sinh kẻ đường nối.
- Đáp án riêng: `1-C, 2-A, 3-B...`
- Tùy chọn thêm 0–3 từ thừa để tăng độ khó.

### C. Nhìn hình viết từ (Look and Write)

- Số + hình + một dòng trống.
- Không có gợi ý chữ cái.

**Điểm cần duyệt:** Anh gửi ảnh dạng Matching muốn giống theo. Em sẽ làm một ảnh PDF mẫu cho anh duyệt bố cục trước khi làm toàn bộ web.

---

## 5. Nền tảng và cấu trúc đề xuất

### Nền tảng: Web app GitHub Pages

**Lý do:** anh chỉ cần mở link, chọn hai file và tải đề; không phải vào Colab, chạy ô mã hay cài phần mềm. GitHub Pages miễn phí và phù hợp vì đề được tạo ngay trên thiết bị đang mở web.

### Công nghệ

- HTML/CSS/JavaScript thuần: nhẹ, ít hỏng, dễ bảo trì.
- SheetJS: đọc Excel ngay trên trình duyệt.
- JSZip: đọc file ZIP ảnh.
- pdf-lib hoặc jsPDF: tạo PDF A4/A5.
- Vitest: kiểm tra phần xếp câu, xáo đáp án, phân trang.

### Cấu trúc dự kiến

```text
worksheet-generator/
├── index.html                    Trang thao tác chính
├── assets/
│   ├── css/style.css             Giao diện
│   └── js/
│       ├── app.js                Điều phối nút bấm và luồng tạo đề
│       ├── data-parser.js        Đọc Excel/ZIP và báo lỗi dữ liệu
│       ├── validation.js         Quy tắc kiểm tra dữ liệu
│       ├── pdf-export.js         Cài đặt giấy, tải PDF
│       └── generators/
│           ├── unscramble.js     Tạo dữ liệu/bố cục xáo chữ
│           ├── matching.js       Tạo cặp và đáp án Matching
│           └── look-write.js     Tạo nhìn hình viết từ
├── tests/                        Kiểm tra tự động phần logic
├── examples/                     Excel + ảnh minh họa, không có dữ liệu thật
├── README.md                     Hướng dẫn sử dụng bằng tiếng Việt
├── plan.md                       Kế hoạch này
└── task.md                       Danh sách việc và tình trạng
```

---

## 6. Các đợt thực hiện

### Đợt 0 — Chốt mẫu (không lập trình chức năng)

**Mục tiêu:** Không làm sai mẫu anh muốn in.

1. Anh gửi ảnh Matching mẫu và một bộ Excel + ZIP thật khoảng 10–20 từ (có thể là dữ liệu không nhạy cảm).
2. Em kiểm tra cấu trúc dữ liệu, tên ảnh, kích thước ảnh và số câu/trang phù hợp.
3. Em tạo **một PDF nháp Matching** giống mẫu để anh xem.
4. Anh duyệt: kiểu nối, khổ A4/A5, số cặp/trang, có cần nghĩa Việt/từ thừa không.

**Xong khi:** anh nhắn duyệt PDF mẫu.

### Đợt 1 — Chuẩn hóa phần tạo đề từ notebook

**Mục tiêu:** Bảo toàn Unscramble hiện có nhưng sẵn sàng thêm dạng mới.

1. Tách đọc Excel thành một phần dùng chung.
2. Tách kiểm tra/tìm ảnh ZIP thành một phần dùng chung.
3. Tách phần vẽ PDF xáo chữ thành hàm riêng.
4. Kiểm tra các trường hợp: thiếu ảnh, số trùng, từ 1 chữ cái, từ rất dài, nhiều hơn 1 trang.
5. So sánh PDF mới với PDF từ notebook cũ trên cùng dữ liệu.

**Xong khi:** xuất PDF xáo chữ đầy đủ và cảnh báo rõ lỗi dữ liệu.

### Đợt 2 — Matching và đáp án

**Mục tiêu:** Tạo đề Matching đúng cặp và PDF đáp án không sai.

1. Tạo danh sách cặp trên từng trang.
2. Trộn riêng cột đáp án chữ cái.
3. Ghi lại liên kết số–chữ cái ngay lúc trộn để tạo đáp án chính xác.
4. Vẽ trang Matching theo PDF mẫu đã duyệt.
5. Tạo PDF đáp án tách riêng.
6. Kiểm tra 1, 6, 10, 11 và 25 từ; kiểm tra trang cuối không bị mất/lặp câu.

**Xong khi:** đối chiếu thủ công 3 lần chạy khác nhau đều đúng từng cặp.

### Đợt 3 — Look and Write + nhiều mã đề

**Mục tiêu:** Hoàn thiện bộ ba dạng cơ bản và đa dạng đề.

1. Tạo bố cục hình + dòng trống.
2. Thêm số lượng mã đề (mặc định 1; tối đa dựa theo số từ).
3. Mỗi mã trộn thứ tự câu, Matching cũng trộn thứ tự đáp án.
4. Đặt tên file rõ: `De-Noi-cap-Ma-1.pdf`, `Dap-an-Ma-1.pdf`.

**Xong khi:** tạo được tối thiểu 3 mã đề khác nhau nhưng cùng bộ từ.

### Đợt 4 — Làm web app dễ dùng

**Mục tiêu:** Thay thế thao tác Colab bằng nút bấm.

1. Làm màn hình nhập file và xem trước dữ liệu.
2. Làm khu chọn dạng đề và cài đặt bằng tiếng Việt dễ hiểu.
3. Hiện lỗi ngay trước khi cho bấm tạo PDF.
4. Nút hành động rõ: **📥 Chọn**, **🔍 Kiểm tra**, **📄 Tạo và tải đề**.
5. Chuyển toàn bộ logic đã kiểm tra ở Đợt 1–3 sang trình duyệt.
6. Thử Chrome trên máy tính và Safari/Chrome điện thoại nếu có thể.

**Xong khi:** người chưa từng dùng Colab tạo được đề chỉ qua các nút bấm.

### Đợt 5 — Đưa lên GitHub Pages và bàn giao

1. Tạo repo GitHub riêng cho ứng dụng.
2. Đưa mã nguồn và dữ liệu ví dụ vô danh lên repo.
3. Bật GitHub Pages, mở link thật để tạo PDF thử.
4. Viết hướng dẫn có ảnh: chuẩn bị Excel, nén ảnh, tạo đề, xử lý lỗi thường gặp.
5. Anh thử tạo một đề thực tế từ link.
6. Sửa các lỗi hiển thị/in nếu có trước khi chốt.

**Xong khi:** link hoạt động và anh tạo được ít nhất 1 đề thật từ đầu đến cuối.

---

## 7. Kiểm tra bắt buộc

- Không mất từ, không lặp từ trong cùng mã đề.
- Matching: mỗi hình chỉ có đúng một từ; đáp án lưu đúng theo thứ tự đã trộn.
- Từ nhiều cụm giữ khoảng cách đúng.
- Ảnh có tỷ lệ ngang/dọc đều vừa khung, không méo.
- Không tạo trang trắng khi số câu không chia hết số câu/trang.
- PDF mở được và in thử ở tỷ lệ 100% trên A4/A5.
- Không đưa Excel/ảnh/tên học sinh thật lên GitHub.

---

## 8. Rủi ro và cách xử lý

- **Bố cục Matching chưa đúng ý anh:** luôn duyệt PDF nháp trước khi viết phần web.
- **Máy in cắt sát mép:** có lựa chọn lề và khuyến nghị in 100%, không chọn “Fit to page”.
- **Ảnh ZIP quá nặng:** báo dung lượng và hướng dẫn dùng ảnh JPG/PNG vừa phải; đợt sau mới thêm giảm ảnh tự động nếu thật sự cần.
- **Từ dài tràn dòng:** ưu tiên giảm khoảng cách giữa chữ cái, sau đó giảm cỡ chữ trong giới hạn; vẫn không vừa thì báo tên từ.
- **Trình duyệt chặn tải nhiều file:** có lựa chọn tải gộp một ZIP ở đợt mở rộng nếu gặp thực tế.

---

## 9. Việc cần anh duyệt ngay

1. Làm theo thứ tự: **Matching hình–từ → Look and Write → web app GitHub Pages**.
2. Matching mặc định: ảnh bên trái, từ tiếng Anh bị trộn bên phải, có PDF đáp án riêng.
3. Đợt đầu gồm đúng 3 dạng: Xáo chữ, Matching, Nhìn hình viết từ.
4. Làm bản PDF mẫu để anh duyệt trước khi triển khai toàn bộ.
5. Repo đề xuất: `Aliuliu001/worksheet-generator`.
