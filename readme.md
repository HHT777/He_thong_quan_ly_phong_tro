CHƯƠNG 1: PHÂN TÍCH YÊU CẦU CỦA BÀI TOÁN

1. Mục đích
   Dự án xây dựng hệ thống quản lý chuỗi phòng trọ nhằm hỗ trợ chủ trọ chuyển từ phương thức quản lý bằng nhiều file Excel và hợp đồng giấy sang một hệ thống quản lý tập trung.
   Hệ thống hướng đến việc số hóa và hỗ trợ quản lý các nghiệp vụ chính như: quản lý căn và phòng, khách thuê, tiền cọc, hợp đồng, điện nước, tiền phòng, thanh toán, công nợ, thu chi, sự cố sửa chữa, trả phòng và báo cáo doanh thu – chi phí – lợi nhuận.
   Đối với khách thuê, hệ thống cung cấp một kênh để theo dõi thông tin phòng đang thuê, hợp đồng, các khoản phải thanh toán, lịch sử thanh toán, thông báo và thực hiện một số thao tác liên quan đến quá trình thuê phòng.
   Mục tiêu cuối cùng của hệ thống là giảm thao tác thủ công, tập trung hóa dữ liệu, hạn chế sai sót và hỗ trợ chủ trọ theo dõi hiệu quả hoạt động của từng căn cũng như toàn bộ chuỗi phòng trọ.
2. Phạm vi
   2.1. Phạm vi trong hệ thống (In-scope)
   Hệ thống tập trung hỗ trợ các nhóm chức năng sau:
   Quản lý căn và phòng.
   Quản lý khách thuê.
   Quản lý tài khoản khách thuê.
   Quản lý cọc và giữ phòng.
   Quản lý hợp đồng.
   Quản lý điện, nước.
   Tính tiền phòng và các khoản phí.
   Quản lý khoản phải thu, thanh toán và công nợ.ính theo mức 100.000 đồng/người/tháng.
   BR-12. Quyền kiểm soát tài chính
   Chủ trọ là actor duy nhất có quyền kiểm soát các thông tin tài chính như thu chi, doanh thu, chi phí và lợi nhuận.
   BR-13. Phạm vi dữ liệu của khách thuê
   Khách thuê chỉ được truy cập dữ liệu liên quan đến bản thân, phòng mình đang thuê và hợp đồng của mình.
   BR-14. Quyền truy cập của khách thuê
   Khách thuê được xem các thông tin được hệ thống cho phép và thực hiện các thao tác như nhập chỉ số điện nước, gửi yêu cầu hoặc báo sự cố; không được thay đổi dữ liệu ngoài phạm vi cho phép.
   BR-15. Không xóa dữ liệu phòng
   Hệ thống không cho phép xóa dữ liệu phòng nếu việc xóa làm mất lịch sử thuê, hợp đồng hoặc giao dịch liên quan. Có thể chuyển phòng sang trạng thái ngừng hoạt động khi cần.
   BR-16. Chuyển phòng
   Khi khách thuê chuyển sang phòng khác, tiền cọc được giữ nguyên; giá trị tiền phòng được cập nhật theo phòng mới.
   BR-17. Bàn giao hợp đồng
   Khi khách thuê muốn trả hợp đồng trong thời gian hợp đồng còn hiệu lực và không muốn mất tiền cọc, khách thuê có thể tìm người khác để tiếp nhận hợp đồng. Nếu người mới đồng ý tiếp nhận, tiền cọc của khách thuê cũ được hoàn lại, tiền cọc mới do khách thuê mới chịu. Tên người thuê trên hợp đồng vẫn giữ là khách thuê cũ và hệ thống ghi nhận thông tin đã bàn giao hợp đồng cho người tiếp nhận.
   BR-18. Xử lý tài khoản sau khi trả phòng
   Sau khi khách thuê hoàn tất trả phòng, tài khoản khách thuê không bị xóa mà chỉ bị khóa quyền truy cập hệ thống. Dữ liệu lịch sử thuê và các giao dịch liên quan vẫn được lưu trữ.
   BR-19. Trách nhiệm chi phí hư hỏng
   Chi phí sửa chữa các trường hợp hư hỏng như thang máy, máy lạnh, máy giặt do chủ trọ chịu. Nếu xác định được khách thuê gây ra hư hỏng thì khách thuê chịu chi phí sửa chữa. Hệ thống không áp dụng các khoản chi phí phạt do hư hỏng.
   BR-20. Công nợ
   Công nợ được ghi nhận và xác nhận trên hệ thống. Khoản công nợ chưa thanh toán có thể được cộng dồn sang tháng tiếp theo.
   BR-21. Phí dịch vụ
   Phí dịch vụ được quy định trong hợp đồng và có thể được thay đổi sau khi chủ trọ thương lượng với khách thuê.
   4.5. Mô tả một số chức năng phức tạp
   Nhóm tập trung vào 6 chức năng phức tạp chính:
