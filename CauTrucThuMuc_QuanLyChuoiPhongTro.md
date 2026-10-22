# CẤU TRÚC THƯ MỤC DỰ ÁN — HỆ THỐNG QUẢN LÝ CHUỖI PHÒNG TRỌ

**Nhóm 07 - SpiderMan | Đề tài 08**
**Kiến trúc:** Polyrepo (2 repo riêng: Backend & Frontend)
**Backend:** Node.js + Express.js (Layered Architecture: Routes → Controllers → Services → Models/Repositories)
**Frontend:** HTML + CSS + JavaScript thuần (module hóa theo nghiệp vụ)

---

## 1. REPO BACKEND: `phong-tro-backend`

```
phong-tro-backend/
├── src/
│   ├── config/                      # Cấu hình hệ thống
│   │   ├── database.js              # Kết nối DB (MySQL/PostgreSQL/MongoDB)
│   │   ├── env.js                   # Đọc & validate biến môi trường
│   │   └── constants.js             # Hằng số dùng chung (trạng thái phòng, đơn giá mặc định...)
│   │
│   ├── routes/                      # Định nghĩa endpoint, map tới controller
│   │   ├── index.js                 # Gộp toàn bộ router con
│   │   ├── auth.routes.js
│   │   ├── canTro.routes.js         # UC02
│   │   ├── phong.routes.js          # UC03
│   │   ├── khachThue.routes.js      # UC04
│   │   ├── coc.routes.js            # UC05
│   │   ├── hopDong.routes.js        # UC06, UC21 (gia hạn), UC22 (trả phòng)
│   │   ├── dienNuoc.routes.js       # UC07, UC19
│   │   ├── tienPhong.routes.js      # UC08
│   │   ├── thanhToan.routes.js      # UC09
│   │   ├── congNo.routes.js         # UC10
│   │   ├── thuChi.routes.js         # UC11
│   │   ├── suCo.routes.js           # UC12
│   │   ├── traPhong.routes.js       # UC13
│   │   ├── baoCao.routes.js         # UC14
│   │   └── thongBao.routes.js       # UC15
│   │
│   ├── controllers/                 # Nhận request, gọi service, trả response
│   │   ├── auth.controller.js
│   │   ├── canTro.controller.js
│   │   ├── phong.controller.js
│   │   ├── khachThue.controller.js
│   │   ├── coc.controller.js
│   │   ├── hopDong.controller.js
│   │   ├── dienNuoc.controller.js
│   │   ├── tienPhong.controller.js
│   │   ├── thanhToan.controller.js
│   │   ├── congNo.controller.js
│   │   ├── thuChi.controller.js
│   │   ├── suCo.controller.js
│   │   ├── traPhong.controller.js
│   │   ├── baoCao.controller.js
│   │   └── thongBao.controller.js
│   │
│   ├── services/                    # Xử lý logic nghiệp vụ chính (BR-01 → BR-21)
│   │   ├── auth.service.js
│   │   ├── canTro.service.js
│   │   ├── phong.service.js
│   │   ├── khachThue.service.js
│   │   ├── coc.service.js            # xử lý hết hạn giữ phòng, liên kết hợp đồng
│   │   ├── hopDong.service.js        # gia hạn, bàn giao hợp đồng, cảnh báo hết hạn
│   │   ├── dienNuoc.service.js       # tính lượng dùng, xác nhận chỉ số
│   │   ├── tienPhong.service.js      # công thức tính khoản phải thu (BR-03)
│   │   ├── thanhToan.service.js
│   │   ├── congNo.service.js         # cộng dồn công nợ (BR-20)
│   │   ├── thuChi.service.js
│   │   ├── suCo.service.js
│   │   ├── traPhong.service.js       # BR-06: trình tự trả phòng
│   │   ├── baoCao.service.js         # tính lợi nhuận (BR-08)
│   │   └── thongBao.service.js
│   │
│   ├── models/                      # Định nghĩa schema / entity (ORM: Sequelize, Prisma, Mongoose...)
│   │   ├── index.js                 # khởi tạo & liên kết các model (associations)
│   │   ├── User.model.js            # tài khoản chung (Chủ trọ / Khách thuê)
│   │   ├── CanTro.model.js
│   │   ├── Phong.model.js
│   │   ├── NoiThat.model.js
│   │   ├── KhachThue.model.js
│   │   ├── DatCoc.model.js
│   │   ├── HopDong.model.js
│   │   ├── ChiSoDienNuoc.model.js
│   │   ├── DonGia.model.js          # lịch sử đơn giá (BR-11)
│   │   ├── KhoanPhaiThu.model.js
│   │   ├── ThanhToan.model.js
│   │   ├── ThuChi.model.js
│   │   ├── SuCo.model.js
│   │   ├── TraPhong.model.js
│   │   └── ThongBao.model.js
│   │
│   ├── repositories/                # (Tùy chọn) Tách truy vấn DB khỏi service - giúp test dễ hơn
│   │   ├── phong.repository.js
│   │   ├── hopDong.repository.js
│   │   └── ...
│   │
│   ├── middlewares/                 # Middleware dùng chung
│   │   ├── auth.middleware.js       # xác thực JWT
│   │   ├── role.middleware.js       # phân quyền Chủ trọ / Khách thuê (BR-12, BR-13, BR-14)
│   │   ├── errorHandler.middleware.js
│   │   ├── validate.middleware.js   # chạy schema validate (Joi/Zod)
│   │   └── upload.middleware.js     # multer - upload ảnh minh chứng chỉ số điện (BR-04)
│   │
│   ├── validators/                  # Schema kiểm tra dữ liệu đầu vào
│   │   ├── phong.validator.js
│   │   ├── hopDong.validator.js
│   │   ├── dienNuoc.validator.js
│   │   └── ...
│   │
│   ├── utils/                       # Hàm tiện ích dùng chung
│   │   ├── logger.js
│   │   ├── responseFormatter.js     # chuẩn hóa response JSON {success, data, message}
│   │   ├── dateHelper.js            # xử lý ngày 01, 05, 10 hàng tháng
│   │   ├── calculator.js            # công thức tính tiền (BR-03, BR-08)
│   │   └── cronJobs.js              # job tự động: cảnh báo hết hạn HĐ, tạo khoản phải thu ngày 01
│   │
│   ├── jobs/                        # Scheduled tasks (node-cron)
│   │   ├── canhBaoHetHanHopDong.job.js   # BR-02
│   │   ├── taoKhoanPhaiThu.job.js        # ngày 01 hàng tháng
│   │   └── kiemTraQuaHanGiuPhong.job.js  # BR-05
│   │
│   ├── app.js                       # Khởi tạo Express app, gắn middleware & route
│   └── server.js                    # Điểm khởi chạy (listen port)
│
├── tests/                           # Unit test & integration test
│   ├── unit/
│   │   ├── services/
│   │   └── utils/
│   └── integration/
│       └── routes/
│
├── docs/                            # Tài liệu API (Swagger/Postman collection)
│   ├── swagger.yaml
    ├── API_Spec_QuanLyChuoiPhongTro.md
│   └── postman_collection.json
│
├── migrations/                      # Migration DB (nếu dùng Sequelize/Knex)
├── seeders/                         # Dữ liệu mẫu (seed data) để test
├── uploads/                         # Lưu tạm file ảnh minh chứng điện nước (nếu không dùng cloud storage)
│
├── .env.example                     # Mẫu biến môi trường (không commit .env thật)
├── .gitignore
├── .eslintrc.json
├── .prettierrc
├── package.json
├── README.md
└── docker-compose.yml               # (tùy chọn) chạy DB + backend bằng Docker
```

