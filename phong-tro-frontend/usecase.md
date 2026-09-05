USE CASE 02: Quản lý căn trọ
Tiền điều kiện

- Chủ trọ đã đăng nhập thành công vào hệ thống với quyền quản trị cao nhất.
- Kết nối cơ sở dữ liệu ổn định.
  Hậu điều kiện
- Thông tin căn trọ được thêm mới hoặc cập nhật thành công.
- Khi dừng hoạt động, trạng thái căn trọ được cập nhật tương ứng.
- Dữ liệu căn trọ được lưu và đồng bộ với các dữ liệu liên quan.
  Actor chính
  Chủ trọ
  Actor phụ
  Không
  Basic Flow
  Chủ trọ
  Hệ thống

1. Chọn chức năng “Quản lý căn trọ” trên thanh điều hướng.
2. Truy xuất và hiển thị danh sách các căn trọ đang quản lý, bao gồm: Mã căn, Tên căn, Địa chỉ, Số lượng phòng và Trạng thái hoạt động.
3. Chọn “Thêm căn trọ mới”.
4. Hiển thị biểu mẫu nhập thông tin căn trọ gồm: Tên căn trọ, Địa chỉ, Mô tả, Quy định chung và Hình ảnh tổng quan.
5. Nhập đầy đủ thông tin và chọn “Lưu”.
6. Kiểm tra tính hợp lệ của dữ liệu.

7. Tạo Mã căn tự động và lưu thông tin căn trọ vào CSDL.

8. Thông báo “Thêm căn trọ thành công” và cập nhật danh sách căn trọ.
   Alternative flow
   2.1. Không có căn trọ
   Hệ thống không tìm thấy căn trọ nào trong CSDL.
   Hệ thống hiển thị danh sách ở trạng thái trống và thông báo chưa có căn trọ.
   Hệ thống hiển thị chức năng “Thêm căn trọ mới”.
   Quay lại bước 3 của Basic Flow.
   2.2. Xem thông tin căn trọ
   Chủ trọ chọn một căn trọ trong danh sách.
   Hệ thống hiển thị thông tin chi tiết của căn trọ.
   Chủ trọ xem thông tin cần thiết.
   Kết thúc Use Case.
   3.1. Chỉnh sửa thông tin căn trọ
   Chủ trọ chọn căn trọ cần chỉnh sửa và chọn “Sửa”.
   Hệ thống hiển thị biểu mẫu với thông tin hiện tại của căn trọ.
   Chủ trọ chỉnh sửa thông tin và chọn “Lưu”.
   Hệ thống kiểm tra tính hợp lệ của dữ liệu.
   Hệ thống lưu thông tin mới và cập nhật danh sách căn trọ.
   Quay lại bước 2 của Basic Flow.
   3.2. Dừng hoạt động căn trọ
   Chủ trọ chọn căn trọ cần dừng hoạt động và chọn “Dừng hoạt động”.
   Hệ thống kiểm tra tình trạng các phòng và hợp đồng thuộc căn trọ.
   Nếu căn trọ đủ điều kiện, hệ thống cập nhật trạng thái thành “Ngừng hoạt động”.
   Hệ thống cập nhật lại danh sách căn trọ.
   Quay lại bước 2 của Basic Flow.

Exception flow
6.1. Thông tin căn trọ không hợp lệ
Hệ thống phát hiện thông tin bắt buộc bị thiếu hoặc dữ liệu không hợp lệ.
Hệ thống hiển thị thông báo lỗi tại trường dữ liệu tương ứng.
Hệ thống không lưu thông tin căn trọ.
Quay lại bước 5 của Basic Flow.
6.2. Lỗi khi lưu dữ liệu
Hệ thống phát hiện lỗi trong quá trình lưu dữ liệu.
Hệ thống thông báo thao tác không thành công.
Dữ liệu trước đó được giữ nguyên.
Kết thúc Use Case.
3.2.1. Căn trọ vẫn còn phòng có khách thuê hoặc hợp đồng đang hiệu lực
Hệ thống phát hiện căn trọ chưa đủ điều kiện để dừng hoạt động.
Hệ thống không cho phép dừng hoạt động căn trọ.
Hệ thống hiển thị thông báo yêu cầu xử lý các hợp đồng đang hoạt động trước.
Kết thúc Use Case.

USE CASE 03: Quản lý phòng
Tiền điều kiện

- Chủ trọ đã đăng nhập thành công.
- Hệ thống đã có ít nhất một Căn trọ.
  Hậu điều kiện
- Thông tin phòng được thêm mới hoặc cập nhật thành công.
- Thông tin nội thất của phòng được ghi nhận/cập nhật.
- Trạng thái phòng (Trống, Đã giữ, Đang thuê, Đang xử lý trả phòng) được cập nhật đúng với thực tế để hiển thị cho các quy trình khác.
  Actor chính
  Chủ trọ
  Actor phụ
  Không
  Basic Flow
  Chủ trọ
  Hệ thống

1. Chọn chức năng “Quản lý phòng” trên thanh điều hướng.
2. Hiển thị danh sách các căn trọ để Chủ trọ lựa chọn.
3. Chọn một căn trọ.
4. Truy xuất và hiển thị danh sách các phòng thuộc căn trọ được chọn, bao gồm: Mã/Số phòng, Giá thuê và Trạng thái phòng.
5. Chọn “Thêm phòng mới”.
6. Hiển thị biểu mẫu nhập thông tin phòng gồm: Mã/Số phòng, Diện tích, Giá thuê, Số người ở tối đa và thông tin nội thất.
7. Nhập đầy đủ thông tin và chọn “Xác nhận”.
8. Kiểm tra tính hợp lệ và tính duy nhất của thông tin phòng trong cùng căn.

9. Lưu phòng mới và liên kết với căn trọ được chọn.

10. Thông báo “Thêm phòng thành công” và cập nhật danh sách phòng.
    Alternative flow
    2.1. Căn trọ chưa có phòng
    Hệ thống không tìm thấy phòng nào thuộc căn trọ được chọn.
    Hệ thống hiển thị danh sách phòng ở trạng thái trống.
    Hệ thống hiển thị chức năng “Thêm phòng mới”.
    Quay lại bước 5 của Basic Flow.
    5.1. Xem thông tin phòng
    Chủ trọ chọn một phòng trong danh sách.
    Hệ thống hiển thị thông tin chi tiết của phòng, bao gồm thông tin phòng, giá thuê, trạng thái và nội thất.
    Chủ trọ xem thông tin cần thiết.
    Kết thúc Use Case.
    5.2. Chỉnh sửa thông tin phòng
    Chủ trọ chọn phòng cần chỉnh sửa và chọn “Sửa”.
    Hệ thống hiển thị thông tin hiện tại của phòng.
    Chủ trọ chỉnh sửa thông tin phòng, giá thuê, nội thất hoặc trạng thái và chọn “Lưu”.
    Hệ thống kiểm tra tính hợp lệ của dữ liệu.
    Hệ thống lưu thông tin mới và cập nhật danh sách phòng.
    Quay lại bước 4 của Basic Flow.

