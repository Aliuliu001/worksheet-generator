# Kế hoạch — Bộ tạo thẻ hình và phiếu bài tập tiếng Anh

**Trạng thái:** Hoàn thiện phần thẻ hình A5 trước. Phase 2–4 chưa triển khai và chỉ bắt đầu lại sau khi anh duyệt bản thẻ hình hiện tại.

## Mục tiêu đang thực hiện

Từ Excel và ZIP ảnh, tạo PDF **A5 dọc**, 6 cột × 7 hàng để in/cắt/dán. Mọi xử lý diễn ra trên trình duyệt, không tải Excel/ảnh lên máy chủ.

## Dữ liệu đầu vào đã chốt

Excel gồm đúng 4 cột:

| STT | English | Viet | ID_Anh |
| ---: | --- | --- | ---: |
| 1 | drive cars | lái xe | 60 |

- `ID_Anh` chỉ là số, không ghi đuôi ảnh.
- ZIP có ảnh mang số tương ứng: `60.png`, `60.jpg`, `60.webp`, `60.gif`… đều được nhận.
- Người dùng có thể sửa trực tiếp `English`, `Viet`, `ID_Anh` ở bảng Kiểm tra dữ liệu trước khi xem/tạo PDF. Giá trị sửa chỉ áp dụng trong lần mở trang hiện tại.

## Bản thẻ hình hiện tại

- A5 dọc, 6 cột × 7 hàng, lề PDF 1 mm.
- Mỗi cột tối đa 7 thẻ.
- Một set luôn chiếm số cột nguyên vẹn: 1–7 từ = 1 cột; 8–14 = 2 cột; 15–21 = 3 cột; 22–28 = 4 cột; 29–35 = 5 cột; 36–42 = 6 cột.
- Set tiếp theo bắt đầu ở cột mới; không lấp vào các ô trống cuối cột của set trước.
- Số set/tờ A5: 1–7 từ = 6 set; 8–14 = 3 set; 15–21 = 2 set; 22–42 = 1 set.
- Hơn 42 từ: cùng một set tự sang tờ A5 tiếp theo.
- Ảnh xem trước trên web rộng 120 px, cao 72 px; không làm thay đổi ảnh in.
- Nhãn dài tự thu nhỏ ngang nhưng giữ cùng một hàng dọc với nhãn ngắn; vùng dành cho chữ cố định, ảnh nằm bên dưới.

## Checklist hoàn thiện thẻ hình

- [x] Kéo thả Excel/ZIP, hiển thị tên và dung lượng file.
- [x] Tải form Excel mẫu 4 cột.
- [x] Nhận ID ảnh dạng số và tự nhận các đuôi ảnh phổ biến.
- [x] Bỏ qua header khi đếm từ; cảnh báo dòng thiếu ảnh.
- [x] Bảng xem trước có thumbnail và cho sửa English/Viet/ID_Anh.
- [x] Xem trước toàn bộ trang PDF bằng canvas.
- [x] Xếp tự động set theo số từ và không lẫn set ở cột thiếu.
- [x] A5 dọc 6 cột × 7 hàng, lề 1 mm.
- [x] Căn cùng hàng cho nhãn ngắn và nhãn dài.
- [ ] Anh kiểm tra bản in thật trên máy in và duyệt bố cục.
- [ ] Bật GitHub Pages, kiểm tra link công khai sau khi phần thẻ hình được duyệt.

---

## Phase 2 — Tạm ngưng: 3 dạng bài

Bắt đầu lại sau khi thẻ hình được duyệt.

1. **Anagram:** số + hình + chữ cái xáo theo từng cụm từ + dòng chấm trả lời. Bố cục theo notebook/ảnh mẫu anh đã gửi.
2. **Matching:** hình bên trái, từ tiếng Anh trộn bên phải, không có từ dư, có PDF đáp án riêng.
3. **Typing:** hình + dòng trống để học sinh tự viết từ.

## Phase 3 — Tạm ngưng: mã đề và xuất gộp

- Nhiều mã đề: trộn câu/đáp án theo từng mã.
- Dạng Việt → Anh dùng cột `Viet`.
- Xuất tất cả PDF trong một ZIP.

## Phase 4 — Tạm ngưng: trải nghiệm và bàn giao

- Thanh tiến độ rõ ràng khi tạo PDF.
- Hướng dẫn/FAQ và kiểm tra Chrome, Edge, Firefox, Safari, điện thoại.
- Hoàn tất GitHub Pages và hướng dẫn sử dụng.

## Kiểm tra bắt buộc khi mở lại các phase

- Không mất/lặp từ trong mỗi đề.
- Ảnh, canvas preview, PDF dùng cùng một ID ảnh.
- Nhãn dài không tràn hoặc lệch hàng.
- PDF đúng số trang, mở/in được 100%.
- Không đưa Excel/ảnh thật của học sinh lên GitHub.