### Giải thích luồng xử lý 1 request (Backend)

```
Client → routes/ → middlewares/ (auth, validate) → controllers/
       → services/ (logic nghiệp vụ + BR) → models/ hoặc repositories/ (DB)
       → trả JSON response chuẩn hóa (utils/responseFormatter.js)
```

---

## 2. REPO FRONTEND: `phong-tro-frontend`

```
phong-tro-frontend/
├── public/
│   └── favicon.ico
│
├── assets/
│   ├── css/
│   │   ├── base/
│   │   │   ├── reset.css
│   │   │   ├── variables.css        # biến màu, font dùng chung
│   │   │   └── typography.css
│   │   ├── components/              # CSS cho từng component tái sử dụng
│   │   │   ├── sidebar.css
│   │   │   ├── navbar.css
│   │   │   ├── table.css
│   │   │   ├── modal.css
│   │   │   ├── card.css
│   │   │   └── button.css
│   │   └── pages/                   # CSS riêng cho từng trang
│   │       ├── dashboard.css
│   │       ├── phong.css
│   │       └── hopDong.css
│   │
│   ├── js/
│   │   ├── config/
│   │   │   └── apiConfig.js         # BASE_URL của backend API
│   │   │
│   │   ├── services/                # Lớp gọi API (fetch/axios) — tách biệt khỏi UI
│   │   │   ├── authService.js
│   │   │   ├── canTroService.js
│   │   │   ├── phongService.js
│   │   │   ├── khachThueService.js
│   │   │   ├── cocService.js
│   │   │   ├── hopDongService.js
│   │   │   ├── dienNuocService.js
│   │   │   ├── tienPhongService.js
│   │   │   ├── thanhToanService.js
│   │   │   ├── congNoService.js
│   │   │   ├── thuChiService.js
│   │   │   ├── suCoService.js
│   │   │   ├── traPhongService.js
│   │   │   ├── baoCaoService.js
│   │   │   └── thongBaoService.js
│   │   │
│   │   ├── components/              # Các thành phần UI dùng chung (render bằng JS)
│   │   │   ├── sidebar.js
│   │   │   ├── navbar.js
│   │   │   ├── dataTable.js         # component bảng có phân trang, filter
│   │   │   ├── modal.js
│   │   │   ├── toast.js             # thông báo popup thành công/lỗi
│   │   │   └── pagination.js
│   │   │
│   │   ├── pages/                   # Logic xử lý riêng cho từng trang (1 file JS / 1 trang HTML)
│   │   │   ├── login.page.js
│   │   │   ├── dashboard.page.js
│   │   │   ├── canTro.page.js
│   │   │   ├── phong.page.js
│   │   │   ├── khachThue.page.js
│   │   │   ├── coc.page.js
│   │   │   ├── hopDong.page.js
│   │   │   ├── dienNuoc.page.js
│   │   │   ├── tienPhong.page.js
│   │   │   ├── thanhToan.page.js
│   │   │   ├── congNo.page.js
│   │   │   ├── thuChi.page.js
│   │   │   ├── suCo.page.js
│   │   │   ├── traPhong.page.js
│   │   │   ├── baoCao.page.js
│   │   │   ├── thongBao.page.js
│   │   │   └── khachThue/           # Các trang riêng cho actor Khách thuê
│   │   │       ├── thongTinThue.page.js      # UC16
│   │   │       ├── tienPhaiTra.page.js       # UC17
│   │   │       ├── nhapChiSoDien.page.js     # UC19
│   │   │       ├── yeuCauGiaHan.page.js      # UC21
│   │   │       └── yeuCauTraPhong.page.js    # UC22
│   │   │
│   │   └── utils/
│   │       ├── auth.util.js         # lưu/đọc token trong localStorage
│   │       ├── validate.util.js     # validate form phía client
│   │       ├── format.util.js       # format tiền tệ, ngày tháng
│   │       └── httpClient.js        # wrapper fetch xử lý header, lỗi chung
│   │
│   └── images/
│       ├── logo.png
│       └── icons/
│
├── pages/                           # Các trang HTML (multi-page app - MPA)
│   ├── login.html
│   ├── dashboard.html
│   ├── can-tro.html
│   ├── phong.html
│   ├── khach-thue.html
│   ├── coc.html
│   ├── hop-dong.html
│   ├── dien-nuoc.html
│   ├── tien-phong.html
│   ├── thanh-toan.html
│   ├── cong-no.html
│   ├── thu-chi.html
│   ├── su-co.html
│   ├── tra-phong.html
│   ├── bao-cao.html
│   ├── thong-bao.html
│   └── khach-thue/                  # Giao diện dành riêng cho Khách thuê
│       ├── thong-tin-thue.html
│       ├── tien-phai-tra.html
│       ├── nhap-chi-so-dien.html
│       ├── yeu-cau-gia-han.html
│       └── yeu-cau-tra-phong.html
│
├── components/                      # HTML fragment tái sử dụng (nạp bằng JS include/fetch)
│   ├── sidebar.html
│   ├── navbar.html
│   └── footer.html
│
├── index.html                       # Trang gốc / redirect tới login hoặc dashboard
├── .gitignore
├── README.md
└── package.json                     # (nếu dùng live-server / bundler nhẹ như Vite cho dev)
```

