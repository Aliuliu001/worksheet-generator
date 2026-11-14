# Tạo thẻ hình để cắt dán vào vở

Trang web này thay cho Colab: tạo PDF thẻ hình hoặc phiếu Typing để in. Với Typing 2/3, có thể tải Excel hai cột hoặc dán trực tiếp English/Viet; ZIP ảnh chỉ cần cho các dạng có hình. File của người dùng chỉ được đọc trên trình duyệt; không được tải lên máy chủ.

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

## Lề khi in

- **Matching 1, Typing 1, Typing 2:** lề nội dung trái/trên 10 mm, phải/dưới 5 mm.
- **Matching 2:** lề trái 7 mm, phải 3,2 mm để mở rộng đồng thời toàn bộ vùng hình và ba cột prompt; tỷ lệ cột 30% / 33% / 37%.
- **Flashcards, Anagram:** giữ lề 3 mm theo bố cục cũ.
- **Typing 1: Nhìn hình viết chữ** in 28 câu/A5 (14 câu mỗi cột); ảnh cách số 2 mm, sau ảnh là dòng viết hạ 2,8 mm so với baseline cũ để chữ học sinh cân với hình.
- **Typing 2: Cho tiếng Việt, viết tiếng Anh** và **Typing 3: Cho tiếng Anh, viết tiếng Việt** dùng A4 ngang. Mỗi tờ có hai bảng 60 dòng giống nhau đặt cạnh nhau như form dò từ; dòng có dấu tiếng Việt dùng font Unicode riêng để in đúng dấu.

## Font

Trang đã chứa sẵn hai font anh cung cấp:

- `KGPrimaryPenmanshipAlt.ttf`: font chữ mẫu đang dùng trên thẻ.
- `KGPrimaryDots.ttf`: đã lưu sẵn để dùng cho các mẫu có chữ chấm ở đợt sau.

Không cần tải font lên mỗi lần như Colab.

## File ví dụ

Trong thư mục `examples/` có `Input_File_mau.xlsx` và `Images_mau.zip` để thử nhanh.

## Lưu ý riêng tư

Excel và ảnh được xử lý trực tiếp trên trình duyệt đang mở trang. Đừng đưa Excel hoặc ảnh học sinh thật lên GitHub.
