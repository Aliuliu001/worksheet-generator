# Ngữ cảnh triển khai — worksheet-generator

- Trang chạy: https://aliuliu001.github.io/worksheet-generator/ ; mã nguồn ở `assets/js/app.js`, chọn loại phiếu trong `index.html`.
- Input: Excel 4 cột STT, English, Viet, ID_Anh; ZIP ảnh đặt tên theo số ID. Dữ liệu đã sửa ở bảng kiểm tra là nguồn cho Preview và PDF.
- Matching 2: `matching2Plan` giữ mapping ảnh/chữ cái và prompt; `matching2Columns` cấp 3 cột 30/30/40 với gap 2 mm; `fitPromptText` mặc định 15 pt, chỉ co nếu vượt giới hạn. Prompt ngắn ở hai cột đầu, dài ở cột ba. `drawMatching2Preview` và `makeMatching2` dùng plan đó.
- Matching 1/2 và Typing 1/2 dùng lề nội dung trái/trên 10 mm, phải/dưới 5 mm; Flashcards/Anagram giữ lề 3 mm. `WORKSHEET_RIGHT_LIMIT=3.2 mm` chỉ dành cho group Matching 2 có prompt dài (hiện ngưỡng >22 ký tự). Matching 2 có vạch dọc theo dữ liệu: 1–4 prompt không vạch, 5–7 một vạch, 8–10 hai vạch; Preview/PDF đều gọi `matching2ActiveDividers`.
- Typing 1: `TYPING_IMAGE_PER_COL=14`, 28 hình/A5; `typingImageLayout` cấp chung tọa độ cho Preview và PDF. Hình bắt đầu 2 mm sau ô số, tiêu đề `Look at the picture and write the word.`, đường viết nằm bên phải hình và hạ 2 mm qua `TYPING_IMAGE_LINE_DROP`. Nếu cần tăng/giảm số hình, đổi hằng số này rồi thử lại canvas lẫn PDF.
- Browser fixture `examples/validation/input-31-plus-blanks.xlsx` + `images-31.zip` chứa 31 ô ảnh màu đỏ nhân tạo (đây là ảnh mẫu thực sự, không phải placeholder trong code). Dùng thêm ZIP bài học thật để kiểm tra chất lượng ảnh.
- Khi thay đổi mọi dạng phiếu: kiểm tra tiêu đề tiếng Anh của bài học, font, ảnh, trang cuối, Preview cùng dữ liệu và bố cục PDF; Matching phải đối chiếu đáp án với đúng lượt xáo. Không sửa chéo Flashcards/Anagram/Matching 1/Typing nghĩa Việt khi chưa kiểm tra từng dạng.
- Kiểm tra máy in A5 thực tế và Safari/mobile chưa hoàn tất. Bản deploy cần tăng số `?v=` trong `index.html`, đợi Pages cập nhật và thử link thật; push riêng chưa chứng minh đã live.
