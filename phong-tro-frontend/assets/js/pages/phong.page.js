const roomStatus = {
  TRONG: ["Trống", "status-badge--warning"],
  DA_GIU: ["Đã giữ", "status-badge--info"],
  DANG_THUE: ["Đang thuê", "status-badge--success"],
  DANG_XU_LY_TRA_PHONG: ["Đang xử lý trả", "status-badge--danger"],
};

function renderRooms(rooms) {
  const rows = document.querySelector("[data-room-rows]");
  if (!rows) return;
  rows.innerHTML = rooms
    .map((room) => {
      const [label, tone] = roomStatus[room.trang_thai] || [
        room.trang_thai,
        "status-badge--info",
      ];
      return `<tr><td>P${room.ma_phong}</td><td>${room.canTro?.ten_can || `Căn #${room.ma_can}`}</td><td>${room.mo_ta || "—"}</td><td>${FormatUtil.currency(room.gia_thue)}</td><td><span class="status-badge ${tone}">${label}</span></td><td>${room.trang_thai === "DANG_THUE" ? "Đang thuê" : "Chưa có"}</td></tr>`;
    })
    .join("");
}

document.addEventListener("DOMContentLoaded", async () => {
  const search = document.querySelector("[data-room-search]");
  try {
    const response = await window.ApiClient.get("/phong?limit=100");
    const rooms = response.data || [];
    const rented = rooms.filter(
      (room) => room.trang_thai === "DANG_THUE",
    ).length;
    const vacant = rooms.filter((room) => room.trang_thai === "TRONG").length;
    document.querySelector("[data-room-total]").textContent = rooms.length;
    document.querySelector("[data-room-rented]").textContent = rented;
    document.querySelector("[data-room-vacant]").textContent = vacant;
    document.querySelector("[data-room-rate]").textContent =
      `${rooms.length ? Math.round((rented / rooms.length) * 100) : 0}% lấp đầy`;
    document.querySelector("[data-room-revenue]").textContent =
      FormatUtil.currency(
        rooms.reduce((sum, room) => sum + Number(room.gia_thue || 0), 0),
      );
    document.querySelector("[data-room-updated]").textContent =
      `Đã tải ${rooms.length} phòng từ database`;
    renderRooms(rooms);
    search?.addEventListener("input", () =>
      renderRooms(
        rooms.filter((room) =>
          `${room.ma_phong} ${room.mo_ta} ${room.trang_thai} ${room.canTro?.ten_can}`
            .toLowerCase()
            .includes(search.value.toLowerCase()),
        ),
      ),
    );
  } catch (error) {
    document.querySelector("[data-room-updated]").textContent = error.message;
  }
});
