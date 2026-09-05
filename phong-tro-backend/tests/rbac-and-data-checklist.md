# RBAC và dữ liệu thật - checklist kiểm thử

## Phân quyền

- [x] Tenant gọi `/api/can-tro` nhận `403 Forbidden`.
- [x] Tenant gọi `/api/khach-thue` nhận `403 Forbidden`.
- [x] Tenant gọi `/api/thu-chi` nhận `403 Forbidden`.
- [x] Tenant gọi `/api/hop-dong` chỉ nhận hợp đồng có `ma_khach_thue` của token.
- [x] Tenant gọi hóa đơn của người khác nhận `403 Forbidden`.
- [x] Tenant gọi `/api/thong-bao` chỉ nhận thông báo của tài khoản mình.
- [x] Tenant gửi `POST /api/su-co` tạo thông báo sự cố trong bảng `thong_bao`.
- [x] Chủ trọ gọi các API quản lý nhận dữ liệu thành công.
- [x] Tenant menu được render riêng, không chứa link admin.
- [x] Tenant mở URL admin bị chuyển về trang tenant.

## Dữ liệu database

- [x] `can-tro.html` render dữ liệu từ `/api/can-tro`.
- [x] `khach-thue.html` render dữ liệu từ `/api/khach-thue`.
- [x] `hop-dong.html` render dữ liệu từ `/api/hop-dong`.
- [x] `thu-chi.html` render dữ liệu từ `/api/thu-chi`.
- [x] Reload không reset các bảng về mock vì dữ liệu được fetch lại từ API.
- [ ] CRUD thêm/sửa/xóa qua UI: chưa PASS; giao diện hiện tại chưa có form/modal CRUD hoàn chỉnh. API POST/PUT/DELETE đã có và cần bổ sung UI thao tác để hoàn tất kịch bản này.

## Tài liệu

- [x] Cây tenant và file RBAC mới đã được ghi vào `CauTrucThuMuc_QuanLyChuoiPhongTro.md`.
- [ ] Đối chiếu toàn bộ cây cũ 100%: tài liệu gốc có nhiều file route/controller chưa tồn tại trong code; phần thực tế đã được ghi rõ riêng ở mục 5 để tránh mô tả sai.
