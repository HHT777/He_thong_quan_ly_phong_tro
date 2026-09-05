# Phòng Trọ Backend API

API backend cho hệ thống quản lý chuỗi phòng trọ

## Yêu cầu

- Node.js >= 14.0.0
- MySQL >= 5.7
- npm >= 6.0.0

## Cài đặt

### 1. Clone hoặc tạo project

```bash
npm install
```

### 2. Cấu hình biến môi trường

Sao chép file `.env.example` thành `.env` và cập nhật thông tin kết nối database:

```bash
cp .env.example .env
```

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=ql_phong_tro
DB_USER=root
DB_PASSWORD=
PORT=3001
NODE_ENV=development
JWT_SECRET=phong_tro_secret_key_2026
```

### 3. Tạo database

```sql
CREATE DATABASE ql_phong_tro CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## Chạy Server

### Development (với nodemon)

```bash
npm run dev
```

### Production

```bash
npm start
```

Server sẽ chạy trên http://localhost:3001

## API Endpoints

### Authentication

- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/register-khach-thue` - Đăng ký khách thuê
- `GET /api/auth/profile` - Lấy thông tin tài khoản (yêu cầu token)

### Phòng (Room)

- `GET /api/phong` - Danh sách phòng
- `GET /api/phong/:id` - Chi tiết phòng
- `POST /api/phong` - Tạo phòng (chủ trọ)
- `PUT /api/phong/:id` - Cập nhật phòng (chủ trọ)
- `DELETE /api/phong/:id` - Xóa phòng (chủ trọ)

### Hợp Đồng (Contract)

- `GET /api/hop-dong` - Danh sách hợp đồng
- `GET /api/hop-dong/:id` - Chi tiết hợp đồng
- `POST /api/hop-dong` - Tạo hợp đồng (chủ trọ)
- `PUT /api/hop-dong/:id` - Cập nhật hợp đồng (chủ trọ)
- `POST /api/hop-dong/:id/renew` - Gia hạn hợp đồng (chủ trọ)
- `GET /api/hop-dong/expiring` - Hợp đồng sắp hết hạn (chủ trọ)

## Cấu trúc Project

```
src/
├── config/          # Cấu hình (database, environment)
├── controllers/     # Controllers xử lý logic API
├── services/        # Services xử lý business logic
├── models/          # Sequelize models
├── routes/          # Route definitions
├── middleware/      # Middleware (auth, error handling)
├── validations/     # Joi validation schemas
├── utils/           # Utility functions
├── jobs/            # Cron jobs
└── app.js           # Express app setup
```

## Authentication

Tất cả API endpoints (trừ login/register) yêu cầu JWT token trong header:

```
Authorization: Bearer <token>
```

Token được cấp khi đăng nhập thành công.

## Roles & Permissions

- **CHU_TRO** (Landlord): Quản lý phòng, hợp đồng, tài chính, báo cáo
- **KHACH_THUE** (Tenant): Xem thông tin phòng thuê, hợp đồng, khoản thanh toán của mình

## Response Format

Tất cả API responses có format:

```json
{
  "success": true/false,
  "data": {...},
  "message": "..."
}
```

## Error Handling

Các lỗi validation và database sẽ trả về với status code phù hợp:

- `400` - Bad Request / Validation Error
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Database Schema

Các bảng chính:

- `khach_thue` - Khách thuê
- `tai_khoan` - Tài khoản đăng nhập
- `can_tro` - Căn trọ
- `phong_tro` - Phòng trọ
- `hop_dong` - Hợp đồng
- `dat_coc` - Đặt cọc / Giữ phòng
- `dien_nuoc` - Tiêu thụ điện nước
- `khoan_phai_thu` - Khoản phải thu (hóa đơn)
- `thanh_toan` - Thanh toán
- `chi_phi` - Chi phí
- `tra_phong` - Trả phòng
- `thong_bao` - Thông báo

## Business Rules Implemented

- **BR-02**: Cảnh báo hợp đồng hết hạn (tối thiểu 1 tháng trước)
- **BR-03**: Công thức tính khoản phải thu
- **BR-05**: Xử lý quá hạn giữ phòng
- **BR-10**: Luồng trạng thái phòng
- **BR-12-14**: Quyền truy cập theo vai trò
- **BR-15**: Không xóa phòng có lịch sử hợp đồng

## Cron Jobs

- Cảnh báo hợp đồng hết hạn
- Tạo khoản phải thu hàng tháng (ngày 01)
- Kiểm tra phòng quá hạn giữ

## License

ISC
