document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await window.ApiClient.get("/hop-dong?limit=100");
    const items = response.data || [];
    const rows = document.querySelector("[data-hop-dong-rows]");
    const values = document.querySelectorAll(".stat-card__value");
    if (values[0]) values[0].textContent = items.length;
    if (values[1])
      values[1].textContent = items.filter(
        (item) => item.trang_thai === "DANG_HIEU_LUC",
      ).length;
    if (values[2])
      values[2].textContent = items.filter(
        (item) => item.trang_thai === "DA_KET_THUC",
      ).length;
    if (rows)
      rows.innerHTML =
        items
          .map(
            (item) =>
              `<tr><td>HD-${item.ma_hop_dong}</td><td>${item.khachThue?.ho_ten || item.ma_khach_thue}</td><td>P${item.ma_phong}</td><td>${new Date(item.ngay_bat_dau).toLocaleDateString("vi-VN")} - ${new Date(item.ngay_ket_thuc).toLocaleDateString("vi-VN")}</td><td>${item.trang_thai}</td></tr>`,
          )
          .join("") || '<tr><td colspan="5">Chưa có hợp đồng.</td></tr>';
  } catch (error) {
    const rows = document.querySelector("[data-hop-dong-rows]");
    if (rows) rows.innerHTML = `<tr><td colspan="5">${error.message}</td></tr>`;
  }
});
