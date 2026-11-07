# Tạo thẻ hình để cắt dán vào vở

Trang web này thay cho Colab: chọn **1 file Excel** và **1 file ZIP ảnh**, sau đó tải về PDF thẻ hình để in/cắt/dán. File của người dùng chỉ được đọc trên trình duyệt; không được tải lên máy chủ.

## Dùng như thế nào

1. Mở đường link web.
2. Bấm **📗 Chọn file Excel**.
3. Bấm **🖼️ Chọn file ZIP chứa ảnh**.
4. Bấm **🔍 Kiểm tra file**. Danh sách sẽ báo ảnh nào còn thiếu.
5. Chọn khổ giấy, số cột, số hình mỗi cột và số bộ cần in.
6. Bấm **📄 Tạo và tải PDF thẻ hình**.
7. Khi in, chọn **Actual size / 100%**.

## Chuẩn bị Excel

Bấm **📥 Tải form Excel mẫu** trên trang để có đúng cấu trúc. Dòng đầu tiên bắt buộc có 4 tiêu đề:

| STT | English | Viet | ID_Anh |
| ---: | --- | --- | --- |
| 1 | play with a kitten | chơi với mèo con | 1 |
| 2 | drive cars | lái xe | 2 |

- `STT`: số thứ tự duy nhất.
- `English`: từ/cụm từ in lên thẻ.
- `Viet`: nghĩa tiếng Việt, có thể để trống.
- `ID_Anh`: **chỉ ghi số** (ví dụ `60`), không ghi `.png`, `.jpg` hay phần đuôi khác. Không bắt buộc giống STT.

## Chuẩn bị ZIP ảnh

- Tên ảnh phải là đúng số ở cột `ID_Anh`; ứng dụng tự nhận mọi đuôi. Ví dụ: `60.png`, `61.jpg`, `62.webp`, `63.gif` đều hợp lệ.
- Có thể để ảnh trong thư mục con bên trong ZIP.
- Ảnh thiếu không làm hỏng cả file, nhưng dòng đó sẽ không được xuất.
- Hỗ trợ PNG, JPG, JPEG, WEBP, GIF và BMP.

## Font

Trang đã chứa sẵn hai font anh cung cấp:

- `KGPrimaryPenmanshipAlt.ttf`: font chữ mẫu đang dùng trên thẻ.
- `KGPrimaryDots.ttf`: đã lưu sẵn để dùng cho các mẫu có chữ chấm ở đợt sau.

Không cần tải font lên mỗi lần như Colab.

## File ví dụ

Trong thư mục `examples/` có `Input_File_mau.xlsx` và `Images_mau.zip` để thử nhanh.

## Lưu ý riêng tư

Excel và ảnh được xử lý trực tiếp trên trình duyệt đang mở trang. Đừng đưa Excel hoặc ảnh học sinh thật lên GitHub.
