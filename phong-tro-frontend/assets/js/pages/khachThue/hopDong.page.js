document.addEventListener("DOMContentLoaded", async () => {
  try {
    const user = window.ApiClient.getUser();
    const response = await window.ApiClient.get(
      `/hop-dong?ma_khach_thue=${user?.ma_khach_thue || ""}&limit=10`,
    );
    const contract = response.data?.[0];
    document.querySelector("[data-tenant-contract-detail]").innerHTML = contract
      ? `<p><strong>Mã hợp đồng:</strong> HD-${contract.ma_hop_dong}</p><p><strong>Phòng:</strong> P${contract.ma_phong}</p><p><strong>Thời hạn:</strong> ${new Date(contract.ngay_bat_dau).toLocaleDateString("vi-VN")} - ${new Date(contract.ngay_ket_thuc).toLocaleDateString("vi-VN")}</p><p><strong>Giá thuê:</strong> ${FormatUtil.currency(contract.gia_thue)}</p><p><strong>Trạng thái:</strong> ${contract.trang_thai}</p>`
      : "Bạn chưa có hợp đồng.";
  } catch (error) {
    document.querySelector("[data-tenant-contract-detail]").textContent =
      error.message;
  }
});
