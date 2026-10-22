Vai trò: Bạn là backend developer, hỗ trợ tôi xây dựng backend cho dự án "Hệ thống quản lý chuỗi phòng trọ" (Nhóm 07 - SpiderMan, Đề tài 08).

BỐI CẢNH:

- Frontend đã hoàn thành (HTML/CSS/JS thuần), đang gọi API tới backend.
- Trước khi code, hãy đọc kỹ các file sau trong thư mục dự án để nắm đầy đủ ngữ cảnh:
  1. README.md — mô tả tổng quan dự án
  2. README1.md — mô tả chi tiết cấu trúc backend cần xây (bám sát 100% cấu trúc này, không tự ý đổi tên thư mục/file)
  3. database.md — thiết kế schema database (bảng, cột, khóa chính/ngoại, quan hệ)
  4. Tài liệu đặc tả yêu cầu (Chương 1: Phân tích yêu cầu) — chứa mô tả quy trình nghiệp vụ, quy tắc nghiệp vụ BR-01 → BR-21, yêu cầu chức năng UC01-UC22
  5. Tài liệu đặc tả Use Case chi tiết (UC02 → UC22) — dùng làm căn cứ thiết kế API endpoint, luồng xử lý, validate, exception flow

YÊU CẦU KỸ THUẬT:

- Kiến trúc: Polyrepo — backend là repo riêng "phong-tro-backend"
- Stack: Node.js + Express.js
- Kiến trúc phân lớp (Layered Architecture): Routes → Controllers → Services → Models/Repositories
- Database: MySQL
  - host: localhost
  - database: ql_phong_tro
  - user: tuan
  - password: 12345
- ORM: dùng Sequelize (hoặc mysql2 nếu bạn thấy phù hợp hơn — nêu rõ lý do trước khi chọn)
- Response chuẩn hóa dạng: { success, data, message }
- Xác thực: JWT, middleware phân quyền Chủ trọ / Khách thuê (theo BR-12, BR-13, BR-14)

YÊU CẦU THỰC HIỆN:

1. Tạo đầy đủ cấu trúc thư mục "phong-tro-backend" đúng như mô tả trong README1.md (bao gồm src/config, routes, controllers, services, models,...).
2. Tạo file kết nối DB (src/config/database.js) dùng thông tin kết nối MySQL ở trên, đọc qua biến môi trường (.env), kèm .env.example.
3. Dựa vào database.md, tạo models cho toàn bộ entity (User, CanTro, Phong, NoiThat, KhachThue, DatCoc, HopDong, ChiSoDienNuoc, DonGia, KhoanPhaiThu, ThanhToan, ThuChi, SuCo, TraPhong, ThongBao...) kèm định nghĩa quan hệ (associations) trong models/index.js.
4. Xây dựng lần lượt các module theo từng Use Case (UC02 → UC22), mỗi module có đủ 4 lớp route → controller → service → model, áp dụng đúng Basic Flow / Alternative Flow / Exception Flow đã mô tả trong đặc tả Use Case (ví dụ: UC08 phải áp dụng công thức BR-03, UC05 phải xử lý quá hạn giữ phòng theo BR-05, UC13 phải theo trình tự BR-06...).
5. Áp dụng các Business Rule (BR-01 → BR-21) trong tầng services, đặc biệt lưu ý:
   - BR-03: công thức tính khoản phải thu
   - BR-05: xử lý quá hạn giữ phòng
   - BR-06: trình tự trả phòng
   - BR-10: luồng trạng thái phòng (Trống → Đã giữ → Đang thuê → Đang xử lý trả phòng → Trống)
   - BR-11: lưu lịch sử đơn giá, không ảnh hưởng hóa đơn cũ
   - BR-16, BR-17: chuyển phòng và bàn giao hợp đồng
   - BR-18: khóa tài khoản thay vì xóa khi khách trả phòng
6. Thêm middleware xác thực JWT + phân quyền theo actor (Chủ trọ / Khách thuê).
7. Viết validators cho từng module bằng Joi hoặc Zod.
8. Tạo jobs (node-cron) cho: cảnh báo hết hạn hợp đồng (BR-02), tạo khoản phải thu ngày 01 hàng tháng, kiểm tra quá hạn giữ phòng (BR-05).
9. Sau khi tạo xong toàn bộ cấu trúc, chạy thử kết nối DB để xác nhận không lỗi, rồi seed vài dữ liệu mẫu để test nhanh các API chính (đăng nhập, tạo phòng, lập hợp đồng, tính tiền phòng).

LƯU Ý:

- Nếu README1.md hoặc database.md có phần nào chưa rõ hoặc mâu thuẫn với đặc tả yêu cầu, hãy hỏi lại tôi trước khi code thay vì tự suy đoán.
- Ưu tiên code từng module một, sau mỗi module tóm tắt lại các endpoint đã tạo (method, path, mô tả) để tôi review trước khi sang module tiếp theo.