Exception flow
8.1. Mã/Số phòng bị trùng trong cùng căn
Hệ thống phát hiện Mã/Số phòng đã tồn tại trong cùng căn trọ.
Hệ thống hiển thị thông báo phòng đã tồn tại.
Hệ thống không lưu phòng mới.
Quay lại bước 7 của Basic Flow.
8.2. Thông tin phòng không hợp lệ
Hệ thống phát hiện dữ liệu không hợp lệ, chẳng hạn giá thuê hoặc diện tích không đúng định dạng.
Hệ thống hiển thị thông báo lỗi tại trường dữ liệu tương ứng.
Hệ thống không lưu thông tin.
Quay lại bước 7 của Basic Flow.
5.2.1a. Thông tin chỉnh sửa không hợp lệ
Hệ thống phát hiện dữ liệu chỉnh sửa không hợp lệ.
Hệ thống hiển thị thông báo lỗi.
Hệ thống không lưu thay đổi.
Quay lại bước 3 của Alternative Flow 5.2.
9.1. Lỗi khi lưu dữ liệu
Hệ thống phát hiện lỗi trong quá trình lưu dữ liệu.
Hệ thống thông báo thao tác không thành công.
Dữ liệu trước đó được giữ nguyên.
Kết thúc Use Case.

USE CASE 04: Quản lý khách thuê
Tiền điều kiện

- Chủ trọ đã đăng nhập thành công vào hệ thống với quyền quản lý.
  Hậu điều kiện
- Hồ sơ khách thuê được thêm mới hoặc cập nhật thành công.
- Thông tin khách thuê được lưu để liên kết với phòng và hợp đồng.
- Lịch sử thuê được bảo toàn trong hệ thống.
  Actor chính
  Chủ trọ
  Actor phụ
  Không
  Chủ trọ
  Hệ thống

1. Chọn chức năng “Quản lý khách thuê” trên hệ thống.
2. Hiển thị danh sách khách thuê đang được quản lý, bao gồm: Họ tên, Số điện thoại, CCCD/giấy tờ và Trạng thái khách thuê.
3. Chọn “Thêm khách thuê”.
4. Hiển thị biểu mẫu thông tin khách thuê.
5. Nhập thông tin cần thiết và chọn “Lưu hồ sơ”.
6. Kểm tra tính hợp lệ của thông tin.

7. Tạo Mã khách thuê và lưu hồ sơ vào CSDL.

8. Cập nhật danh sách khách thuê và thông báo “Thêm khách thuê thành công”.
   Alternative flow
   2.1. Chưa có khách thuê
   Hệ thống không tìm thấy khách thuê nào trong CSDL.
   Hệ thống hiển thị danh sách khách thuê ở trạng thái trống.
   Hệ thống hiển thị chức năng “Thêm khách thuê”.
   Quay lại bước 3 của Basic Flow.
   5.1. Xem thông tin khách thuê
   Chủ trọ chọn một khách thuê trong danh sách.
   Hệ thống hiển thị thông tin chi tiết khách thuê.
   Chủ trọ xem thông tin cần thiết.
   Kết thúc Use Case.
   5.2. Xem lịch sử thuê
   Chủ trọ chọn khách thuê cần xem lịch sử.
   Hệ thống hiển thị thông tin các phòng và hợp đồng mà khách đã từng thuê.
   Chủ trọ xem thông tin lịch sử thuê.
   Kết thúc Use Case.
   5.3. Chỉnh sửa thông tin khách thuê
   Chủ trọ chọn biểu tượng “3 chấm” tại khách thuê và chọn “Sửa”.
   Hệ thống hiển thị thông tin hiện tại của khách thuê.
   Chủ trọ chỉnh sửa thông tin và chọn “Lưu”.
   Hệ thống kiểm tra tính hợp lệ của dữ liệu.
   Hệ thống lưu thông tin mới.
   Quay lại bước 2 của Basic Flow.
   5.4. Cấp tài khoản cho khách thuê
   Chủ trọ chọn biểu tượng “3 chấm” tại khách thuê và chọn “Tạo tài khoản”.
   Hệ thống kiểm tra điều kiện cấp tài khoản.
   Hệ thống tạo thông tin đăng nhập cho khách thuê.
   Hệ thống thông báo tài khoản đã được tạo để Chủ trọ cung cấp cho khách thuê.
   Kết thúc Use Case.

Exception Flow
6.1. Thông tin khách thuê không hợp lệ
Hệ thống phát hiện thông tin bắt buộc bị thiếu hoặc không đúng định dạng.
Hệ thống hiển thị thông báo lỗi tại trường dữ liệu tương ứng.
Hệ thống không lưu hồ sơ khách thuê.
Quay lại bước 5 của Basic Flow.
6.2. CCCD/giấy tờ hoặc số điện thoại đã tồn tại
Hệ thống phát hiện CCCD/giấy tờ hoặc số điện thoại đã được đăng ký cho khách thuê khác.
Hệ thống hiển thị thông báo thông tin đã tồn tại.
Chủ trọ kiểm tra lại thông tin hoặc sử dụng hồ sơ khách thuê đã có.
Quay lại bước 5 của Basic Flow.
5.3.1. Thông tin chỉnh sửa không hợp lệ
Hệ thống phát hiện dữ liệu chỉnh sửa không hợp lệ.
Hệ thống hiển thị thông báo lỗi.
Hệ thống không lưu thay đổi.
Quay lại bước 3 của Alternative Flow 5.3.
5.4.1. Khách thuê chưa đủ điều kiện cấp tài khoản
Hệ thống xác định khách thuê chưa hoàn tất các điều kiện cấp tài khoản.
Hệ thống thông báo khách thuê chưa đủ điều kiện.
Hệ thống không tạo tài khoản.
Kết thúc Use Case.
5.4.2. Tài khoản khách thuê đã tồn tại
Hệ thống phát hiện khách thuê đã có tài khoản.
Hệ thống thông báo tài khoản đã tồn tại.
Hệ thống không tạo tài khoản mới.
Kết thúc Use Case.
7.1. Lỗi khi lưu hồ sơ
Hệ thống phát hiện lỗi trong quá trình lưu dữ liệu.
Hệ thống thông báo thao tác không thành công.
Dữ liệu trước đó được giữ nguyên.
Kết thúc Use Case.

USE CASE 05: Quản lý cọc
Tiền điều kiện

- Chủ trọ đã đăng nhập thành công.
- Phòng cần đặt cọc tồn tại và đang ở trạng thái có thể cho thuê/giữ phòng.
  Hậu điều kiện
- Nếu ghi nhận cọc thành công, thông tin cọc được lưu vào CSDL, gồm khách đặt cọc, phòng, số tiền cọc, ngày cọc và thời hạn giữ phòng.
- Trạng thái cọc và trạng thái giữ phòng được cập nhật tương ứng.
  Actor chính
  Chủ trọ
  Actor phụ
  Không
  Basic Flow
  Chủ trọ
  Hệ thống

1. Chọn chức năng "Quản lý cọc".
2. Hiển thị danh sách các khoản cọc và chức năng ghi nhận cọc mới.
3. Chọn ghi nhận cọc
4. Hiển thị biểu mẫu ghi nhận cọc.
5. Chọn phòng khách muốn giữ
6. Hiển thị thông tin phòng và trạng thái hiện tại.
7. Nhập thông tin khách đặt cọc, số tiền cọc và thời hạn giữ phòng.
8. Kiểm tra tính hợp lệ của dữ liệu.
9. Xác nhận ghi nhận cọc.
10. Lưu thông tin cọc.

11. Cập nhật trạng thái cọc thành “Đang hiệu lực” và ghi nhận phòng đang được giữ.

12. Thông báo “ghi nhận cọc thành công”.
    Alternative flow

