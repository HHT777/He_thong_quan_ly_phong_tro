require("dotenv").config();
const sequelize = require("../src/config/database");
const {
  KhachThue,
  TaiKhoan,
  CanTro,
  PhongTro,
  DatCoc,
  HopDong,
} = require("../src/models");

const seedDatabase = async () => {
  try {
    console.log("Starting database seeding...");

    // Drop tables if they exist and recreate
    await sequelize.sync({ force: true });
    console.log("✓ Database tables created");

    // 1. Create sample customers
    const khachThues = await KhachThue.bulkCreate([
      {
        ho_ten: "Nguyễn Văn A",
        so_dien_thoai: "0901234567",
        cccd_giay_to: "079123456789",
        thong_tin_lien_he: "TP. Hồ Chí Minh",
        trang_thai: "DANG_THUE",
      },
      {
        ho_ten: "Trần Thị B",
        so_dien_thoai: "0912345678",
        cccd_giay_to: "079234567890",
        thong_tin_lien_he: "TP. Hồ Chí Minh",
        trang_thai: "DANG_THUE",
      },
      {
        ho_ten: "Lê Hoàng C",
        so_dien_thoai: "0923456789",
        cccd_giay_to: "079345678901",
        thong_tin_lien_he: "Bình Dương",
        trang_thai: "DANG_THUE",
      },
    ]);
    console.log("✓ Created 3 sample customers");

    // 2. Create sample accounts
    await TaiKhoan.bulkCreate(
      [
        {
          ten_dang_nhap: "chutro",
          mat_khau: "123456",
          vai_tro: "CHU_TRO",
          trang_thai: "HOAT_DONG",
        },
        {
          ten_dang_nhap: "nguyenvana",
          mat_khau: "123456",
          vai_tro: "KHACH_THUE",
          trang_thai: "HOAT_DONG",
          ma_khach_thue: khachThues[0].ma_khach_thue,
        },
        {
          ten_dang_nhap: "tranthib",
          mat_khau: "123456",
          vai_tro: "KHACH_THUE",
          trang_thai: "HOAT_DONG",
          ma_khach_thue: khachThues[1].ma_khach_thue,
        },
        {
          ten_dang_nhap: "leholangc",
          mat_khau: "123456",
          vai_tro: "KHACH_THUE",
          trang_thai: "HOAT_DONG",
          ma_khach_thue: khachThues[2].ma_khach_thue,
        },
      ],
      { individualHooks: true },
    );
    console.log("✓ Created 4 sample accounts");

    // 3. Create sample buildings
    const canTros = await CanTro.bulkCreate([
      {
        ten_can: "Căn Trọ 1",
        dia_chi: "123 Nguyễn Văn Cư, Quận 5, TP. Hồ Chí Minh",
        mo_ta: "Khu trọ A",
      },
      {
        ten_can: "Căn Trọ 2",
        dia_chi: "456 Lê Văn Việt, Thủ Đức, TP. Hồ Chí Minh",
        mo_ta: "Khu trọ B",
      },
    ]);
    console.log("✓ Created 2 sample buildings");

    // 4. Create sample rooms
    const phongs = await PhongTro.bulkCreate([
      {
        ma_can: canTros[0].ma_can,
        gia_thue: 3500000,
        trang_thai: "DANG_THUE",
        mo_ta: "Phòng 101, tầng 1",
      },
      {
        ma_can: canTros[0].ma_can,
        gia_thue: 3200000,
        trang_thai: "DANG_THUE",
        mo_ta: "Phòng 102, tầng 1",
      },
      {
        ma_can: canTros[0].ma_can,
        gia_thue: 3000000,
        trang_thai: "TRONG",
        mo_ta: "Phòng 103, tầng 1",
      },
      {
        ma_can: canTros[1].ma_can,
        gia_thue: 4000000,
        trang_thai: "DANG_THUE",
        mo_ta: "Phòng 201, tầng 2",
      },
    ]);
    console.log("✓ Created 4 sample rooms");

    // 5. Create sample deposits
    await DatCoc.bulkCreate([
      {
        ma_khach_thue: khachThues[0].ma_khach_thue,
        ma_phong: phongs[0].ma_phong,
        so_tien_coc: 3500000,
        ngay_dat_coc: new Date("2026-08-01"),
        ngay_bat_dau_giu: new Date("2026-08-01"),
        ngay_het_han_giu: new Date("2026-09-01"),
        ngay_xu_ly: new Date("2026-09-01"),
        trang_thai: "DANG_THUE",
      },
      {
        ma_khach_thue: khachThues[1].ma_khach_thue,
        ma_phong: phongs[1].ma_phong,
        so_tien_coc: 3200000,
        ngay_dat_coc: new Date("2026-08-15"),
        ngay_bat_dau_giu: new Date("2026-08-15"),
        ngay_het_han_giu: new Date("2026-09-15"),
        trang_thai: "DANG_GIU",
      },
      {
        ma_khach_thue: khachThues[2].ma_khach_thue,
        ma_phong: phongs[3].ma_phong,
        so_tien_coc: 4000000,
        ngay_dat_coc: new Date("2026-08-05"),
        ngay_bat_dau_giu: new Date("2026-08-05"),
        ngay_het_han_giu: new Date("2026-09-05"),
        ngay_xu_ly: new Date("2026-09-05"),
        trang_thai: "DANG_THUE",
      },
    ]);
    console.log("✓ Created 3 sample deposits");

    // 6. Create sample contracts
    await HopDong.bulkCreate([
      {
        ma_khach_thue: khachThues[0].ma_khach_thue,
        ma_phong: phongs[0].ma_phong,
        ngay_ky: new Date("2026-08-01"),
        ngay_bat_dau: new Date("2026-08-01"),
        ngay_ket_thuc: new Date("2027-07-31"),
        chu_ky_thanh_toan: "HANG_THANG",
        gia_thue: 3500000,
        tien_coc: 3500000,
        phi_dich_vu: 300000,
        dieu_khoan: "Thanh toán hàng tháng trước ngày 5",
        trang_thai: "DANG_HIEU_LUC",
        file_hop_dong: "hopdong_001.pdf",
      },
      {
        ma_khach_thue: khachThues[1].ma_khach_thue,
        ma_phong: phongs[1].ma_phong,
        ngay_ky: new Date("2026-08-15"),
        ngay_bat_dau: new Date("2026-08-15"),
        ngay_ket_thuc: new Date("2027-08-14"),
        chu_ky_thanh_toan: "HANG_THANG",
        gia_thue: 3200000,
        tien_coc: 3200000,
        phi_dich_vu: 250000,
        dieu_khoan: "Thanh toán hàng tháng trước ngày 5",
        trang_thai: "DANG_HIEU_LUC",
        file_hop_dong: "hopdong_002.pdf",
      },
      {
        ma_khach_thue: khachThues[2].ma_khach_thue,
        ma_phong: phongs[3].ma_phong,
        ngay_ky: new Date("2026-08-05"),
        ngay_bat_dau: new Date("2026-08-05"),
        ngay_ket_thuc: new Date("2027-08-04"),
        chu_ky_thanh_toan: "HANG_THANG",
        gia_thue: 4000000,
        tien_coc: 4000000,
        phi_dich_vu: 350000,
        dieu_khoan: "Thanh toán hàng tháng trước ngày 5",
        trang_thai: "DANG_HIEU_LUC",
        file_hop_dong: "hopdong_003.pdf",
      },
    ]);
    console.log("✓ Created 3 sample contracts");

    console.log("\n✓ Database seeding completed successfully!");
    console.log("\nSample Login Credentials:");
    console.log("  Landlord: chutro / 123456");
    console.log("  Tenant 1: nguyenvana / 123456");
    console.log("  Tenant 2: tranthib / 123456");
    console.log("  Tenant 3: leholangc / 123456");

    process.exit(0);
  } catch (error) {
    console.error("✗ Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
