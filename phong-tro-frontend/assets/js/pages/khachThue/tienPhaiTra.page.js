function billStatusLabel(status) {
  return (
    {
      CHUA_THANH_TOAN: ["Chưa thanh toán", "status-badge--warning"],
      THANH_TOAN_MOT_PHAN: ["Thanh toán một phần", "status-badge--info"],
      DA_THANH_TOAN: ["Đã thanh toán", "status-badge--success"],
      QUA_HAN: ["Quá hạn", "status-badge--danger"],
    }[status] || [status || "—", "status-badge--info"]
  );
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const user = window.ApiClient.getUser();
    const response = await window.ApiClient.get(
      `/khoan-phai-thu/khach-thue/${user?.ma_khach_thue || ""}`,
    );
    const bills = response.data || [];
    const total = bills.reduce(
      (sum, bill) => sum + Number(bill.tong_phai_thanh_toan || 0),
      0,
    );
    const paid = bills.reduce(
      (sum, bill) =>
        sum +
        (bill.trang_thai_thanh_toan === "DA_THANH_TOAN"
          ? Number(bill.tong_phai_thanh_toan || 0)
          : 0),
      0,
    );
    const due = total - paid;
    document.querySelector("[data-bill-total]").textContent =
      FormatUtil.currency(total);
    document.querySelector("[data-bill-paid]").textContent =
      FormatUtil.currency(paid);
    document.querySelector("[data-bill-due]").textContent =
      FormatUtil.currency(due);
    document.querySelector("[data-bill-due-date]").textContent = bills[0]
      ?.han_thanh_toan
      ? new Date(bills[0].han_thanh_toan).toLocaleDateString("vi-VN")
      : "—";
    document.querySelector("[data-bill-rows]").innerHTML =
      bills
        .map((bill) => {
          const [label, tone] = billStatusLabel(bill.trang_thai_thanh_toan);
          return `<tr><td>Hóa đơn phòng ${bill.ma_phong}</td><td>${bill.ky}</td><td>${FormatUtil.currency(bill.tong_phai_thanh_toan)}</td><td><span class="status-badge ${tone}">${label}</span></td></tr>`;
        })
        .join("") || '<tr><td colspan="4">Chưa có khoản phải thu.</td></tr>';
  } catch (error) {
    document.querySelector("[data-bill-rows]").innerHTML =
      `<tr><td colspan="4">${error.message}</td></tr>`;
  }
});
document.addEventListener("DOMContentLoaded", () => {
  console.log("TienPhaiTra page loaded");
});
