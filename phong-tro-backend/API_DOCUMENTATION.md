# Phòng Trọ Backend - API Documentation

## Endpoints Summary

### Authentication (/api/auth)

```
POST   /api/auth/login                    - Đăng nhập
POST   /api/auth/register-khach-thue      - Đăng ký khách thuê
GET    /api/auth/profile                  - Lấy profile người dùng (yêu cầu token)
```

### Phòng Trọ (/api/phong)

```
GET    /api/phong                         - Danh sách phòng (phân trang, lọc)
GET    /api/phong/:id                     - Chi tiết phòng
POST   /api/phong                         - Tạo phòng (CHU_TRO)
PUT    /api/phong/:id                     - Cập nhật phòng (CHU_TRO)
DELETE /api/phong/:id                     - Xóa phòng (CHU_TRO)
```

### Hợp Đồng (/api/hop-dong)

```
GET    /api/hop-dong                      - Danh sách hợp đồng (phân trang, lọc)
GET    /api/hop-dong/:id                  - Chi tiết hợp đồng
GET    /api/hop-dong/expiring             - Hợp đồng sắp hết hạn (CHU_TRO)
POST   /api/hop-dong                      - Tạo hợp đồng (CHU_TRO)
PUT    /api/hop-dong/:id                  - Cập nhật hợp đồng (CHU_TRO)
POST   /api/hop-dong/:id/renew            - Gia hạn hợp đồng (CHU_TRO)
```

### Đặt Cọc (/api/dat-coc)

```
GET    /api/dat-coc                       - Danh sách đặt cọc (phân trang, lọc)
GET    /api/dat-coc/:id                   - Chi tiết đặt cọc
POST   /api/dat-coc                       - Tạo đặt cọc (CHU_TRO)
PUT    /api/dat-coc/:id                   - Cập nhật đặt cọc (CHU_TRO)
POST   /api/dat-coc/:id/confirm           - Xác nhận đặt cọc (CHU_TRO)
POST   /api/dat-coc/:id/cancel            - Hủy đặt cọc (CHU_TRO)
```

### Khoản Phải Thu & Thanh Toán (/api/khoan-phai-thu)

```
Khoản Phải Thu (Bills):
POST   /api/khoan-phai-thu                - Tạo khoản phải thu (CHU_TRO)
GET    /api/khoan-phai-thu                - Danh sách khoản phải thu (phân trang, lọc)
GET    /api/khoan-phai-thu/:id            - Chi tiết khoản phải thu
GET    /api/khoan-phai-thu/khach-thue/:khachThueId - Hóa đơn của khách
GET    /api/khoan-phai-thu/list/overdue   - Hóa đơn quá hạn (CHU_TRO)

Thanh Toán (Payments):
POST   /api/khoan-phai-thu/payment/create - Ghi nhận thanh toán
GET    /api/khoan-phai-thu/payment/list   - Danh sách thanh toán (phân trang)
GET    /api/khoan-phai-thu/payment/:id    - Chi tiết thanh toán
GET    /api/khoan-phai-thu/payment/stats  - Thống kê thanh toán (CHU_TRO)
```

## Request/Response Format

### Success Response

```json
{
  "success": true,
  "data": { ... },
  "message": "..."
}
```

### Error Response

```json
{
  "success": false,
  "message": "..."
}
```

### Pagination Response

```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10,
    "hasNext": true,
    "hasPrev": false
  },
  "message": "..."
}
```

## Query Parameters

### Pagination

- `page` - Trang hiện tại (default: 1)
- `limit` - Số lượng items per page (default: 10)

### Filters

Các endpoint list hỗ trợ các filter tùy theo resource:

- `ma_can` - Mã căn trọ
- `trang_thai` - Trạng thái
- `ma_khach_thue` - Mã khách thuê
- `ky` - Kỳ tính (YYYY-MM)

## Authentication

Sử dụng JWT token trong header:

```
Authorization: Bearer <token>
```

## Error Codes

- `400` - Bad Request / Validation Error
- `401` - Unauthorized (thiếu/sai token)
- `403` - Forbidden (không đủ quyền)
- `404` - Not Found
- `500` - Internal Server Error

## Sample Login Requests

### Đăng nhập Chủ Trọ

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "ten_dang_nhap": "chutro",
    "mat_khau": "123456"
  }'
```

### Đăng nhập Khách Thuê

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "ten_dang_nhap": "nguyenvana",
    "mat_khau": "123456"
  }'
```

## Database Models

### 14 Models (Entities)

1. **KhachThue** - Khách thuê
2. **TaiKhoan** - Tài khoản đăng nhập
3. **CanTro** - Căn trọ
4. **PhongTro** - Phòng trọ
5. **NoiThat** - Nội thất/Tài sản
6. **DatCoc** - Đặt cọc/Giữ phòng
7. **HopDong** - Hợp đồng
8. **DienNuoc** - Tiêu thụ điện nước
9. **KhoanPhaiThu** - Khoản phải thu (hóa đơn)
10. **ThanhToan** - Thanh toán
11. **GiamTru** - Giảm trừ/Ưu đãi
12. **ChiPhi** - Chi phí
13. **TraPhong** - Trả phòng
14. **ThongBao** - Thông báo

## Business Rules Implemented

- **BR-02**: Cảnh báo hợp đồng hết hạn (ít nhất 1 tháng)
- **BR-03**: Công thức tính khoản phải thu
- **BR-05**: Kiểm tra quá hạn giữ phòng
- **BR-09**: Tính tiền nước (100k/người/tháng)
- **BR-10**: Luồng trạng thái phòng
- **BR-12-14**: Quyền truy cập theo vai trò
- **BR-15**: Không xóa phòng có lịch sử

## Cron Jobs

- **Daily 08:00** - Cảnh báo hợp đồng hết hạn (BR-02)
- **Daily 09:00** - Kiểm tra phòng quá hạn giữ (BR-05)
- **Monthly on 1st 07:00** - Tạo khoản phải thu hàng tháng

## Development Tips

### Setting up locally

```bash
1. npm install
2. cp .env.example .env
3. Update .env with your DB credentials
4. npm run seed (to populate sample data)
5. npm run dev (to start with nodemon)
```

### Running seed script

```bash
npm run seed
```

This will create:

- 1 Landlord account (chutro/123456)
- 3 Tenant accounts
- 2 Buildings
- 4 Rooms
- 3 Deposits
- 3 Contracts

### Testing endpoints

Use Postman, Insomnia, or curl to test endpoints. Remember to:

1. First login to get token
2. Use token in Authorization header for protected routes
3. Check error messages for validation issues