2.1. Không có khoản cọc
Hệ thống không tìm thấy khoản cọc nào.
Hệ thống hiển thị danh sách cọc ở trạng thái trống.
Hệ thống hiển thị chức năng “Ghi nhận cọc”.
Quay lại bước 3 của Basic Flow.
5.1. Phòng đã được giữ hoặc không còn khả dụng
Hệ thống phát hiện phòng đã được giữ hoặc không còn khả dụng.
Hệ thống thông báo phòng không thể nhận cọc.
Quay lại bước 5 của Basic Flow.
7.1. Khách đã tồn tại
Hệ thống phát hiện khách đã tồn tại trong hệ thống.
Hệ thống hiển thị thông tin khách đã có.
Chủ trọ chọn khách tương ứng và tiếp tục nhập thông tin cọc.
Quay lại bước 9 của Basic Flow.
11.1. Khách hoàn tất thuê trong thời hạn giữ phòng
Chủ trọ xác nhận khách tiếp tục thuê.
Hệ thống liên kết khoản cọc giữ phòng với hợp đồng mới.
Hệ thống chuyển khoản cọc thành tiền cọc của hợp đồng.
Hệ thống cập nhật trạng thái cọc phù hợp.
Kết thúc Use Case.
11.2. Quá thời hạn giữ phòng nhưng khách không thuê
Hệ thống xác định khoản cọc đã hết hạn.
Hệ thống cập nhật trạng thái cọc thành “Mất cọc/Không hoàn lại”.
Hệ thống ghi nhận số tiền cọc vào khoản thu của nhà trọ.
Hệ thống cập nhật phòng về trạng thái “Có thể cho thuê”.
Kết thúc Use Case.

Exception flow
8.1. Số tiền cọc hoặc thời hạn giữ phòng không hợp lệ
Hệ thống phát hiện số tiền cọc hoặc thời hạn giữ phòng không hợp lệ.
Hệ thống hiển thị thông báo lỗi và yêu cầu Chủ trọ nhập lại.
Quay lại bước 7 của Basic Flow.
10.1. Lỗi khi lưu dữ liệu
Hệ thống phát hiện lỗi khi lưu thông tin cọc.
Hệ thống thông báo ghi nhận cọc không thành công.
Hệ thống không thay đổi trạng thái phòng.
Kết thúc Use Case.

USE CASE 06: Quản lý hợp đồng
Tiền điều kiện

- Chủ trọ đã đăng nhập thành công.
- Phòng đủ điều kiện cho thuê
- Khách thuê và phòng cần lập hợp đồng đã có thông tin trong hệ thống
  Hậu điều kiện
- Nếu lập hợp đồng thành công, hợp đồng được lưu vào CSDL
- Phòng được cập nhật sang trạng thái “đang thuê”; người đứng tên hợp đồng được xác lập là khách thuê chính thức.
- Thông tin nội thất bàn giao của phòng được ghi nhận trong hợp đồng.
  Actor chính
  Chủ trọ
  Actor phụ
  Không
  Basic Flow
  Chủ trọ
  Hệ thống

1. Chọn chức năng "Quản lý hợp đồng".
2. Hiển thị danh sách hợp đồng
3. Chủ chọ chọn “Lập hợp đồng mới”.
4. Hiển thị biểu mẫu lập hợp đồng.
5. Chọn khách thuê và phòng thuê.
6. Hiển thị thông tin khách, phòng, giá phòng và nội thất hiện có của phòng.
7. Nhập các thông tin hợp đồng (ngày bắt đầu, ngày kết thúc, tiền cọc và các điều khoản cần thiết).
8. Kiểm tra dữ liệu hợp đồng.
9. Xác nhận lập hợp đồng.
10. Lưu hợp đồng.

11. Cập nhật trạng thái hợp đồng thành “Đang hiệu lực”.

12. Cập nhật phòng sang trạng thái “Đang thuê”.

13. Ghi nhận người đứng tên hợp đồng là khách thuê chính thức.

14. Thông báo lập hợp đồng thành công.
    Alternative flow
    3.1. Cập nhật hợp đồng
    Chủ trọ chọn “Cập nhật hợp đồng”.
    Hệ thống hiển thị các hợp đồng đang hiệu lực.
    Chủ trọ chọn hợp đồng cần xem chi tiết.
    Hệ thống hiển thị chi tiết hợp đồng.
    Chủ trọ chỉnh sửa các thông tin được phép.
    Hệ thống kiểm tra và lưu thay đổi.
    Kết thúc Use Case.
    5.1. Khách đã có khoản cọc giữ phòng
    Hệ thống phát hiện khách đã có khoản cọc giữ phòng.
    Hệ thống hiển thị thông tin khoản cọc liên quan.
    Chủ trọ xác nhận sử dụng khoản cọc cho hợp đồng.
    Hệ thống liên kết khoản cọc với hợp đồng.
    Quay lại bước 7 của Basic Flow.
    5.2. Phòng không còn đủ điều kiện cho thuê
    Hệ thống phát hiện phòng không còn đủ điều kiện cho thuê.
    Hệ thống thông báo và không cho phép lập hợp đồng cho phòng đó.
    Quay lại bước 5 của Basic Flow.

Exception flow
8.1. Ngày bắt đầu, ngày kết thúc hoặc dữ liệu hợp đồng không hợp lệ
Hệ thống phát hiện dữ liệu hợp đồng không hợp lệ.
Hệ thống thông báo lỗi.
Hệ thống yêu cầu Chủ trọ chỉnh sửa thông tin.
Quay lại bước 7 của Basic Flow.
10.1. Hợp đồng không lưu được
Hệ thống phát hiện lỗi khi lưu hợp đồng.
Hệ thống thông báo lưu hợp đồng không thành công.
Hệ thống không cập nhật trạng thái phòng.
Kết thúc Use Case.

USE CASE 07: Quản lý điện nước
Tiền điều kiện

- Chủ trọ đã đăng nhập thành công.
- Phòng cần quản lý đang tồn tại trong hệ thống.
- Phòng có hợp đồng thuê đang hiệu lực nếu thực hiện tính tiền điện nước cho kỳ thuê.
  Hậu điều kiện
- Thông tin chỉ số điện nước của phòng được cập nhật/xác nhận.
- Lượng điện nước sử dụng được xác định dựa trên chỉ số kỳ trước và kỳ hiện tại.
- Tiền điện, tiền nước được tính theo đơn giá áp dụng của kỳ.
- Lịch sử điện nước được lưu trong CSDL.
  Actor chính
  Chủ trọ
  Actor phụ
  Khách thuê
  Actor
  Hệ thống

1. Chọn chức năng "Quản lý điện nước".
2. Hiển thị danh sách các phòng và thông tin điện nước của kỳ hiện tại.
3. Chọn phòng cần quản lý.
4. Hiển thị chỉ số kỳ trước, chỉ số kỳ hiện tại, lượng sử dụng và đơn giá điện nước.
5. Kiểm tra chỉ số điện do khách nhập hoặc nhập/cập nhật chỉ số.
6. Kiểm tra tính hợp lệ của chỉ số và so sánh với chỉ số kỳ trước.
7. Xác nhận chỉ số điện.
8. Tính lượng điện sử dụng của kỳ hiện tại.
9. Kiểm tra/cập nhật đơn giá áp dụng.
10. Áp dụng đơn giá tương ứng để tính tiền điện và tiền nước.
11. Xác nhận kết quả.
12. Lưu chỉ số, lượng sử dụng, đơn giá và tiền điện nước vào CSDL; hiển thị thông báo thành công.
    Alternative flow
    2.1. Chưa có dữ liệu điện của kỳ hiện tại
    Hệ thống không tìm thấy chỉ số điện của các phòng trong kỳ hiện tại.
    Hệ thống hiển thị trạng thái chưa có dữ liệu.
    Hệ thống cho phép Chủ trọ nhập/cập nhật chỉ số điện.
    Quay lại bước 3 của Basic Flow.
    5.1. Chỉ số điện được khách thuê nhập trước đó
    Hệ thống hiển thị chỉ số điện và hình ảnh minh chứng do khách thuê gửi.
    Chủ trọ kiểm tra thông tin chỉ số điện.
    Quay lại bước 7 của Basic Flow.
    5.2. Chủ trọ phát hiện chỉ số điện chưa chính xác
    Chủ trọ cập nhật lại chỉ số điện.
    Hệ thống kiểm tra lại thông tin chỉ số điện.
    Quay lại bước 7 của Basic Flow.

