# Ngữ cảnh triển khai — worksheet-generator

- Trang chạy: https://aliuliu001.github.io/worksheet-generator/ ; mã nguồn ở `assets/js/app.js`, chọn loại phiếu trong `index.html`.
- Input: Excel 4 cột STT, English, Viet, ID_Anh; ZIP ảnh đặt tên theo số ID. Dữ liệu đã sửa ở bảng kiểm tra là nguồn cho Preview và PDF.
- Matching 2: `matching2Plan` giữ mapping ảnh/chữ cái và prompt; `matching2Columns` cấp 3 cột 30/30/40 với gap 2 mm; `fitPromptText` mặc định 15 pt, chỉ co nếu vượt giới hạn. Prompt ngắn ở hai cột đầu, dài ở cột ba. `drawMatching2Preview` và `makeMatching2` dùng plan đó.
- Typing nhìn hình: `TYPING_IMAGE_PER_COL=10`, 20 hình/A5; `typingImageLayout` cấp chung tọa độ cho Preview và PDF. Tiêu đề `Look at the picture and write the word.`. Đường viết nằm bên cạnh ảnh 20 mm; ảnh giữ nguyên tỉ lệ. Nếu cần tăng/giảm số hình trên trang, đổi hằng số này, sau đó thử lại cả canvas và PDF, không sửa một phía.
- Browser fixture `examples/validation/input-31-plus-blanks.xlsx` + `images-31.zip` chứa 31 ô ảnh màu đỏ nhân tạo (đây là ảnh mẫu thực sự, không phải placeholder trong code). Dùng thêm ZIP bài học thật để kiểm tra chất lượng ảnh.
- Khi thay đổi mọi dạng phiếu: kiểm tra tiêu đề tiếng Anh của bài học, font, ảnh, trang cuối, Preview cùng dữ liệu và bố cục PDF; Matching phải đối chiếu đáp án với đúng lượt xáo. Không sửa chéo Flashcards/Anagram/Matching 1/Typing nghĩa Việt khi chưa kiểm tra từng dạng.
- Kiểm tra máy in A5 thực tế và Safari/mobile chưa hoàn tất. Bản deploy cần tăng số `?v=` trong `index.html`, đợi Pages cập nhật và thử link thật; push riêng chưa chứng minh đã live.
