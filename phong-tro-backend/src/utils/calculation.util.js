/**
 * Utility functions for calculating bills and managing financial operations
 * Implements Business Rules BR-03, BR-05, BR-06, etc.
 */

const calculateBill = (hopDong, dienNuoc, giamTru = null) => {
  /**
   * BR-03: Công thức tính khoản phải thu
   * Khoản phải thu = Tiền phòng + Tiền điện + Tiền nước + Phí dịch vụ + Phí phát sinh - Khoản giảm trừ
   */

  const tienPhong = parseFloat(hopDong.gia_thue) || 0;
  const tienDien = dienNuoc ? parseFloat(dienNuoc.thanh_tien) || 0 : 0;
  const tienNuoc = dienNuoc ? parseFloat(dienNuoc.tien_nuoc) || 0 : 0;
  const phiDichVu = parseFloat(hopDong.phi_dich_vu) || 0;
  const phiPhaSinh = 0; // Will be set when creating bill
  const khoanGiamTru = giamTru ? parseFloat(giamTru.gia_tri_giam) || 0 : 0;

  const tongPhaiThanhToan =
    tienPhong + tienDien + tienNuoc + phiDichVu + phiPhaSinh - khoanGiamTru;

  return {
    tien_phong: tienPhong,
    tien_dien: tienDien,
    tien_nuoc: tienNuoc,
    phi_dich_vu: phiDichVu,
    phi_phat_sinh: phiPhaSinh,
    khoan_giam_tru: khoanGiamTru,
    tong_phai_thanh_toan: Math.max(0, tongPhaiThanhToan),
  };
};

const calculateWaterBill = (soNguoi) => {
  /**
   * BR-09: Tính tiền nước theo mức 100.000 đồng/người/tháng
   */
  return soNguoi * 100000;
};

const calculateRoomStatus = (hopDong) => {
  /**
   * BR-10: Luồng trạng thái phòng
   * Trống → Đã giữ → Đang thuê → Đang xử lý trả phòng → Trống
   */
  const now = new Date();

  if (hopDong.trang_thai === "DA_THANH_LY") {
    return "TRONG";
  }

  if (hopDong.ngay_bat_dau <= now && now <= hopDong.ngay_ket_thuc) {
    return "DANG_THUE";
  }

  if (now > hopDong.ngay_ket_thuc) {
    return "DANG_XU_LY_TRA_PHONG";
  }

  return "DA_GIU";
};

const calculateDepositReturn = (datCoc, tienCocBanDau, khoanKhauTru) => {
  /**
   * Calculate deposit return amount
   */
  const tienCocHoanLai =
    parseFloat(datCoc.so_tien_coc) - parseFloat(khoanKhauTru);
  return Math.max(0, tienCocHoanLai);
};

const isOverdueRoom = (datCoc) => {
  /**
   * BR-05: Kiểm tra quá hạn giữ phòng
   */
  const now = new Date();
  const hanGiu = new Date(datCoc.ngay_het_han_giu);
  return now > hanGiu && datCoc.trang_thai === "DANG_GIU";
};

const getPaymentDeadline = (date) => {
  /**
   * Payment deadline is 5th of the next month
   */
  const nextMonth = new Date(date);
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  nextMonth.setDate(5);
  return nextMonth;
};

module.exports = {
  calculateBill,
  calculateWaterBill,
  calculateRoomStatus,
  calculateDepositReturn,
  isOverdueRoom,
  getPaymentDeadline,
};