Exception flow
6.1. Chỉ số điện kỳ hiện tại nhỏ hơn chỉ số điện kỳ trước
Hệ thống phát hiện chỉ số điện kỳ hiện tại nhỏ hơn chỉ số điện kỳ trước.
Hệ thống thông báo chỉ số điện không hợp lệ.
Hệ thống yêu cầu kiểm tra và nhập lại chỉ số điện.
Quay lại bước 5 của Basic Flow.
6.2. Chỉ số điện do khách thuê nhập không có hình ảnh minh chứng
Hệ thống phát hiện chỉ số điện chưa có hình ảnh minh chứng.
Hệ thống thông báo yêu cầu bổ sung hình ảnh minh chứng.
Hệ thống không cho xác nhận chỉ số điện khi chưa có minh chứng.
Quay lại bước 7 của Basic Flow.
10.1. Không có thông tin đơn giá điện theo hợp đồng hoặc số người của phòng
Hệ thống phát hiện thiếu thông tin cần thiết để tính tiền điện nước.
Hệ thống thông báo chưa đủ dữ liệu để tính tiền điện nước.
Kết thúc Use Case.
12.1. Lỗi khi lưu dữ liệu
Hệ thống phát hiện lỗi khi lưu dữ liệu.
Hệ thống thông báo không thể lưu thông tin điện nước.
Hệ thống không xác nhận kết quả cập nhật.
Kết thúc Use Case.

USE CASE 08: Tính tiền phòng

Tiền điều kiện

- Chủ trọ đã đăng nhập thành công.
- Phòng có hợp đồng đang hiệu lực trong kỳ tính tiền.
- Thông tin giá phòng và phí dịch vụ đã được thiết lập.
- Chỉ số và tiền điện nước của kỳ đã được xác nhận hoặc có đủ dữ liệu để tính.
  Hậu điều kiện
- Khoản phải thu của kỳ được tạo thành công.
- Tổng tiền phải thanh toán được lưu trong CSDL.
- Khách thuê có thể xem khoản phải trả.
- Hệ thống có thể gửi thông báo khoản phải thu cho khách thuê.
  Actor chính
  Chủ trọ
  Actor phụ
  Khách thuê
  Basic flow
  Chủ trọ
  Hệ thống

1. Chọn chức năng "Tính tiền phòng".
2. Hiển thị các phòng cần tính tiền trong kỳ.
3. Chọn phòng/kỳ cần tính tiền.
4. Lấy thông tin hợp đồng, giá phòng, điện nước, phí dịch vụ và phí phát sinh của phòng.
5. Kiểm tra các khoản tiền được hệ thống lấy ra.
6. Tính tiền phòng theo hợp đồng.

7. Tính tiền điện và tiền nước.

8. Tính tiền nước theo mức 100.000 đồng/người/tháng.

9. Cộng phí dịch vụ và các khoản phí phát sinh.

10. Áp dụng các khoản giảm trừ nếu có.
11. Kiểm tra tổng tiền phải thanh toán.
12. Hiển thị chi tiết các khoản tiền và tổng tiền phải thanh toán.
13. Xác nhận tạo khoản phải thu.
14. Lưu khoản phải thu vào CSDL và đặt trạng thái “Chưa thanh toán”.

15. Gửi thông báo khoản phải thanh toán cho khách thuê.
    Alternative flow
    5.1. Thông tin khoản phí hoặc phát sinh chưa chính xác
    Chủ trọ cập nhật lại khoản phí hoặc khoản phát sinh.
    Hệ thống kiểm tra thông tin được cập nhật.
    Quay lại bước 11 của Basic Flow.
    11.1. Có khoản giảm trừ cho khách thuê
    Hệ thống áp dụng khoản giảm trừ vào tổng tiền phải thanh toán.
    Hệ thống cập nhật lại tổng tiền.
    Quay lại bước 12 của Basic Flow.

Exception Flow
4.1. Không tìm thấy hợp đồng đang hiệu lực
Hệ thống không tìm thấy hợp đồng hợp lệ của phòng trong kỳ tính tiền.
Hệ thống thông báo không thể tính tiền do phòng chưa có hợp đồng đang hiệu lực.
Kết thúc Use Case.
7.1. Chưa có chỉ số điện được xác nhận
Hệ thống phát hiện chưa có chỉ số điện được xác nhận cho kỳ tính tiền.
Hệ thống thông báo chưa đủ dữ liệu điện để tính tiền.
Kết thúc Use Case.
8.1. Không có đủ thông tin số người để tính tiền nước
Hệ thống không xác định được số người áp dụng cho kỳ tính tiền.
Hệ thống thông báo chưa đủ thông tin để tính tiền nước.
Kết thúc Use Case.
14.1. Khoản phải thu của kỳ đã tồn tại
Hệ thống phát hiện khoản phải thu của phòng trong kỳ đã được tạo.
Hệ thống thông báo khoản phải thu đã tồn tại.
Hệ thống không tạo khoản phải thu trùng.
Kết thúc Use Case.
14.2. Lỗi khi lưu khoản phải thu
Hệ thống phát hiện lỗi trong quá trình lưu khoản phải thu.
Hệ thống thông báo không thể lưu khoản phải thu.
Hệ thống không hoàn tất giao dịch.
Kết thúc Use Case.

USE CASE 09: Quản lý thanh toán

Tiền điều kiện

- Chủ trọ đã đăng nhập thành công.
- Khoản phải thu của khách thuê đã được tạo.
- Khoản phải thu chưa ở trạng thái đã thanh toán toàn bộ.
  Hậu điều kiện
- Giao dịch thanh toán được lưu vào CSDL.
- Số tiền đã thanh toán được cập nhật.
- Trạng thái thanh toán được cập nhật tương ứng.
- Công nợ còn lại được xác định/cập nhật.
- Lịch sử thanh toán được lưu.
  Actor chính
  Chủ trọ
  Actor phụ
  Khách thuê
  Actor
  Hệ thống

1. Chọn chức năng "Quản lý thanh toán".
2. Hiển thị danh sách các khoản phải thu và trạng thái thanh toán.
3. Chọn khoản phải thu cần xử lý.
4. Hiển thị chi tiết khoản phải thu, số tiền đã thanh toán và số tiền còn phải thanh toán.
5. Khách thuê thực hiện thanh toán.
6. Hệ thống ghi nhận thông tin thanh toán/chờ chủ trọ xác nhận.
7. Chủ trọ kiểm tra thông tin thanh toán.
8. Hiển thị số tiền cần đối chiếu.
9. Xác nhận thanh toán hợp lệ.
10. Lưu giao dịch thanh toán vào CSDL.

11. Tính số tiền còn phải thanh toán.

12. Cập nhật trạng thái thanh toán.

13. Lưu lịch sử thanh toán và hiển thị kết quả.
    Alternative flow

5.1. Khách thuê chỉ thanh toán một phần.
11.1. Hệ thống xác định số tiền còn lại và đặt trạng thái "Thanh toán một phần".
5.2. Khách thuê thanh toán đủ số tiền.
12.1. Hệ thống đặt trạng thái "Đã thanh toán".
5.3. Khoản phải thu đã quá hạn nhưng khách thực hiện thanh toán.
12.2. Sau khi xác nhận thanh toán, hệ thống cập nhật lại trạng thái theo số tiền còn lại.
Exception flow

