# LUỒNG HOẠT ĐỘNG DỰ ÁN QUẢN LÝ CHUỖI PHÒNG TRỌ

> Tài liệu này dành cho thành viên mới hoặc chưa quen code. Hãy đọc phần 1 và 2 trước, sau đó chọn chức năng cần làm ở phần 3.
>
> **Lưu ý quan trọng:** Tài liệu mô tả theo code thực tế hiện có trong repository. Một số tên module từng xuất hiện trong tài liệu thiết kế cũ nhưng chưa có route/controller tương ứng trong code, vì vậy được ghi rõ là “chưa triển khai”.

---

## Mục lục

1. [Tổng quan hệ thống](#1-tổng-quan-hệ-thống)
2. [Cấu trúc thư mục](#2-cấu-trúc-thư-mục-và-vai-trò-từng-filefolder)
3. [Luồng theo chức năng](#3-luồng-hoạt-động-theo-từng-chức-năng)
4. [Luồng chung của một request](#4-luồng-chung-của-một-request)
5. [Cơ sở dữ liệu](#5-cơ-sở-dữ-liệu-mysql)
6. [Phân quyền](#6-phân-quyền-rbac)
7. [Cách chạy dự án](#7-cách-chạy-dự-án)
8. [Cách đọc lỗi và sửa code](#8-cách-đọc-lỗi)
9. [Trạng thái hiện tại](#9-trạng-thái-hiện-tại)

---

# 1. Tổng quan hệ thống

## 1.1. Dự án làm gì?

Đây là hệ thống giúp chủ trọ quản lý nhiều căn/phòng trọ trên một website. Chủ trọ có thể theo dõi phòng, khách thuê, hợp đồng, tiền cọc, hóa đơn, khoản phải thu và chi phí. Khách thuê đăng nhập để xem thông tin phòng, hợp đồng, khoản tiền phải trả, lịch sử thanh toán, thông báo và gửi sự cố. Dữ liệu chính được lưu trong MySQL, không nên lưu cố định trong JavaScript frontend.

Hệ thống có hai phần:

- **Frontend:** các trang HTML mà người dùng nhìn thấy và thao tác.
- **Backend:** server nhận request, kiểm tra đăng nhập/quyền, đọc hoặc ghi MySQL rồi trả JSON cho frontend.

## 1.2. Vai trò người dùng

| Vai trò trong JWT/database | Tên dễ hiểu         | Quyền chính                                                                                                                                  |
| -------------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `CHU_TRO`                  | Chủ trọ/chủ tài sản | Quản lý phòng, căn trọ, khách thuê, hợp đồng, đặt cọc, hóa đơn, thanh toán, thu chi và xem dashboard.                                        |
| `KHACH_THUE`               | Khách thuê          | Chỉ xem dữ liệu của bản thân; xem thông tin thuê, hợp đồng, tiền phải trả, thanh toán, thông báo và gửi sự cố/yêu cầu theo giao diện tenant. |

Quyền không chỉ được kiểm tra ở menu frontend. Backend cũng kiểm tra bằng JWT và trả `403 Forbidden` nếu role không được phép.

## 1.3. Công nghệ

| Thành phần                | Công nghệ                   | Vai trò                                                                                                                               |
| ------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Frontend                  | HTML, CSS, JavaScript thuần | Hiển thị trang, nhận thao tác và gọi API. Đây là MPA, tức mỗi chức năng thường là một file HTML riêng.                                |
| Frontend dev server       | Vite                        | Chạy frontend khi phát triển, thường ở port `4173`.                                                                                   |
| Web server khi dùng XAMPP | Apache                      | Phục vụ các file frontend ở port `80`. Apache không thay thế backend Node.js.                                                         |
| Backend                   | Node.js + Express           | Tạo API, xác thực JWT, phân quyền, gọi service và trả JSON.                                                                           |
| ORM                       | Sequelize                   | Cách JavaScript làm việc với bảng MySQL bằng model.                                                                                   |
| Database                  | MySQL                       | Nơi lưu tài khoản, khách thuê, căn trọ, phòng, hợp đồng, hóa đơn, thanh toán, chi phí và thông báo. Port mặc định hiện tại là `3306`. |
| Kiểm tra dữ liệu          | Joi                         | Kiểm tra dữ liệu đầu vào ở một số endpoint trước khi ghi database.                                                                    |
| Xác thực                  | JWT + bcryptjs              | JWT chứng minh người dùng đã đăng nhập; bcrypt dùng để kiểm tra mật khẩu đã mã hóa.                                                   |

Các port khi chạy local:

```text
Apache frontend: http://localhost/          (port 80)
Vite frontend:   http://localhost:4173/
Backend API:     http://localhost:3001/
MySQL:           localhost:3306
```

---

# 2. Cấu trúc thư mục và vai trò từng file/folder

## 2.1. Cây thư mục thực tế rút gọn

```text
Quan_Ly_Chuoi_Phong_tro/
├── database.md                         # Schema và dữ liệu SQL tham khảo
├── LUONG_HOAT_DONG_DU_AN.md            # Tài liệu luồng hoạt động này
├── phong-tro-backend/
│   ├── package.json                    # Lệnh npm và dependency backend
│   ├── .env                            # Cấu hình MySQL, port, JWT
│   ├── scripts/seed.js                 # Xóa/tạo dữ liệu mẫu bằng Sequelize
│   ├── src/
│   │   ├── app.js                      # Tạo Express app và gắn route
│   │   ├── index.js                    # Đồng bộ DB tùy cấu hình và listen port 3001
│   │   ├── config/
│   │   │   ├── database.js             # Tạo kết nối Sequelize tới MySQL
│   │   │   └── roleAccess.js            # Khai báo role được phép cho từng permission
│   │   ├── middleware/
│   │   │   ├── auth.js                 # Đọc và kiểm tra JWT
│   │   │   ├── authorize.js             # Kiểm tra role/permission, trả 403
│   │   │   └── errorHandler.js          # Chuẩn hóa lỗi backend
│   │   ├── routes/
│   │   │   ├── auth.routes.js           # Login, register, profile
│   │   │   ├── phong.routes.js           # CRUD phòng
│   │   │   ├── hopDong.routes.js         # Hợp đồng và gia hạn
│   │   │   ├── datCoc.routes.js          # Đặt cọc
│   │   │   ├── khoanPhaiThu.routes.js    # Hóa đơn, thanh toán
│   │   │   ├── management.routes.js     # Căn trọ, khách thuê, thu chi
│   │   │   └── tenant.routes.js          # Thông báo và gửi sự cố
│   │   ├── controllers/                 # Nhận request, gọi service/model, trả response
│   │   ├── services/                    # Business logic, kiểm tra dữ liệu liên quan
│   │   ├── models/                      # Mapping model JavaScript với bảng MySQL
│   │   ├── validations/                # Schema Joi cho dữ liệu đầu vào
│   │   ├── utils/                       # Phân trang, tính toán dùng chung
│   │   └── jobs/                        # Tác vụ tự động bằng node-cron
│   └── tests/
│       └── rbac-and-data-checklist.md  # Checklist kiểm tra RBAC và dữ liệu thật
│
└── phong-tro-frontend/
    ├── index.html                       # Cổng đăng nhập chính
    ├── package.json                     # Lệnh Vite
    ├── vite.config.js                   # Port 4173 và proxy /api
    ├── CauTrucThuMuc_QuanLyChuoiPhongTro.md # Tài liệu cây thư mục/RBAC
    ├── components/
    │   ├── sidebar.html                 # Khung menu dùng chung
    │   ├── navbar.html                  # Thanh trên, profile, logout
    │   └── footer.html                  # Chân trang dùng chung
    ├── assets/
    │   ├── css/                         # CSS chung và CSS theo page
    │   └── js/
    │       ├── config/apiConfig.js      # Chọn BASE_URL theo Apache/Vite
    │       ├── services/apiClient.js    # fetch chung, JWT, login/logout
    │       ├── components/              # sidebar.js, navbar.js
    │       ├── pages/                   # JavaScript của từng trang
    │       └── utils/                   # include, format, validate, auth cũ
    └── pages/
        ├── dashboard.html              # Dashboard chủ trọ
        ├── can-tro.html                # Quản lý căn trọ
        ├── phong.html                  # Quản lý phòng
        ├── khach-thue.html             # Quản lý khách thuê
        ├── hop-dong.html               # Quản lý hợp đồng
        ├── thu-chi.html                # Quản lý chi phí
        ├── coc.html                    # Đặt cọc
        ├── cong-no.html                # Công nợ
        ├── thanh-toan.html             # Thanh toán phía chủ trọ
        ├── ...                         # Các page vận hành khác
        └── khach-thue/                 # Page dành cho KHACH_THUE
            ├── thong-tin-thue.html
            ├── tien-phai-tra.html
            ├── thanh-toan.html
            ├── hop-dong.html
            ├── nhap-chi-so-dien.html
            ├── yeu-cau-gia-han.html
            ├── yeu-cau-tra-phong.html
            ├── thong-bao.html
            └── su-co.html
```

## 2.2. Quy tắc đọc code

Một chức năng backend thường đi theo đường đi sau:

```text
HTML page
  -> page.js
  -> window.ApiClient.get/post/put/del()
  -> /api/... route
  -> auth middleware
  -> authorize(permission)
  -> controller
  -> service hoặc model
  -> MySQL
  -> JSON response
  -> page.js render lại HTML
```

Ví dụ: muốn biết trang phòng lấy dữ liệu ở đâu, đọc theo thứ tự:

1. `pages/phong.html`: xem vùng bảng và các script được nạp.
2. `assets/js/pages/phong.page.js`: xem URL API và cách render.
3. `src/routes/phong.routes.js`: xem HTTP method và quyền.
4. `src/controllers/phong.controller.js`: xem controller gọi service nào.
5. `src/services/phong.service.js`: xem Sequelize query.
6. `src/models/PhongTro.js`: xem tên bảng và cột.

---

# 3. Luồng hoạt động theo từng chức năng

> Khuôn mẫu dùng cho mỗi chức năng: **Mục đích → Người dùng → Màn hình → Luồng từng bước → API → Bảng dữ liệu → Kết quả/lưu ý.**

## 3.1. Đăng nhập

### Mục đích

Cho phép chủ trọ hoặc khách thuê nhập tài khoản để nhận JWT và đi đến đúng giao diện.

### Người dùng

`CHU_TRO`, `KHACH_THUE`.

### Màn hình và file

- `phong-tro-frontend/index.html`: form đăng nhập chính khi mở `/`.
- `phong-tro-frontend/pages/login.html`: trang đăng nhập phụ.
- `assets/js/pages/index.page.js` hoặc `login.page.js`: đọc form và gọi login.
- `assets/js/services/apiClient.js`: gửi request, lưu token.

### Luồng từng bước

1. Người dùng mở `http://localhost/` hoặc trang login.
2. Frontend đọc `ten_dang_nhap` và `mat_khau` từ form.
3. `ApiClient.login()` gửi `POST /api/auth/login`.
4. Backend validate bằng Joi.
5. `auth.service.js` tìm tài khoản trong bảng `tai_khoan`.
6. Backend kiểm tra mật khẩu và trạng thái tài khoản.
7. Backend tạo JWT có `ma_tai_khoan`, `vai_tro`, `ma_khach_thue`.
8. Frontend lưu JWT vào `localStorage` với key `trohub_token` và user với key `trohub_user`.
9. `CHU_TRO` được chuyển tới `pages/dashboard.html`.
10. `KHACH_THUE` được chuyển tới `pages/khach-thue/thong-tin-thue.html`.

### API

```text
POST /api/auth/login
GET  /api/auth/profile       (cần Authorization: Bearer <token>)
POST /api/auth/register-khach-thue
```

### Bảng dữ liệu

- `tai_khoan`: username, password, role, trạng thái.
- `khach_thue`: hồ sơ khách thuê gắn qua `ma_khach_thue`.

### Kết quả/lưu ý

- Không lưu password trong frontend.
- Nếu thiếu token, API bảo vệ trả `401`.
- Nếu role không đúng, API trả `403`.
- Khi mở trang gốc, frontend xóa phiên cũ để bắt người dùng đăng nhập lại.

## 3.2. Hiển thị dashboard chủ trọ

### Mục đích

Cho chủ trọ xem nhanh tổng số phòng, phòng trống, phòng đang thuê, doanh thu và các khoản cần chú ý.

### Người dùng

Chỉ `CHU_TRO`.

### Màn hình và file

- `pages/dashboard.html`.
- `assets/js/pages/dashboard.page.js`.
- `components/sidebar.html`, `components/navbar.html`.

### Luồng từng bước

1. Dashboard kiểm tra có JWT hay chưa.
2. Nếu chưa có JWT, chuyển về login.
3. Dashboard gọi song song profile, phòng, hợp đồng sắp hết hạn, hóa đơn và thống kê thanh toán.
4. Backend kiểm tra JWT và permission của từng route.
5. Frontend đếm số phòng theo `trang_thai`.
6. Frontend tính tỷ lệ lấp đầy và tổng thanh toán từ response.
7. Frontend đưa dữ liệu vào stat card, biểu đồ và danh sách.

### API

```text
GET /api/auth/profile
GET /api/phong?limit=100
GET /api/hop-dong/expiring
GET /api/khoan-phai-thu?limit=100
GET /api/khoan-phai-thu/payment/stats?startDate=...&endDate=...
```

### Bảng dữ liệu

`tai_khoan`, `khach_thue`, `phong_tro`, `hop_dong`, `khoan_phai_thu`, `thanh_toan`.

### Kết quả/lưu ý

Dashboard hiện đã lấy dữ liệu từ API/MySQL. Nếu database chỉ có 4 phòng thì không được mong đợi giao diện hiển thị 48 phòng như dữ liệu thiết kế cũ.

## 3.3. Quản lý căn trọ và phòng

### Mục đích

Chủ trọ theo dõi các căn, địa chỉ, phòng thuộc từng căn, giá thuê và trạng thái phòng.

### Người dùng

`CHU_TRO`.

### Màn hình và file

- `pages/can-tro.html`: danh sách căn và phòng thuộc căn.
- `pages/phong.html`: danh sách phòng.
- `assets/js/pages/canTro.page.js`, `phong.page.js`.

### Luồng từng bước

1. Chủ trọ mở trang.
2. Page JS gọi API danh sách.
3. Backend kiểm tra `authMiddleware`, sau đó `authorize("canTro.read")` hoặc `authorize("phong.read")`.
4. Sequelize đọc `can_tro` và `phong_tro`, có thể include quan hệ căn-phòng.
5. Frontend render bảng và thống kê.
6. Khi tạo/sửa/xóa, frontend phải gọi POST/PUT/DELETE; backend kiểm tra dữ liệu và quyền trước khi ghi.

### API

```text
GET    /api/can-tro
POST   /api/can-tro
PUT    /api/can-tro/:id
DELETE /api/can-tro/:id

GET    /api/phong
GET    /api/phong/:id
POST   /api/phong
PUT    /api/phong/:id
DELETE /api/phong/:id
```

### Bảng dữ liệu

- `can_tro`: `ma_can`, `ten_can`, `dia_chi`, `mo_ta`.
- `phong_tro`: `ma_phong`, `ma_can`, `gia_thue`, `trang_thai`, `mo_ta`.

### Kết quả/lưu ý

`khach_thue` không được gọi API quản lý căn/phòng. Backend trả `403`, dù người đó tự gõ URL hoặc dùng Postman.

## 3.4. Quản lý khách thuê

### Mục đích

Chủ trọ xem và quản lý danh sách khách thuê cùng hợp đồng liên quan.

### Người dùng

`CHU_TRO`.

### Màn hình và file

- `pages/khach-thue.html`.
- `assets/js/pages/khachThue.page.js`.
- API quản lý nằm trong `management.routes.js` và `management.controller.js`.

### Luồng từng bước

1. Page gọi `GET /api/khach-thue`.
2. Route đi qua JWT và permission `khachThue.read`.
3. Controller query `KhachThue.findAll()` và include `hopDongs`.
4. Frontend hiển thị họ tên, phòng, mã hợp đồng và trạng thái.
5. Tạo/sửa/xóa dùng các endpoint POST/PUT/DELETE và role `CHU_TRO`.

### API

```text
GET    /api/khach-thue
POST   /api/khach-thue
PUT    /api/khach-thue/:id
DELETE /api/khach-thue/:id
```

### Bảng dữ liệu

`khach_thue`, `hop_dong`, và liên kết tài khoản qua `tai_khoan.ma_khach_thue`.

### Kết quả/lưu ý

Đây là màn hình quản lý của chủ trọ. Khách thuê chỉ xem hồ sơ của chính mình qua `/api/auth/profile`, không xem danh sách tất cả cư dân.

## 3.5. Đặt cọc và giữ phòng

### Mục đích

Ghi nhận tiền cọc, giữ phòng, xác nhận cọc hoặc hủy cọc.

### Người dùng

`CHU_TRO`.

### Màn hình và file

- `pages/coc.html`.
- `assets/js/pages/coc.page.js`.
- `src/routes/datCoc.routes.js`.
- `src/services/datCoc.service.js`.

### Luồng từng bước

1. Chủ trọ chọn khách và phòng.
2. Backend kiểm tra khách tồn tại.
3. Backend kiểm tra phòng đang `TRONG`.
4. Tạo bản ghi đặt cọc với trạng thái `DANG_GIU`.
5. Đổi trạng thái phòng thành `DA_GIU`.
6. Tạo thông báo cho tài khoản khách thuê nếu có.
7. Khi xác nhận, đặt cọc thành `DANG_THUE` và phòng thành `DANG_THUE`.
8. Khi hủy, đặt cọc thành `DA_HUY` và phòng có thể quay về `TRONG`.

### API

```text
GET    /api/dat-coc
GET    /api/dat-coc/:id
POST   /api/dat-coc
PUT    /api/dat-coc/:id
POST   /api/dat-coc/:id/confirm
POST   /api/dat-coc/:id/cancel
```

### Bảng dữ liệu

`dat_coc`, `khach_thue`, `phong_tro`, `thong_bao`.

## 3.6. Quản lý hợp đồng

### Mục đích

Tạo, xem, sửa và gia hạn hợp đồng thuê.

### Người dùng

Chủ trọ quản lý; khách thuê chỉ xem hợp đồng của mình.

### Màn hình và file

- Chủ trọ: `pages/hop-dong.html`, `assets/js/pages/hopDong.page.js`.
- Khách thuê: `pages/khach-thue/hop-dong.html`, `assets/js/pages/khachThue/hopDong.page.js`.

### Luồng từng bước

1. Chủ trọ gửi thông tin khách, phòng, ngày bắt đầu/kết thúc, tiền thuê và tiền cọc.
2. Backend validate dữ liệu.
3. Service kiểm tra khách và phòng tồn tại.
4. Service không cho tạo hợp đồng mới nếu phòng đã có hợp đồng `DANG_HIEU_LUC`.
5. Tạo hợp đồng và đổi phòng sang `DA_GIU`.
6. Tạo thông báo cho khách.
7. Khi khách xem, backend tự thêm `ma_khach_thue` từ JWT vào bộ lọc.
8. Khách không thể xem hợp đồng của người khác; nếu gọi chi tiết sai, nhận `403`.

### API

```text
GET  /api/hop-dong
GET  /api/hop-dong/:id
GET  /api/hop-dong/expiring
POST /api/hop-dong
PUT  /api/hop-dong/:id
POST /api/hop-dong/:id/renew
```

### Bảng dữ liệu

`hop_dong`, `khach_thue`, `phong_tro`, `dat_coc`, `thong_bao`.

### Kết quả/lưu ý

Role `KHACH_THUE` được đọc, nhưng không được tạo/sửa/gia hạn bằng các route quản lý hiện tại. Các form yêu cầu gia hạn trong frontend hiện là giao diện mẫu, chưa có endpoint riêng hoàn chỉnh.

## 3.7. Khoản phải thu và tiền phải trả

### Mục đích

Theo dõi hóa đơn tiền phòng, điện, nước, phí dịch vụ, hạn thanh toán và trạng thái nợ.

### Người dùng

Chủ trọ xem/quản lý tất cả; khách thuê chỉ xem khoản của mình.

### Màn hình và file

- Chủ trọ: `pages/cong-no.html`, `pages/tien-phong.html`.
- Khách thuê: `pages/khach-thue/tien-phai-tra.html`.
- Backend: `khoanPhaiThu.routes.js`, controller và service cùng tên.

### Luồng từng bước

1. Chủ trọ tạo khoản phải thu cho một phòng/khách/kỳ.
2. Backend kiểm tra phòng, khách và hóa đơn trùng `ma_phong + ky`.
3. Service lưu các thành phần tiền và tổng phải trả.
4. Hệ thống tạo thông báo cho khách.
5. Khách gọi endpoint hóa đơn của mình.
6. Backend ép `ma_khach_thue` theo JWT, không tin mã khách do frontend tự gửi.
7. Frontend tính tổng cần trả, đã trả, còn nợ và render bảng.

### API

```text
POST /api/khoan-phai-thu
GET  /api/khoan-phai-thu
GET  /api/khoan-phai-thu/:id
GET  /api/khoan-phai-thu/khach-thue/:khachThueId
GET  /api/khoan-phai-thu/list/overdue
```

### Bảng dữ liệu

`khoan_phai_thu`, `phong_tro`, `khach_thue`, `thanh_toan`, `thong_bao`.

## 3.8. Thanh toán và lịch sử thanh toán

### Mục đích

Ghi nhận một khoản thanh toán và cho phép xem lịch sử thanh toán.

### Người dùng

Chủ trọ xem thống kê và ghi nhận; khách thuê xem lịch sử của mình.

### Màn hình và file

- Chủ trọ: `pages/thanh-toan.html`.
- Khách thuê: `pages/khach-thue/thanh-toan.html`.
- Backend: `ThanhToanController` trong `khoanPhaiThu.controller.js`, service `thanhToan.service.js`.

### Luồng từng bước

1. Backend nhận mã hóa đơn, ngày, số tiền và phương thức.
2. Kiểm tra hóa đơn tồn tại.
3. Tạo bản ghi thanh toán.
4. Cập nhật trạng thái hóa đơn: chưa trả, trả một phần hoặc đã trả.
5. Gửi thông báo cho khách.
6. Khi khách xem lịch sử, query được lọc qua hóa đơn thuộc `ma_khach_thue` của JWT.

### API

```text
POST /api/khoan-phai-thu/payment/create
GET  /api/khoan-phai-thu/payment/list
GET  /api/khoan-phai-thu/payment/:id
GET  /api/khoan-phai-thu/payment/stats   # chỉ CHU_TRO
```

### Bảng dữ liệu

`thanh_toan`, `khoan_phai_thu`, `tai_khoan`, `thong_bao`.

## 3.9. Thu chi và chi phí

### Mục đích

Chủ trọ theo dõi các khoản chi sửa chữa, quản lý căn, hoa hồng và chi phí khác.

### Người dùng

`CHU_TRO`.

### Màn hình và file

- `pages/thu-chi.html`.
- `assets/js/pages/thuChi.page.js`.
- API `management.routes.js`: `/api/thu-chi`.

### Luồng từng bước

1. Page gọi danh sách chi phí.
2. Backend kiểm tra `thuChi.read`.
3. `ChiPhi.findAll()` đọc bảng chi phí.
4. Frontend render tổng và bảng giao dịch.
5. Khi tạo khoản chi, backend tự gắn `nguoi_ghi_nhan` từ JWT.
6. POST/PUT/DELETE chỉ được role `CHU_TRO`.

### API

```text
GET    /api/thu-chi
POST   /api/thu-chi
PUT    /api/thu-chi/:id
DELETE /api/thu-chi/:id
```

### Bảng dữ liệu

`chi_phi`, có thể liên kết tới `can_tro`, `phong_tro`, `noi_that`, `tai_khoan`.

## 3.10. Thông báo

### Mục đích

Hiển thị thông báo hợp đồng, hóa đơn, đặt cọc, thanh toán hoặc thông báo hệ thống.

### Người dùng

Chủ trọ và khách thuê; khách thuê chỉ nhận thông báo gắn với tài khoản của mình.

### Màn hình và file

- Tenant: `pages/khach-thue/thong-bao.html`.
- `assets/js/pages/khachThue/thongBao.page.js`.
- Backend: `tenant.routes.js`, `tenant.controller.js`.

### Luồng từng bước

1. Backend tạo thông báo khi một số nghiệp vụ xảy ra, ví dụ tạo hợp đồng hoặc hóa đơn.
2. Tenant gọi `GET /api/thong-bao`.
3. Backend dùng `req.user.ma_tai_khoan` để chỉ lấy thông báo của tài khoản đang đăng nhập.
4. Frontend render nội dung và thời gian.

### API và bảng dữ liệu

```text
GET /api/thong-bao
```

Dữ liệu nằm trong bảng `thong_bao`.

## 3.11. Gửi sự cố

### Mục đích

Khách thuê gửi mô tả sự cố cho hệ thống để chủ trọ tiếp nhận.

### Người dùng

`KHACH_THUE` có thể gửi; quyền backend được khai báo ở `suCo.write`.

### Màn hình và file

- `pages/khach-thue/su-co.html`.
- `assets/js/pages/khachThue/suCo.page.js`.

### Luồng từng bước

1. Khách nhập nội dung sự cố.
2. Frontend gửi `POST /api/su-co`.
3. Backend kiểm tra token, role và nội dung không rỗng.
4. Tạo bản ghi thông báo loại `SU_CO`.
5. Frontend báo gửi thành công hoặc hiển thị lỗi.

### API và bảng dữ liệu

```text
POST /api/su-co
```

Bản ghi hiện được lưu vào bảng `thong_bao`. Chức năng phân công/xử lý sự cố riêng chưa có model/route hoàn chỉnh.

## 3.12. Các trang khách thuê khác

### Thông tin thuê

`pages/khach-thue/thong-tin-thue.html` gọi profile và danh sách hợp đồng để hiển thị tên, số điện thoại, phòng, thời hạn, tiền thuê, mã hợp đồng và tiền cọc.

### Nhập chỉ số điện

`pages/khach-thue/nhap-chi-so-dien.html` hiện có giao diện nhập chỉ số, nhưng trong backend hiện tại chưa có route/controller hoàn chỉnh cho tenant gửi chỉ số và file minh chứng. Không nên coi dữ liệu trên trang này là đã lưu MySQL cho tới khi bổ sung API.

### Yêu cầu gia hạn

`pages/khach-thue/yeu-cau-gia-han.html` hiện là giao diện. Backend có route gia hạn dành cho chủ trọ (`POST /api/hop-dong/:id/renew`), nhưng chưa có route tạo “yêu cầu gia hạn” của tenant.

### Yêu cầu trả phòng

`pages/khach-thue/yeu-cau-tra-phong.html` hiện là giao diện. Model `TraPhong` có trong backend, nhưng chưa có route tenant hoàn chỉnh để gửi yêu cầu và theo dõi khấu trừ/hoàn cọc.

---

# 4. Luồng chung của một request

## 4.1. Frontend gọi API

Ví dụ page muốn lấy danh sách phòng:

```javascript
const response = await window.ApiClient.get("/phong?limit=100");
const rooms = response.data || [];
```

`ApiClient` tự làm các việc:

1. Ghép URL với `API_CONFIG.BASE_URL`.
2. Thêm header `Content-Type: application/json`.
3. Đọc `trohub_token` từ `localStorage`.
4. Thêm `Authorization: Bearer <token>` nếu có.
5. Gọi `fetch`.
6. Nếu HTTP lỗi hoặc `success: false`, ném Error.
7. Trả body JSON cho page JS.

## 4.2. Backend xử lý request

```text
Request
  -> Express app.js
  -> route phù hợp
  -> authMiddleware kiểm tra JWT
  -> authorize(permission) kiểm tra role
  -> controller nhận req/res
  -> validation kiểm tra input (nếu route có)
  -> service xử lý nghiệp vụ
  -> Sequelize model query MySQL
  -> controller trả { success, data, message }
```

## 4.3. Các mã lỗi cần nhớ

|  Mã | Ý nghĩa                                 | Cách xử lý                                       |
| --: | --------------------------------------- | ------------------------------------------------ |
| 400 | Dữ liệu gửi lên sai hoặc thiếu          | Đọc `message`, kiểm tra Joi/body.                |
| 401 | Chưa có token hoặc token sai/hết hạn    | Đăng nhập lại.                                   |
| 403 | Đã đăng nhập nhưng role không được phép | Kiểm tra `roleAccess.js`, không cố sửa bằng CSS. |
| 404 | Sai URL hoặc bản ghi không tồn tại      | Kiểm tra route và id.                            |
| 500 | Lỗi server/database                     | Xem terminal backend và SQL log.                 |

---

# 5. Cơ sở dữ liệu MySQL

## 5.1. Các bảng chính

| Bảng             | Lưu gì                                | Quan hệ quan trọng                               |
| ---------------- | ------------------------------------- | ------------------------------------------------ |
| `tai_khoan`      | Tài khoản, role, trạng thái           | Có thể gắn một `khach_thue`.                     |
| `khach_thue`     | Hồ sơ khách thuê                      | Có tài khoản, hợp đồng, đặt cọc, hóa đơn.        |
| `can_tro`        | Căn/địa điểm trọ                      | Một căn có nhiều phòng.                          |
| `phong_tro`      | Phòng, giá thuê, trạng thái           | Thuộc một căn; liên quan hợp đồng, cọc, hóa đơn. |
| `noi_that`       | Tài sản/nội thất trong phòng          | Thuộc phòng.                                     |
| `dat_coc`        | Giao dịch giữ phòng/tiền cọc          | Gắn khách và phòng.                              |
| `hop_dong`       | Thời hạn và giá thuê                  | Gắn khách và phòng.                              |
| `dien_nuoc`      | Chỉ số điện nước theo kỳ              | Gắn phòng.                                       |
| `khoan_phai_thu` | Hóa đơn/khoản phải trả                | Gắn khách, phòng và kỳ.                          |
| `thanh_toan`     | Lần thanh toán                        | Gắn một hóa đơn.                                 |
| `giam_tru`       | Giảm trừ/ưu đãi                       | Có thể gắn khách, phòng, hợp đồng.               |
| `chi_phi`        | Chi phí vận hành                      | Có thể gắn căn, phòng, tài khoản ghi nhận.       |
| `tra_phong`      | Dữ liệu trả phòng, khấu trừ, hoàn cọc | Gắn hợp đồng.                                    |
| `thong_bao`      | Thông báo gửi tới tài khoản           | Gắn `ma_tai_khoan_nhan`.                         |

## 5.2. Quan hệ dễ hình dung

```text
can_tro
  └── phong_tro
        ├── dat_coc
        ├── hop_dong
        ├── dien_nuoc
        └── khoan_phai_thu
                          └── thanh_toan

khach_thue
  ├── tai_khoan
  ├── dat_coc
  ├── hop_dong
  ├── khoan_phai_thu
  └── giam_tru

hop_dong
  └── tra_phong

tai_khoan
  └── thong_bao
```

## 5.3. Dữ liệu mẫu

Có hai cách dữ liệu thường gặp:

- `npm run seed` trong backend: xóa và tạo lại bảng/dữ liệu mẫu bằng `scripts/seed.js`. Tài khoản mẫu gồm `chutro`, `nguyenvana`, `tranthib`, `leholangc`, mật khẩu `123456`.
- `database.md`: chứa SQL thiết kế và dữ liệu SQL tham khảo. Username trong file SQL phải khớp database thực tế; không mặc định rằng dữ liệu trong file đã được import.

Không chạy `npm run seed` trên database cần giữ dữ liệu thật vì script dùng `sequelize.sync({ force: true })` và có thể xóa bảng cũ.

---

# 6. Phân quyền RBAC

RBAC nghĩa là “phân quyền theo vai trò”. Trong dự án có hai lớp:

## 6.1. Lớp frontend

`assets/js/components/sidebar.js` đọc `trohub_user.vai_tro`:

- Nếu là `KHACH_THUE`, sidebar được tạo lại chỉ với các link tenant.
- Nếu tenant gõ URL admin, frontend chuyển về trang thông tin thuê.
- Navbar hiển thị tên, role, hồ sơ và nút đăng xuất.

Đây chỉ là lớp trải nghiệm người dùng, không phải bảo mật cuối cùng.

## 6.2. Lớp backend

`src/middleware/auth.js`:

1. Đọc header `Authorization`.
2. Lấy token sau chữ `Bearer`.
3. Dùng `JWT_SECRET` để verify.
4. Đặt thông tin user vào `req.user`.

`src/config/roleAccess.js` là nơi khai báo role cho permission. Ví dụ:

```javascript
phong: { read: ["CHU_TRO"], write: ["CHU_TRO"] },
hopDong: { read: ["CHU_TRO", "KHACH_THUE"], write: ["CHU_TRO"] },
```

Route dùng:

```javascript
authorize("phong.read");
authorize("hopDong.write");
```

Nếu role không nằm trong danh sách, backend trả `403`. Vì vậy tenant không thể dùng Postman để gọi API quản trị.

## 6.3. Lọc dữ liệu riêng của tenant

Với hợp đồng, hóa đơn và thanh toán, backend không tin mã khách gửi từ frontend. Backend lấy `req.user.ma_khach_thue` trong JWT để lọc dữ liệu. Đây là điểm bắt buộc để tenant không xem dữ liệu của người thuê khác.

---

# 7. Cách chạy dự án

## 7.1. Chuẩn bị MySQL

1. Mở XAMPP.
2. Start **MySQL** ở port `3306`.
3. Tạo database `ql_phong_tro` nếu chưa có.
4. Kiểm tra `phong-tro-backend/.env`:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=ql_phong_tro
DB_USER=root
DB_PASSWORD=
PORT=3001
JWT_SECRET=phong_tro_secret_key_2026
JWT_EXPIRE=7d
```

## 7.2. Chạy backend

```powershell
cd phong-tro-backend
npm install
npm start
```

Thấy các dòng sau là backend đã chạy:

```text
Database connected successfully
Server is running on port 3001
```

Kiểm tra:

```text
http://localhost:3001/health
```

## 7.3. Chạy frontend bằng Vite

```powershell
cd phong-tro-frontend
npm install
npm run dev
```

Mở `http://localhost:4173/`.

## 7.4. Chạy frontend bằng Apache XAMPP

1. Copy hoặc đặt nội dung frontend vào thư mục Apache đang phục vụ, thường là `htdocs`.
2. Start Apache ở port `80`.
3. Giữ backend Node.js chạy riêng ở port `3001`.
4. Mở `http://localhost/`.

`apiConfig.js` sẽ gọi backend ở `http://localhost:3001/api` khi frontend chạy qua Apache.

---

# 8. Cách đọc lỗi và sửa code

## 8.1. Trang trắng hoặc không tải component

Kiểm tra:

1. DevTools > Console.
2. Network có lỗi `404` file HTML/CSS/JS không.
3. Đường dẫn `data-include` có đúng cấp thư mục không.
4. `includeAll()` có được gọi không.
5. Có event `partials:ready` trước khi gọi `initSidebar()`/`initNavbar()` không.

## 8.2. Lỗi `401`

- Token chưa lưu.
- Token hết hạn.
- Header không có `Authorization`.
- Backend dùng `JWT_SECRET` khác lúc tạo token.

Đăng xuất, đăng nhập lại và kiểm tra `localStorage.trohub_token`.

## 8.3. Lỗi `403`

- Người dùng đã đăng nhập nhưng role không được phép.
- Đọc permission trong `roleAccess.js`.
- Kiểm tra route đang dùng `authorize("resource.action")` nào.
- Không sửa bằng cách cho hiện menu; phải quyết định lại quyền nghiệp vụ.

## 8.4. Frontend hiện dữ liệu cũ

- Hard refresh trình duyệt bằng `Ctrl + F5`.
- Kiểm tra page JS có gọi `ApiClient.get()` hay còn số viết thẳng trong HTML.
- Kiểm tra Network có request `/api/...` và response có `success: true`.
- Kiểm tra Apache đang phục vụ đúng thư mục frontend, không phải bản copy cũ.

## 8.5. Lỗi MySQL

- Kiểm tra MySQL XAMPP có Start không.
- Kiểm tra port `3306`.
- Kiểm tra tên database/user/password trong `.env`.
- Xem log terminal backend để biết câu SQL lỗi.
- Không chạy seed trên database thật nếu chưa backup.

---

# 9. Trạng thái hiện tại

## Đã có dữ liệu/API thật

- Đăng nhập và profile.
- Phòng và dashboard.
- Căn trọ, khách thuê, thu chi qua management API.
- Hợp đồng và hợp đồng sắp hết hạn.
- Đặt cọc.
- Khoản phải thu và thanh toán.
- Hồ sơ thuê và tiền phải trả của tenant.
- Lịch sử thanh toán tenant.
- Thông báo tenant.
- Gửi sự cố tenant.
- RBAC frontend và backend.

## Còn cần phát triển thêm

- Form/modal CRUD đầy đủ trên giao diện cho căn trọ, khách thuê, hợp đồng và thu chi.
- API tenant nhập chỉ số điện nước và upload minh chứng.
- API tạo yêu cầu gia hạn từ tenant.
- API tạo yêu cầu trả phòng, tính khấu trừ và hoàn cọc.
- Màn hình xử lý sự cố riêng cho chủ trọ.
- Các module được liệt kê trong tài liệu thiết kế cũ nhưng chưa có route/controller thực tế như báo cáo đầy đủ, chi tiết điện nước, trả phòng hoàn chỉnh và thông báo quản trị.

Khi thêm chức năng mới, nên làm theo thứ tự:

1. Xác định bảng/model dữ liệu.
2. Tạo validation.
3. Tạo service xử lý nghiệp vụ.
4. Tạo controller.
5. Khai báo permission trong `roleAccess.js`.
6. Tạo route với `authMiddleware` và `authorize()`.
7. Tạo page JS gọi API.
8. Tạo/cập nhật HTML.
9. Kiểm thử role được phép và role bị từ chối.

---

## Tóm tắt một câu

**Frontend hiển thị và gửi request, backend xác thực + phân quyền + xử lý nghiệp vụ, Sequelize chuyển dữ liệu giữa backend và MySQL, sau đó JSON quay lại frontend để render lên màn hình.**
