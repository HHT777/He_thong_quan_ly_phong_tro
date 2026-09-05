const ROLE_ACCESS = {
  auth: { read: ["CHU_TRO", "KHACH_THUE"] },
  phong: { read: ["CHU_TRO"], write: ["CHU_TRO"] },
  canTro: { read: ["CHU_TRO"], write: ["CHU_TRO"] },
  khachThue: { read: ["CHU_TRO"], write: ["CHU_TRO"] },
  hopDong: { read: ["CHU_TRO", "KHACH_THUE"], write: ["CHU_TRO"] },
  datCoc: { read: ["CHU_TRO"], write: ["CHU_TRO"] },
  khoanPhaiThu: { read: ["CHU_TRO", "KHACH_THUE"], write: ["CHU_TRO"] },
  thanhToan: {
    read: ["CHU_TRO", "KHACH_THUE"],
    write: ["CHU_TRO"],
    stats: ["CHU_TRO"],
  },
  thuChi: { read: ["CHU_TRO"], write: ["CHU_TRO"] },
  dienNuoc: {
    read: ["CHU_TRO", "KHACH_THUE"],
    write: ["CHU_TRO", "KHACH_THUE"],
  },
  thongBao: { read: ["CHU_TRO", "KHACH_THUE"], write: ["CHU_TRO"] },
  suCo: { read: ["CHU_TRO", "KHACH_THUE"], write: ["CHU_TRO", "KHACH_THUE"] },
  traPhong: {
    read: ["CHU_TRO", "KHACH_THUE"],
    write: ["CHU_TRO", "KHACH_THUE"],
  },
};

function rolesFor(permission) {
  const [resource, action] = permission.split(".");
  return ROLE_ACCESS[resource]?.[action] || [];
}

module.exports = { ROLE_ACCESS, rolesFor };