---

## 3. Quy ước đặt tên & nguyên tắc tổ chức

| Hạng mục                     | Quy ước                                                                        |
| ---------------------------- | ------------------------------------------------------------------------------ |
| Tên file JS/route/controller | camelCase, hậu tố rõ vai trò: `.controller.js`, `.service.js`, `.routes.js`    |
| Tên bảng/model DB            | PascalCase số ít: `Phong`, `HopDong`, `KhoanPhaiThu`                           |
| Nhánh Git                    | `feature/ten-chuc-nang`, `fix/loi-gi-do`, `main`/`develop`                     |
| Biến môi trường              | Không commit `.env`, chỉ commit `.env.example`                                 |
| Mỗi module nghiệp vụ         | Có đủ 4 lớp: route → controller → service → model, tương ứng 1 UC trong đặc tả |

## 4. Vì sao tách theo lớp (layered) thay vì gộp chung?

- **routes/controllers/services/models** tách biệt giúp: dễ viết unit test cho `services/` (nơi chứa toàn bộ Business Rule BR-01→BR-21) mà không cần khởi động server.
- Khi giảng viên yêu cầu chỉnh sửa 1 nghiệp vụ (VD: đổi công thức BR-03), bạn chỉ sửa đúng 1 file trong `services/`, không đụng vào route hay controller.
- `jobs/` tách riêng vì hệ thống có nhiều nghiệp vụ chạy tự động theo lịch (ngày 01, 05, 10 hàng tháng, cảnh báo hết hạn hợp đồng) — đúng với BR-02, BR-03, BR-05.

---

_Tài liệu này dùng làm chuẩn cấu trúc khi cả nhóm cùng code, tránh xung đột thư mục khi merge Git._
