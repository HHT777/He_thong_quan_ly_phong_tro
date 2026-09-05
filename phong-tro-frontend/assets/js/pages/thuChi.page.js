document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await window.ApiClient.get("/management/thu-chi");
    const items = response.data || [];
    const rows = document.querySelector("[data-thu-chi-rows]");
    const total = items.reduce(
      (sum, item) => sum + Number(item.so_tien || 0),
      0,
    );
    const values = document.querySelectorAll(".stat-card__value");
    if (values[1]) values[1].textContent = FormatUtil.currency(total);
    if (values[2]) values[2].textContent = FormatUtil.currency(total);
    if (rows)
      rows.innerHTML =
        items
          .map(
            (item) =>
              `<tr><td>Chi</td><td>${item.noi_dung || item.loai_chi_phi}</td><td>${FormatUtil.currency(item.so_tien)}</td><td>${new Date(item.ngay_chi).toLocaleDateString("vi-VN")}</td><td><span class="status-badge status-badge--success">Đã ghi nhận</span></td></tr>`,
          )
          .join("") || '<tr><td colspan="5">Chưa có giao dịch chi.</td></tr>';
  } catch (error) {
    const rows = document.querySelector("[data-thu-chi-rows]");
    if (rows) rows.innerHTML = `<tr><td colspan="5">${error.message}</td></tr>`;
  }
});