3. Xử lý trả phòng và thanh lý hợp đồng
   Yêu cầu trả phòng → Kiểm tra hợp đồng → Chốt điện nước → Kiểm tra phòng/tài sản → Kiểm tra công nợ → Xác định hư hỏng/chi phí → Tính khấu trừ cọc → Hoàn cọc/khấu trừ → Thanh lý hợp đồng → Cập nhật phòng trống.
   Liên quan đến: Khách thuê, Phòng, Hợp đồng, Tiền cọc, Điện nước, Công nợ, Nội thất và Chi phí.
4. Tính tiền hàng tháng
   Ngày 01 ghi nhận chỉ số điện → Lấy thông tin hợp đồng → Tính tiền phòng → Lấy tiền điện → Tính tiền nước 100.000 đồng/người/tháng → Tính phí dịch vụ → Tính phí phát sinh → Áp dụng giảm trừ → Tạo khoản phải thu → Gửi thông báo cho khách.
5. Ghi nhận và tính tiền điện nước
   Khách nhập chỉ số → Gửi minh chứng → Chủ trọ kiểm tra/xác nhận → Lấy chỉ số kỳ trước → Tính lượng sử dụng → Áp dụng đơn giá điện theo hợp đồng → Tính tiền điện/nước → Lưu lịch sử.
6. Quản lý hợp đồng và gia hạn
   Tạo hợp đồng → Lưu thông tin và điều khoản → Theo dõi thời hạn → Cảnh báo trước ít nhất 1 tháng → Tiếp nhận nhu cầu gia hạn → Cập nhật hợp đồng → Chuyển sang trả phòng nếu không tiếp tục thuê.
   Trường hợp bàn giao hợp đồng:
   Khách thuê muốn trả trước hạn → Tìm người tiếp nhận → Người mới đồng ý → Hoàn cọc cho khách cũ → Người mới đóng cọc → Ghi nhận bàn giao hợp đồng → Giữ tên người thuê cũ trên hợp đồng.
7. Tổng hợp thu chi và tính doanh thu/lợi nhuận
   Ghi nhận khoản thu → Ghi nhận khoản chi → Phân loại chi phí → Gắn với căn nếu có → Tổng hợp doanh thu → Tổng hợp chi phí → Tính lợi nhuận → Lọc theo tháng/quý/năm → So sánh hiệu quả các căn.