9.1. Số tiền thanh toán không hợp lệ.

1. Hệ thống thông báo số tiền không hợp lệ.
2. Yêu cầu kiểm tra lại thông tin thanh toán.
   9.2. Khoản phải thu không tồn tại.
3. Hệ thống thông báo không tìm thấy khoản phải thu.
4. Dừng xử lý.
   10.1. Lỗi lưu giao dịch.
5. Hệ thống thông báo không thể lưu thông tin thanh toán.
6. Không cập nhật trạng thái thanh toán.
   10.2. Giao dịch thanh toán đã được ghi nhận trước đó.
7. Hệ thống cảnh báo giao dịch có khả năng bị trùng.
8. Không ghi nhận giao dịch trùng.

USE CASE 10: Quản lý công nợ

Tiền điều kiện

- Chủ trọ đã đăng nhập thành công.
- Các khoản phải thu và giao dịch thanh toán đã được lưu trong hệ thống.
  Hậu điều kiện
- Công nợ của từng khách thuê được xác định chính xác.
- Chủ trọ có thể xem số tiền còn nợ, tình trạng quá hạn và lịch sử công nợ.
- Dữ liệu công nợ được cập nhật theo các khoản thanh toán mới.
  Actor chính
  Chủ trọ
  Actor phụ
  Khách thuê
  Actor
  Hệ thống

1. Chọn chức năng "Quản lý công nợ".
2. Hiển thị danh sách khách thuê và tình trạng công nợ.
3. Chọn khách thuê cần xem.
4. Hiển thị các khoản phải thu, số tiền đã thanh toán và số tiền còn nợ.
5. Kiểm tra chi tiết công nợ.
6. Tính số tiền công nợ dựa trên các khoản phải thu chưa được thanh toán đầy đủ.

7. Kiểm tra ngày đến hạn của từng khoản phải thu.

8. Đánh dấu các khoản đã quá hạn nếu vẫn còn số tiền chưa thanh toán.
9. Xem/xử lý tình trạng công nợ.
10. Hiển thị tổng công nợ và chi tiết theo từng kỳ.
11. Cập nhật hoặc xử lý thanh toán nếu khách đã thanh toán.
12. Đồng bộ công nợ với thông tin thanh toán mới và cập nhật trạng thái tương ứng.
    Alternative flow

4.1. Khách thuê có nhiều khoản nợ ở nhiều kỳ.
6.1. Hệ thống hiển thị riêng từng khoản phải thu và tổng số công nợ.
4.2. Khách thuê chỉ còn nợ một phần của khoản phải thu.
6.2. Hệ thống ghi nhận phần chưa thanh toán là công nợ còn lại.
9.1. Chủ trọ lọc công nợ theo căn.
10.1. Hệ thống chỉ hiển thị công nợ của khách thuê thuộc căn được chọn.
9.2. Chủ trọ lọc theo thời gian.
10.2. Hệ thống hiển thị công nợ phát sinh trong khoảng thời gian được chọn.
Exception flow

6.1. Dữ liệu khoản phải thu hoặc thanh toán không đầy đủ.

1. Hệ thống thông báo không đủ dữ liệu để xác định công nợ.2. Yêu cầu kiểm tra dữ liệu liên quan.
   8.1. Lỗi xác định ngày đến hạn.
1. Hệ thống thông báo không thể xác định trạng thái quá hạn.
1. Không tự động thay đổi trạng thái cho đến khi dữ liệu hợp lệ.
   12.1. Lỗi đồng bộ dữ liệu thanh toán và công nợ.
1. Hệ thống thông báo lỗi.
1. Không ghi nhận kết quả cập nhật không hoàn chỉnh.

USE CASE 11: Quản lý thu chi

Tiền điều kiện

- Chủ trọ đã đăng nhập thành công.
- Các thông tin liên quan đến khoản thu, khoản chi đã có hoặc có thể được nhập vào hệ thống.
  Hậu điều kiện
- Các khoản thu và chi được lưu và cập nhật trong hệ thống.
- Chủ trọ có thể theo dõi tổng thu, tổng chi và số dư.
- Dữ liệu thu chi được cập nhật chính xác sau khi thêm, sửa hoặc xóa.
  Actor chính
  Chủ trọ
  Actor phụ
  Khách thuê
  Actor
  Hệ thống

1. Chọn chức năng "Quản lý thu chi".
2. Hiển thị danh sách các khoản thu, khoản chi và thông tin tổng quan.
3. Chọn thêm mới, chỉnh sửa hoặc xem chi tiết khoản thu/chi.
4. Hiển thị biểu mẫu hoặc thông tin chi tiết tương ứng.
5. Nhập hoặc cập nhật thông tin khoản thu/chi.
6. Kiểm tra tính hợp lệ của thông tin.
7. Xác nhận lưu thông tin.
8. Lưu khoản thu/chi vào hệ thống.

9. Cập nhật tổng thu, tổng chi và số dư.
10. Xem danh sách hoặc lọc các khoản thu/chi.
11. Hiển thị dữ liệu theo điều kiện được chọn.
    Alternative flow

3.1. Chủ trọ chọn thêm khoản thu mới.
4.1. Hệ thống hiển thị biểu mẫu nhập khoản thu.
3.2. Chủ trọ chọn thêm khoản chi mới.
4.2. Hệ thống hiển thị biểu mẫu nhập khoản chi.
10.1. Chủ trọ lọc theo khoảng thời gian.
11.1. Hệ thống hiển thị các khoản thu/chi trong khoảng thời gian được chọn.
10.2. Chủ trọ lọc theo loại giao dịch.
11.2. Hệ thống chỉ hiển thị các khoản thu hoặc khoản chi tương ứng.
Exception flow

6.1. Thông tin nhập không đầy đủ hoặc không hợp lệ.

1. Hệ thống thông báo lỗi.
2. Yêu cầu chủ trọ kiểm tra và nhập lại thông tin.
   8.1. Lỗi khi lưu dữ liệu.
3. Hệ thống thông báo không thể lưu khoản thu/chi.
4. Không cập nhật dữ liệu chưa được lưu thành công.
   9.1. Lỗi cập nhật số liệu tổng hợp.
5. Hệ thống thông báo lỗi cập nhật.
6. Giữ nguyên dữ liệu trước đó cho đến khi cập nhật thành công.

USE CASE 12: Quản lý sự cố

Tiền điều kiện

- Chủ trọ đã đăng nhập thành công.
- Thông tin phòng và khách thuê đã được lưu trong hệ thống.
  Hậu điều kiện
- Thông tin sự cố được ghi nhận và cập nhật.
- Tình trạng xử lý sự cố được theo dõi trong hệ thống.
- Các sự cố đã xử lý được lưu lại lịch sử.
  Actor chính
  Chủ trọ
  Actor phụ
  Khách thuê
  Actor
  Hệ thống

1. Chọn chức năng "Quản lý sự cố".
2. Hiển thị danh sách các sự cố và trạng thái xử lý.
3. Chọn một sự cố để xem chi tiết hoặc thêm sự cố mới.
4. Hiển thị thông tin chi tiết hoặc biểu mẫu ghi nhận sự cố.
5. Nhập hoặc cập nhật thông tin sự cố.
6. Kiểm tra tính hợp lệ của thông tin.
7. Xác nhận lưu sự cố.
8. Lưu thông tin sự cố vào hệ thống.
9. Cập nhật tình trạng xử lý sự cố.
10. Cập nhật trạng thái sự cố tương ứng.
11. Xem danh sách sự cố.
12. Hiển thị danh sách và tình trạng hiện tại của từng sự cố.
    Alternative flow

