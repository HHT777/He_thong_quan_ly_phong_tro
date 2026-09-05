document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await window.ApiClient.get("/thong-bao");
    document.querySelector("[data-tenant-notifications]").innerHTML =
      (response.data || [])
        .map(
          (item) =>
            `<article class="detail-card"><strong>${item.loai_thong_bao}</strong><p>${item.noi_dung}</p><small>${new Date(item.thoi_diem_gui).toLocaleString("vi-VN")}</small></article>`,
        )
        .join("") || "Chưa có thông báo.";
  } catch (error) {
    document.querySelector("[data-tenant-notifications]").textContent =
      error.message;
  }
});
