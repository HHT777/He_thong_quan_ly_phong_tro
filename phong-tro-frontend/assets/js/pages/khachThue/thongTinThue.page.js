document.addEventListener("DOMContentLoaded", async () => {
  try {
    const user = window.ApiClient.getUser();
    const [profileResponse, contractsResponse] = await Promise.all([
      window.ApiClient.get("/auth/profile"),
      window.ApiClient.get(
        `/hop-dong?ma_khach_thue=${user?.ma_khach_thue || ""}&limit=10`,
      ),
    ]);
    const tenant = profileResponse.data?.khachThue || {};
    const contracts = contractsResponse.data || [];
    const contract =
      contracts.find((item) => item.trang_thai === "DANG_HIEU_LUC") ||
      contracts[0];
    const setValue = (selector, value) => {
      const element = document.querySelector(selector);
      if (element) element.value = value || "—";
    };
    const setText = (selector, value) => {
      const element = document.querySelector(selector);
      if (element) element.textContent = value || "—";
    };
    setValue("[data-tenant-name]", tenant.ho_ten);
    setValue("[data-tenant-phone]", tenant.so_dien_thoai);
    setValue(
      "[data-tenant-room]",
      contract ? `P${contract.ma_phong}` : "Chưa có phòng",
    );
    setValue(
      "[data-tenant-start]",
      contract?.ngay_bat_dau &&
        new Date(contract.ngay_bat_dau).toLocaleDateString("vi-VN"),
    );
    setValue(
      "[data-tenant-end]",
      contract?.ngay_ket_thuc &&
        new Date(contract.ngay_ket_thuc).toLocaleDateString("vi-VN"),
    );
    setValue(
      "[data-tenant-rent]",
      contract?.gia_thue && FormatUtil.currency(contract.gia_thue),
    );
    setText(
      "[data-tenant-contract]",
      contract ? `HD-${contract.ma_hop_dong}` : "Chưa có",
    );
    setText(
      "[data-tenant-deposit]",
      contract?.tien_coc && FormatUtil.currency(contract.tien_coc),
    );
  } catch (error) {
    document
      .querySelector("[data-tenant-name]")
      ?.setAttribute("placeholder", error.message);
  }
});