3.1. Khách thuê báo cáo sự cố.
4.1. Hệ thống ghi nhận thông tin sự cố do khách thuê cung cấp.
9.1. Sự cố đã được xử lý hoàn tất.
10.1. Hệ thống cập nhật trạng thái thành "Đã xử lý".
9.2. Sự cố đang được xử lý.
10.2. Hệ thống cập nhật trạng thái thành "Đang xử lý".
11.1. Chủ trọ lọc sự cố theo phòng.
12.1. Hệ thống chỉ hiển thị các sự cố thuộc phòng được chọn.
Exception flow

6.1. Thông tin sự cố không đầy đủ.

1. Hệ thống thông báo yêu cầu nhập đầy đủ thông tin cần thiết.2. Không lưu sự cố cho đến khi dữ liệu hợp lệ.
   8.1. Lỗi khi lưu thông tin sự cố.
1. Hệ thống thông báo lỗi.
1. Không ghi nhận thông tin chưa được lưu thành công.
   10.1. Lỗi cập nhật trạng thái sự cố.
1. Hệ thống thông báo không thể cập nhật trạng thái.
1. Giữ nguyên trạng thái trước đó.

USE CASE 13: Xử lý trả phòng

Tiền điều kiện

- Chủ trọ đã đăng nhập thành công.
- Khách thuê đang có hợp đồng thuê còn hiệu lực.
- Thông tin phòng, hợp đồng và các khoản thanh toán đã được lưu trong hệ thống.
  Hậu điều kiện
- Thông tin trả phòng được ghi nhận.
- Các khoản công nợ và chi phí liên quan được xác định.
- Hợp đồng thuê được cập nhật trạng thái kết thúc sau khi hoàn tất trả phòng.
- Trạng thái phòng được cập nhật tương ứng.
  Actor chính
  Chủ trọ
  Actor phụ
  Khách thuê
  Actor
  Hệ thống

1. Chọn chức năng "Xử lý trả phòng".
2. Hiển thị danh sách khách thuê và hợp đồng đang thuê.
3. Chọn khách thuê cần trả phòng.
4. Hiển thị thông tin hợp đồng, phòng và các khoản thanh toán liên quan.
5. Kiểm tra tình trạng phòng và các khoản còn nợ.
6. Tính toán các khoản phải thanh toán còn lại và hiển thị công nợ.
7. Nhập thông tin kiểm tra phòng và chi phí phát sinh nếu có.
8. Ghi nhận tình trạng phòng và các khoản chi phí phát sinh.
9. Xác nhận hoàn tất thủ tục trả phòng.
10. Cập nhật trạng thái hợp đồng thành kết thúc.

11. Cập nhật trạng thái phòng thành có thể cho thuê hoặc trạng thái phù hợp.

12. Lưu lịch sử trả phòng.
    Alternative flow

5.1. Khách thuê không còn công nợ.
6.1. Hệ thống xác nhận không còn khoản thanh toán cần xử lý.
5.2. Khách thuê còn công nợ.
6.2. Hệ thống hiển thị chi tiết số tiền còn nợ để xử lý trước khi hoàn tất trả phòng.
7.1. Phòng có hư hỏng hoặc phát sinh chi phí.
8.1. Hệ thống ghi nhận chi phí phát sinh vào thông tin trả phòng.
9.1. Chủ trọ hủy thao tác trả phòng.
10.1. Hệ thống không thay đổi trạng thái hợp đồng và phòng.
Exception flow

4.1. Không tìm thấy hợp đồng thuê hợp lệ.

1. Hệ thống thông báo không thể xử lý trả phòng.
2. Yêu cầu kiểm tra lại thông tin hợp đồng.
   6.1. Lỗi xác định công nợ hoặc chi phí.
3. Hệ thống thông báo không thể xác định chính xác các khoản cần thanh toán.
4. Không cho hoàn tất trả phòng cho đến khi dữ liệu hợp lệ.
   10.1. Lỗi cập nhật trạng thái hợp đồng hoặc phòng.
5. Hệ thống thông báo lỗi cập nhật.
6. Không ghi nhận thủ tục trả phòng chưa hoàn tất.

USE CASE 14: Xem báo cáo

Tiền điều kiện

- Chủ trọ đã đăng nhập thành công.
- Dữ liệu về phòng, khách thuê, hợp đồng, thu chi và công nợ đã được lưu trong hệ thống.
  Hậu điều kiện
- Chủ trọ xem được báo cáo theo điều kiện đã chọn.
- Các số liệu báo cáo được tổng hợp từ dữ liệu hiện có trong hệ thống.
  Actor chính
  Chủ trọ
  Actor phụ
  Không có
  Actor
  Hệ thống

1. Chọn chức năng "Xem báo cáo".
2. Hiển thị danh sách các loại báo cáo có thể xem.
3. Chọn loại báo cáo cần xem.
4. Hiển thị các điều kiện lọc báo cáo.
5. Chọn khoảng thời gian hoặc các điều kiện cần thiết.
6. Kiểm tra điều kiện lọc.
7. Yêu cầu tạo báo cáo.
8. Tổng hợp dữ liệu phù hợp với điều kiện đã chọn.

9. Tính toán các số liệu cần thiết.

10. Hiển thị kết quả báo cáo.
11. Xem chi tiết các số liệu trong báo cáo.
12. Hiển thị thông tin chi tiết tương ứng.
    Alternative flow

3.1. Chủ trọ chọn báo cáo doanh thu.
4.1. Hệ thống chuẩn bị dữ liệu về các khoản thu và chi.
3.2. Chủ trọ chọn báo cáo công nợ.
4.2. Hệ thống chuẩn bị dữ liệu về các khoản phải thu và số tiền còn nợ.
3.3. Chủ trọ chọn báo cáo tình trạng phòng.
4.3. Hệ thống tổng hợp số lượng phòng đang thuê, phòng trống và các trạng thái khác.
11.1. Chủ trọ thay đổi khoảng thời gian xem báo cáo.
12.1. Hệ thống tổng hợp lại và hiển thị báo cáo theo khoảng thời gian mới.
Exception flow

6.1. Điều kiện hoặc khoảng thời gian không hợp lệ.

1. Hệ thống thông báo lỗi.
2. Yêu cầu chủ trọ chọn lại điều kiện phù hợp.
   8.1. Không có dữ liệu phù hợp với điều kiện đã chọn.
3. Hệ thống thông báo không có dữ liệu.
4. Hiển thị báo cáo trống hoặc yêu cầu thay đổi điều kiện tìm kiếm.
   9.1. Lỗi khi tổng hợp dữ liệu.
5. Hệ thống thông báo không thể tạo báo cáo.
6. Không hiển thị số liệu chưa được tổng hợp đầy đủ.

USE CASE 15: Quản lý thông báo

Tiền điều kiện

- Chủ trọ đã đăng nhập thành công.
- Thông tin khách thuê và phòng đã được lưu trong hệ thống.
  Hậu điều kiện
- Thông báo được tạo và gửi đến đúng đối tượng.
- Chủ trọ có thể quản lý danh sách thông báo.
- Khách thuê có thể nhận và xem các thông báo liên quan.
  Actor chính
  Chủ trọ
  Actor phụ
  Khách thuê
  Actor
  Hệ thống

1. Chọn chức năng "Quản lý thông báo".
2. Hiển thị danh sách các thông báo đã tạo.
3. Chọn tạo thông báo mới hoặc xem thông báo đã có.
4. Hiển thị biểu mẫu tạo thông báo hoặc nội dung thông báo chi tiết.
5. Nhập nội dung và chọn đối tượng nhận thông báo.
6. Kiểm tra tính hợp lệ của nội dung và đối tượng nhận.
7. Xác nhận gửi thông báo.
8. Lưu thông báo vào hệ thống.