8. Xử lý sự cố và sửa chữa
   Khách báo sự cố → Chủ trọ tiếp nhận → Xác định phòng/tài sản → Phân loại sự cố → Liên hệ thợ → Sửa chữa/thay thế → Xác định trách nhiệm chi phí → Ghi nhận kết quả → Ghi nhận chi phí → Hoàn tất.
   ính theo mức 100.000 đồng/người/tháng.
   BR-12.ính theo mức 100.000 đồng/người/tháng.
   BR-12. Quyền kiểm soát tài chính
   Chủ trọ là actor duy nhất có quyền kiểm soát các thông tin tài chính như thu chi, doanh thu, chi phí và lợi nhuận.
   BR-13. Phạm vi dữ liệu của khách thuê
   Khách thuê chỉ được truy cập dữ liệu liên quan đến bản thân, phòng mình đang thuê và hợp đồng của mình.
   BR-14. Quyền truy cập của khách thuê
   Khách thuê được xem các thông tin được hệ thống cho phép và thực hiện các thao tác như nhập chỉ số điện nước, gửi yêu cầu hoặc báo sự cố; không được thay đổi dữ liệu ngoài phạm vi cho phép.
   BR-15. Không xóa dữ liệu phòng
   Hệ thống không cho phép xóa dữ liệu phòng nếu việc xóa làm mất lịch sử thuê, hợp đồng hoặc giao dịch liên quan. Có thể chuyển phòng sang trạng thái ngừng hoạt động khi cần.
   BR-16. Chuyển phòng
   Khi khách thuê chuyển sang phòng khác, tiền cọc được giữ nguyên; giá trị tiền phòng được cập nhật theo phòng mới.
   BR-17. Bàn giao hợp đồng
   Khi khách thuê muốn trả hợp đồng trong thời gian hợp đồng còn hiệu lực và không muốn mất tiền cọc, khách thuê có thể tìm người khác để tiếp nhận hợp đồng. Nếu người mới đồng ý tiếp nhận, tiền cọc của khách thuê cũ được hoàn lại, tiền cọc mới do khách thuê mới chịu. Tên người thuê trên hợp đồng vẫn giữ là khách thuê cũ và hệ thống ghi nhận thông tin đã bàn giao hợp đồng cho người tiếp nhận.
   BR-18. Xử lý tài khoản sau khi trả phòng
   Sau khi khách thuê hoàn tất trả phòng, tài khoản khách thuê không bị xóa mà chỉ bị khóa quyền truy cập hệ thống. Dữ liệu lịch sử thuê và các giao dịch liên quan vẫn được lưu trữ.
   BR-19. Trách nhiệm chi phí hư hỏng
   Chi phí sửa chữa các trường hợp hư hỏng như thang máy, máy lạnh, máy giặt do chủ trọ chịu. Nếu xác định được khách thuê gây ra hư hỏng thì khách thuê chịu chi phí sửa chữa. Hệ thống không áp dụng các khoản chi phí phạt do hư hỏng.
   BR-20. Công nợ
   Công nợ được ghi nhận và xác nhận trên hệ thống. Khoản công nợ chưa thanh toán có thể được cộng dồn sang tháng tiếp theo.
   BR-21. Phí dịch vụ
   Phí dịch vụ được quy định trong hợp đồng và có thể được thay đổi sau khi chủ trọ thương lượng với khách thuê.
   4.5. Mô tả một số chức năng phức tạp
   Nhóm tập trung vào 6 chức năng phức tạp chính:
9. Xử lý trả phòng và thanh lý hợp đồng
   Yêu cầu trả phòng → Kiểm tra hợp đồng → Chốt điện nước → Kiểm tra phòng/tài sản → Kiểm tra công nợ → Xác định hư hỏng/chi phí → Tính khấu trừ cọc → Hoàn cọc/khấu trừ → Thanh lý hợp đồng → Cập nhật phòng trống.
   Liên quan đến: Khách thuê, Phòng, Hợp đồng, Tiền cọc, Điện nước, Công nợ, Nội thất và Chi phí.
10. Tính tiền hàng tháng
    Ngày 01 ghi nhận chỉ số điện → Lấy thông tin hợp đồng → Tính tiền phòng → Lấy tiền điện → Tính tiền nước 100.000 đồng/người/tháng → Tính phí dịch vụ → Tính phí phát sinh → Áp dụng giảm trừ → Tạo khoản phải thu → Gửi thông báo cho khách.
11. Ghi nhận và tính tiền điện nước
    Khách nhập chỉ số → Gửi minh chứng → Chủ trọ kiểm tra/xác nhận → Lấy chỉ số kỳ trước → Tính lượng sử dụng → Áp dụng đơn giá điện theo hợp đồng → Tính tiền điện/nước → Lưu lịch sử.
12. Quản lý hợp đồng và gia hạn
    Tạo hợp đồng → Lưu thông tin và điều khoản → Theo dõi thời hạn → Cảnh báo trước ít nhất 1 tháng → Tiếp nhận nhu cầu gia hạn → Cập nhật hợp đồng → Chuyển sang trả phòng nếu không tiếp tục thuê.
    Trường hợp bàn giao hợp đồng:
    Khách thuê muốn trả trước hạn → Tìm người tiếp nhận → Người mới đồng ý → Hoàn cọc cho khách cũ → Người mới đóng cọc → Ghi nhận bàn giao hợp đồng → Giữ tên người thuê cũ trên hợp đồng.
13. Tổng hợp thu chi và tính doanh thu/lợi nhuận
    Ghi nhận khoản thu → Ghi nhận khoản chi → Phân loại chi phí → Gắn với căn nếu có → Tổng hợp doanh thu → Tổng hợp chi phí → Tính lợi nhuận → Lọc theo tháng/quý/năm → So sánh hiệu quả các căn.
14. Xử lý sự cố và sửa chữa
    Khách báo sự cố → Chủ trọ tiếp nhận → Xác định phòng/tài sản → Phân loại sự cố → Liên hệ thợ → Sửa chữa/thay thế → Xác định trách nhiệm chi phí → Ghi nhận kết quả → Ghi nhận chi phí → Hoàn tất.
