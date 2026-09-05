const KhachThue = require("./KhachThue");
const TaiKhoan = require("./TaiKhoan");
const CanTro = require("./CanTro");
const PhongTro = require("./PhongTro");
const NoiThat = require("./NoiThat");
const DatCoc = require("./DatCoc");
const HopDong = require("./HopDong");
const DienNuoc = require("./DienNuoc");
const KhoanPhaiThu = require("./KhoanPhaiThu");
const ThanhToan = require("./ThanhToan");
const GiamTru = require("./GiamTru");
const ChiPhi = require("./ChiPhi");
const TraPhong = require("./TraPhong");
const ThongBao = require("./ThongBao");

// Define associations

// TaiKhoan -> KhachThue
TaiKhoan.belongsTo(KhachThue, {
  foreignKey: "ma_khach_thue",
  as: "khachThue",
});
KhachThue.hasOne(TaiKhoan, {
  foreignKey: "ma_khach_thue",
  as: "taiKhoan",
});

// KhachThue associations
KhachThue.hasMany(DatCoc, {
  foreignKey: "ma_khach_thue",
  as: "datCocs",
});
KhachThue.hasMany(HopDong, {
  foreignKey: "ma_khach_thue",
  as: "hopDongs",
});
KhachThue.hasMany(KhoanPhaiThu, {
  foreignKey: "ma_khach_thue",
  as: "khoanPhaiThus",
});
KhachThue.hasMany(GiamTru, {
  foreignKey: "ma_khach_thue",
  as: "giamTrus",
});

// CanTro associations
CanTro.hasMany(PhongTro, {
  foreignKey: "ma_can",
  as: "phongs",
});
CanTro.hasMany(ChiPhi, {
  foreignKey: "ma_can",
  as: "chiPhis",
});

// PhongTro associations
PhongTro.belongsTo(CanTro, {
  foreignKey: "ma_can",
  as: "canTro",
});
PhongTro.hasMany(NoiThat, {
  foreignKey: "ma_phong",
  as: "noiThats",
});
PhongTro.hasMany(DatCoc, {
  foreignKey: "ma_phong",
  as: "datCocs",
});
PhongTro.hasMany(HopDong, {
  foreignKey: "ma_phong",
  as: "hopDongs",
});
PhongTro.hasMany(DienNuoc, {
  foreignKey: "ma_phong",
  as: "dienNuocs",
});
PhongTro.hasMany(KhoanPhaiThu, {
  foreignKey: "ma_phong",
  as: "khoanPhaiThus",
});
PhongTro.hasMany(ChiPhi, {
  foreignKey: "ma_phong",
  as: "chiPhis",
});

// NoiThat associations
NoiThat.belongsTo(PhongTro, {
  foreignKey: "ma_phong",
  as: "phongTro",
});
NoiThat.hasMany(ChiPhi, {
  foreignKey: "ma_tai_san",
  as: "chiPhis",
});

// DatCoc associations
DatCoc.belongsTo(KhachThue, {
  foreignKey: "ma_khach_thue",
  as: "khachThue",
});
DatCoc.belongsTo(PhongTro, {
  foreignKey: "ma_phong",
  as: "phongTro",
});

// HopDong associations
HopDong.belongsTo(KhachThue, {
  foreignKey: "ma_khach_thue",
  as: "khachThue",
});
HopDong.belongsTo(PhongTro, {
  foreignKey: "ma_phong",
  as: "phongTro",
});
HopDong.hasOne(TraPhong, {
  foreignKey: "ma_hop_dong",
  as: "traPhong",
});

// DienNuoc associations
DienNuoc.belongsTo(PhongTro, {
  foreignKey: "ma_phong",
  as: "phongTro",
});
DienNuoc.belongsTo(TaiKhoan, {
  foreignKey: "nguoi_nhap",
  as: "nguoiNhap",
});

// KhoanPhaiThu associations
KhoanPhaiThu.belongsTo(PhongTro, {
  foreignKey: "ma_phong",
  as: "phongTro",
});
KhoanPhaiThu.belongsTo(KhachThue, {
  foreignKey: "ma_khach_thue",
  as: "khachThue",
});
KhoanPhaiThu.hasMany(ThanhToan, {
  foreignKey: "ma_khoan_phai_thu",
  as: "thanhToans",
});

// ThanhToan associations
ThanhToan.belongsTo(KhoanPhaiThu, {
  foreignKey: "ma_khoan_phai_thu",
  as: "khoanPhaiThu",
});
ThanhToan.belongsTo(TaiKhoan, {
  foreignKey: "nguoi_xac_nhan",
  as: "nguoiXacNhan",
});

// GiamTru associations
GiamTru.belongsTo(KhachThue, {
  foreignKey: "ma_khach_thue",
  as: "khachThue",
});
GiamTru.belongsTo(PhongTro, {
  foreignKey: "ma_phong",
  as: "phongTro",
});
GiamTru.belongsTo(HopDong, {
  foreignKey: "ma_hop_dong",
  as: "hopDong",
});

// ChiPhi associations
ChiPhi.belongsTo(CanTro, {
  foreignKey: "ma_can",
  as: "canTro",
});
ChiPhi.belongsTo(PhongTro, {
  foreignKey: "ma_phong",
  as: "phongTro",
});
ChiPhi.belongsTo(TaiKhoan, {
  foreignKey: "nguoi_ghi_nhan",
  as: "nguoiGhiNhan",
});
ChiPhi.belongsTo(NoiThat, {
  foreignKey: "ma_tai_san",
  as: "noiThat",
});

// TraPhong associations
TraPhong.belongsTo(HopDong, {
  foreignKey: "ma_hop_dong",
  as: "hopDong",
});

// ThongBao associations
ThongBao.belongsTo(TaiKhoan, {
  foreignKey: "ma_tai_khoan_nhan",
  as: "taiKhoan",
});

module.exports = {
  KhachThue,
  TaiKhoan,
  CanTro,
  PhongTro,
  NoiThat,
  DatCoc,
  HopDong,
  DienNuoc,
  KhoanPhaiThu,
  ThanhToan,
  GiamTru,
  ChiPhi,
  TraPhong,
  ThongBao,
};