9. Gửi thông báo đến khách thuê được chọn.
10. Quản lý thông báo đã tạo.
11. Hiển thị thông tin và trạng thái của từng thông báo.
    Alternative flow

5.1. Chủ trọ gửi thông báo cho tất cả khách thuê.
6.1. Hệ thống xác định toàn bộ khách thuê đang hoạt động là đối tượng nhận.
5.2. Chủ trọ gửi thông báo cho khách thuê của một phòng cụ thể.
6.2. Hệ thống xác định khách thuê thuộc phòng được chọn.
10.1. Chủ trọ chỉnh sửa thông báo chưa gửi.
11.1. Hệ thống cập nhật nội dung thông báo sau khi chủ trọ xác nhận.
10.2. Khách thuê xem thông báo.
11.2. Hệ thống hiển thị nội dung và trạng thái đã đọc của thông báo.
Exception flow

6.1. Nội dung thông báo trống hoặc đối tượng nhận không hợp lệ.

1. Hệ thống thông báo lỗi.
2. Yêu cầu chủ trọ nhập lại thông tin cần thiết.
   8.1. Lỗi khi lưu thông báo.
3. Hệ thống thông báo không thể lưu thông báo.
4. Không thực hiện gửi thông báo khi chưa lưu thành công.
   9.1. Lỗi gửi thông báo đến một hoặc nhiều khách thuê.
5. Hệ thống thông báo lỗi gửi.
6. Ghi nhận trạng thái gửi thất bại để chủ trọ có thể kiểm tra hoặc gửi lại.

USE CASE 16: Xem thông tin thuê
Tiền điều kiện

- Khách thuê đã được Chủ trọ cấp tài khoản và đăng nhập thành công vào hệ thống.
- Khách thuê đang có ít nhất một hợp đồng thuê phòng còn hiệu lực.
  Hậu điều kiện
- Không làm thay đổi bất kỳ dữ liệu nghiệp vụ nào trên hệ thống.
- Khách thuê nắm bắt được đầy đủ, minh bạch các thông tin về phòng, giá cả và thời hạn hợp đồng của mình.
  Actor chính
  Khách thuê
  Actor phụ
  Không
  Actor
  Hệ thống

1. Khách thuê chọn chức năng "Thông tin phòng thuê" trên giao diện ứng dụng/web.
2. Hệ thống tiếp nhận ID của tài khoản đang đăng nhập, tiến hành truy xuất CSDL để tìm kiếm Hợp đồng đang ở trạng thái "Active" của ID này.

3. Hệ thống tải dữ liệu và hiển thị chi tiết Thông tin Phòng (Thuộc căn nào, Tầng mấy, Mã phòng, Diện tích, Danh sách nội thất bàn giao ban đầu).

4. Hệ thống hiển thị chi tiết Thông tin Tài chính (Tiền thuê cơ bản/tháng, Đơn giá điện, Đơn giá nước, Các loại phí dịch vụ bắt buộc: Rác, Wifi, Quản lý).

5. Hệ thống hiển thị Thời hạn Hợp đồng (Ngày bắt đầu, Ngày kết thúc, Số tiền đã đặt cọc giữ chỗ).
6. Khách thuê thực hiện xem xét, kiểm tra các thông tin và nhấn "Thoát" hoặc chuyển sang trang khác.

Alternative flow
1.1. Khách thuê có nhiều hơn 1 phòng đang thuê (Thuê nhiều phòng cùng lúc).
1.1.1. Hệ thống hiển thị danh sách các phòng đang thuê dưới dạng các thẻ (Cards).
1.1.2. Khách thuê click chọn vào thẻ phòng muốn xem.
1.1.3. Hệ thống hiển thị thông tin chi tiết tương ứng với phòng đó.
6.1. Khách thuê muốn xem bản scan Hợp đồng giấy.
6.1.1. Khách nhấn nút "Xem file Hợp đồng đính kèm".
6.1.2. Hệ thống load file PDF/Ảnh hợp đồng gốc đã được Chủ trọ tải lên trước đó để khách xem trực tiếp.
Exception flow
2.1. Tài khoản khách thuê không có bất kỳ hợp đồng nào đang có hiệu lực (Đã thanh lý hoặc chưa bắt đầu).
2.1.1. Hệ thống không tìm thấy dữ liệu hợp lệ.
2.1.2. Hệ thống hiển thị thông báo trạng thái trống: "Bạn hiện chưa có thông tin phòng thuê nào đang hoạt động. Vui lòng liên hệ Chủ trọ nếu có sai sót".
2.1.3. Ẩn toàn bộ các layout hiển thị chi tiết phòng và tài chính.

USE CASE 17: Xem tiền phải trả
Tiền điều kiện

- Khách thuê đã đăng nhập thành công.
- Khách đang có hợp đồng thuê còn hiệu lực
- Hệ thống đã phát sinh khoản phải trả cho kỳ tương ứng
  Hậu điều kiện
- Không làm thay đổi dữ liệu nghiệp vụ
- Thông tin khoản phải trả được hiển thị cho khách thuê.
  Actor chính
  Khách thuê
  Actor phụ
  Không
  Basic flow
  Khách thuê
  Hệ thống

1. Chọn chức năng “Xem tiền phải trả”
2. Xác định hợp đồng/phòng của khách thuê.
3. Chọn ‘tháng/kỳ cần xem’, chọn xem kỳ hiện tại
4. Truy xuất khoản phải trả của kỳ hiện tại.

5. Hiển thị chi tiết các khoản phải trả.
6. Xem thông tin chi tiết.

Alternative flow

3.1. Chọn xem một kỳ khác

1. Chọn tháng/kỳ cần xem khác với kỳ hiện tại.

2. Hệ thống truy xuất dữ liệu khoản phải trả của kỳ được chọn.

3. Hệ thống hiển thị chi tiết các khoản phải trả của kỳ đó.

4. Quay lại bước 6 của Basic Flow.

4.1. Có công nợ từ kỳ trước

1. Hệ thống phát hiện khách thuê còn công nợ từ các kỳ trước.

2. Hệ thống hiển thị riêng khoản công nợ còn lại bên cạnh khoản phải trả của kỳ hiện tại.

3. Quay lại bước 6 của Basic Flow.

Exception flow

4.1. Chưa phát sinh khoản phải trả cho kỳ được chọn

1. Hệ thống không tìm thấy khoản phải trả của kỳ được chọn.

2. Hệ thống thông báo “Chưa có thông tin tiền phải trả cho kỳ này.”

3. Kết thúc Use Case.

USE CASE 19: Nhập chỉ số điện
Tiền điều kiện

- Khách thuê đã đăng nhập thành công.
- Khách đang có phòng thuê hợp lệ.
- Đã đến thời gian nhập chỉ số điện nước của kỳ.
- Chỉ số kỳ trước của phòng đã tồn tại trong hệ thống.
  Hậu điều kiện
- Chỉ số điện nước mới được gửi thành công.
- Hình ảnh minh chứng được lưu/gắn với lần nhập chỉ số.
- Dữ liệu ở trạng thái “Chờ xác nhận” để Chủ trọ kiểm tra.
- Sau khi được xác nhận, dữ liệu có thể được sử dụng để tính tiền điện.
  Actor chính
  Khách thuê
  Actor phụ
  Chủ trọ
  Basic flow
  Actor
  Hệ thống

