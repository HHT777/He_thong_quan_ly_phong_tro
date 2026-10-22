document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await window.ApiClient.get("/management/khach-thue");
    const items = response.data || [];
    const rows = document.querySelector("[data-khach-thue-rows]");
    const values = document.querySelectorAll(".stat-card__value");
    if (values[0]) values[0].textContent = items.length;
    if (values[1])
      values[1].textContent = items.reduce(
        (sum, item) => sum + (item.hopDongs || []).length,
        0,
      );
    if (values[2])
      values[2].textContent = items.filter(
        (item) => item.trang_thai === "DANG_THUE",
      ).length;
    if (rows)
      rows.innerHTML =
        items
          .map((item) => {
            const contract = item.hopDongs?.[0];
            return `<tr><td>${item.ho_ten}</td><td>${contract ? `P${contract.ma_phong}` : "—"}</td><td>${contract ? `HD-${contract.ma_hop_dong}` : "—"}</td><td>${contract?.ngay_ket_thuc ? new Date(contract.ngay_ket_thuc).toLocaleDateString("vi-VN") : "—"}</td><td>${item.trang_thai}</td></tr>`;
          })
          .join("") || '<tr><td colspan="5">Chưa có khách thuê.</td></tr>';
  } catch (error) {
    const rows = document.querySelector("[data-khach-thue-rows]");
    if (rows) rows.innerHTML = `<tr><td colspan="5">${error.message}</td></tr>`;
  }
});
