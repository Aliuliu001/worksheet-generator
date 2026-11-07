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

Ứng dụng đọc hai kiểu dữ liệu:

- Có dòng tiêu đề: `stt`, `en`, `vi`.
- Không có dòng tiêu đề, theo đúng Colab cũ: cột 1 là tiếng Anh, cột 2 là tiếng Việt, cột 3 là STT.

Ví dụ:

| stt | en | vi |
| --- | --- | --- |
| 1 | play with a kitten | chơi với mèo con |
| 2 | drive cars | lái xe |

## Chuẩn bị ZIP ảnh

- Mỗi ảnh phải có tên trùng số `stt` trong Excel: `1.png`, `2.jpg`, `3.jpeg`.
- Có thể để ảnh trong thư mục con bên trong ZIP.
- Ảnh thiếu không làm hỏng cả file, nhưng thẻ đó sẽ không được xuất.
- Ảnh PNG/JPG/JPEG được hỗ trợ.

## Font

Trang đã chứa sẵn hai font anh cung cấp:

- `KGPrimaryPenmanshipAlt.ttf`: font chữ mẫu đang dùng trên thẻ.
- `KGPrimaryDots.ttf`: đã lưu sẵn để dùng cho các mẫu có chữ chấm ở đợt sau.

Không cần tải font lên mỗi lần như Colab.

## File ví dụ

Trong thư mục `examples/` có `Input_File_mau.xlsx` và `Images_mau.zip` để thử nhanh.

## Lưu ý riêng tư

Excel và ảnh được xử lý trực tiếp trên trình duyệt đang mở trang. Đừng đưa Excel hoặc ảnh học sinh thật lên GitHub.