1. Chọn chức năng “Nhập chỉ số điện”.
2. Hiển thị thông tin phòng, chỉ số điện kỳ trước và biểu mẫu nhập chỉ số điện kỳ hiện tại.
3. Nhập chỉ số điện hiện tại.
4. Kiểm tra dữ liệu chỉ số điện.
5. Chụp/chọn hình ảnh minh chứng chỉ số điện.
6. Kiểm tra hình ảnh minh chứng được đính kèm.
7. Xác nhận gửi chỉ số điện.
8. Lưu chỉ số điện và hình ảnh minh chứng vào CSDL.

9. Đặt trạng thái dữ liệu là “Chờ xác nhận”.

10. Thông báo cho Chủ trọ có chỉ số điện mới cần kiểm tra.
11. Chủ trọ mở thông tin chỉ số điện được gửi.
12. Hiển thị chỉ số điện, chỉ số điện kỳ trước và hình ảnh minh chứng.
13. Kiểm tra và xác nhận chỉ số điện.
14. Cập nhật trạng thái thành “Đã xác nhận” và cho phép sử dụng dữ liệu để tính tiền điện.
    Alternative flow
    3.1. Khách thuê muốn thay đổi chỉ số điện trước khi gửi
    Khách thuê chỉnh sửa lại chỉ số điện đã nhập.
    Hệ thống cập nhật giá trị chỉ số điện mới.
    Quay lại bước 7 của Basic Flow.
    5.1. Khách thuê chọn lại hình ảnh minh chứng
    Khách thuê chọn hình ảnh minh chứng khác.
    Hệ thống thay thế hình ảnh cũ bằng hình ảnh mới.
    Quay lại bước 7 của Basic Flow.
    13.1. Chủ trọ phát hiện chỉ số điện không chính xác
    Chủ trọ xác định chỉ số điện cần được điều chỉnh.
    Hệ thống chuyển trạng thái sang “Cần điều chỉnh”.
    Hệ thống thông báo cho khách thuê nhập lại chỉ số điện.
    Quay lại bước 3 của Basic Flow.

Exception flow
4.1. Chỉ số điện nhỏ hơn chỉ số kỳ trước
Hệ thống phát hiện chỉ số điện hiện tại nhỏ hơn chỉ số điện kỳ trước.
Hệ thống thông báo chỉ số không hợp lệ.
Quay lại bước 3 của Basic Flow.
6.1. Không có hình ảnh minh chứng
Hệ thống phát hiện chưa có hình ảnh minh chứng.
Hệ thống thông báo yêu cầu gửi hình ảnh minh chứng.
Hệ thống không cho phép gửi chỉ số điện.
Quay lại bước 5 của Basic Flow.
6.2. Hình ảnh minh chứng không được tải lên thành công
Hệ thống thông báo lỗi tải hình ảnh.
Hệ thống yêu cầu chọn/tải lại hình ảnh.
Quay lại bước 5 của Basic Flow.
8.1. Lỗi khi lưu dữ liệu
Hệ thống phát hiện lỗi khi lưu chỉ số điện.
Hệ thống thông báo không thể gửi chỉ số điện.
Hệ thống không chuyển trạng thái sang “Chờ xác nhận”.
Kết thúc Use Case.

USE CASE 21: Yêu cầu gia hạn
Tiền điều kiện

- Khách thuê đã đăng nhập thành công.
- Khách có hợp đồng thuê đang hiệu lực và hợp đồng chưa được thanh lý/chấm dứt.
  Hậu điều kiện
- Nếu gửi yêu cầu thành công, yêu cầu gia hạn được lưu vào CSDL với trạng thái “Chờ xử lý” và liên kết với hợp đồng hiện tại.
- Hợp đồng hiện tại chưa tự động thay đổi thời hạn.
  Actor chính
  Khách thuê
  Actor phụ
  Không
  Actor
  Hệ thống

1. Chọn chức năng "Yêu cầu gia hạn".
2. Hệ thống hiển thị thông tin hợp đồng hiện tại, bao gồm thời hạn hợp đồng.
3. Khách thuê chọn/nhập thời gian mong muốn gia hạn.
4. Hệ thống kiểm tra thông tin yêu cầu.
5. Khách thuê xác nhận gửi yêu cầu.
6. Hệ thống lưu yêu cầu gia hạn và đặt trạng thái yêu cầu là “Chờ xử lý”.

7. Hệ thống thông báo gửi yêu cầu thành công.
   Alternative flow

3.1. Khách thay đổi thời gian muốn gia hạn
3.1.1. Hệ thống kiểm tra và quay lại bước 5.

2.1. Đã có yêu cầu gia hạn đang chờ xử lý
2.1.1. Hệ thống hiển thị yêu cầu hiện tại và không tạo thêm yêu cầu trùng lặp
Exception flow

3.2 Thời gian gia hạn không hợp lệ
3.2.1. Hệ thống thông báo lỗi và yêu cầu khách nhập lại.

6.1 Không lưu được yêu cầu
6.1.1. Hệ thống thông báo gửi yêu cầu thất bại và không thay đổi hợp đồng.

USE CASE 22: Yêu cầu trả phòng
Tiền điều kiện

- Khách thuê đã đăng nhập thành công.
- Khách có hợp đồng thuê đang hiệu lực
  Hậu điều kiện
- Nếu gửi yêu cầu thành công, yêu cầu trả phòng được lưu vào CSDL với trạng thái “Chờ xử lý” và liên kết với hợp đồng hiện tại.
- Hợp đồng và trạng thái phòng chưa bị thay đổi ngay.
  Actor chính
  Khách thuê
  Actor phụ
  Không
  Actor
  Hệ thống

1. Chọn chức năng "Yêu cầu trả phòng".
2. Hệ thống hiển thị thông tin hợp đồng và phòng đang thuê.
3. Khách thuê nhập/chọn ngày dự kiến trả phòng.
4. Hệ thống kiểm tra thông tin yêu cầu.
5. Khách thuê xác nhận gửi yêu cầu trả phòng.
6. Hệ thống lưu yêu cầu trả phòng và đặt trạng thái yêu cầu là “Chờ xử lý”.

7. Hệ thống thông báo gửi yêu cầu thành công.
   Alternative flow

3.1. Trả phòng trước thời hạn hợp đồng
3.1.1. Hệ thống hiển thị thông báo “trả phòng trước hạn sẽ có nguy cơ bị mất cọc. Bạn có muốn tiếp tục không?”
3.1.3. Khách thuê chọn “xác nhận”
3.1.4. Hệ thống ghi nhận đây là yêu cầu trả phòng trước hạn để Chủ trọ xử lý theo điều khoản hợp đồng.
3.1.5. Quay lại bước 5 của Basic Flow.
3.2. Khách thuê chọn “Hủy” tại thông báo trả phòng trước hạn
3.2.1. Hệ thống đóng thông báo cảnh báo, không ghi nhận yêu cầu trả phòng trước hạn và quay lại bước 3 để khách chọn lại ngày hoặc kết thúc thao tác.

2.1. Đã tồn tại yêu cầu trả phòng đang chờ xử lý
2.1.1. Hệ thống hiển thị yêu cầu hiện tại và không tạo thêm yêu cầu trùng lặp
Exception flow

4.1 Ngày dự kiến trả phòng không hợp lệ
4.1.1. Hệ thống thông báo lỗi và yêu cầu khách nhập/chọn lại ngày.
4.1.2. Quay lại bước 3.  
6.1 Không lưu được yêu cầu

6.1.1. Hệ thống thông báo gửi yêu cầu thất bại.
6.1.2. Không thay đổi trạng thái hợp đồng và không tạo yêu cầu trả phòng
6.1.3. Kết thúc use case.
