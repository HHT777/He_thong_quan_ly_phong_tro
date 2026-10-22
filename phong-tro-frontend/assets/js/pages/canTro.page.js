document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await window.ApiClient.get("/management/can-tro");
    const items = response.data || [];
    const rows = document.querySelector("[data-can-tro-rows]");
    const values = document.querySelectorAll(".stat-card__value");
    if (values[0]) values[0].textContent = items.length;
    if (values[1])
      values[1].textContent = items.reduce(
        (sum, item) =>
          sum +
          (item.phongs || []).filter((room) => room.trang_thai === "DANG_THUE")
            .length,
        0,
      );
    if (values[2])
      values[2].textContent = items.reduce(
        (sum, item) =>
          sum +
          (item.phongs || []).filter((room) => room.trang_thai === "TRONG")
            .length,
        0,
      );
    if (values[3])
      values[3].textContent = items.reduce(
        (sum, item) => sum + (item.phongs || []).length,
        0,
      );
    if (rows)
      rows.innerHTML =
        items
          .flatMap((item) =>
            (item.phongs || []).map(
              (room) =>
                `<tr><td>${item.ten_can}</td><td>${item.dia_chi}</td><td>${FormatUtil.currency(room.gia_thue)}</td><td>${room.trang_thai}</td><td>${room.trang_thai === "DANG_THUE" ? "Đang thuê" : "Chưa có"}</td></tr>`,
            ),
          )
          .join("") ||
        '<tr><td colspan="5">Chưa có dữ liệu căn/phòng.</td></tr>';
  } catch (error) {
    const rows = document.querySelector("[data-can-tro-rows]");
    if (rows) rows.innerHTML = `<tr><td colspan="5">${error.message}</td></tr>`;
  }
});
