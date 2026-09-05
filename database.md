-- =========================================================
-- DATABASE: ql_phong_tro
-- =========================================================

CREATE DATABASE IF NOT EXISTS ql_phong_tro
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE ql_phong_tro;

-- =========================================================
-- 1. BẢNG KHÁCH THUÊ
-- =========================================================

CREATE TABLE khach_thue (
ma_khach_thue INT AUTO_INCREMENT PRIMARY KEY,
ho_ten VARCHAR(150) NOT NULL,
so_dien_thoai VARCHAR(20),
cccd_giay_to VARCHAR(50) UNIQUE,
thong_tin_lien_he VARCHAR(255),
trang_thai VARCHAR(50) NOT NULL DEFAULT 'DANG_THUE'
) ENGINE=InnoDB;

-- =========================================================
-- 2. BẢNG TÀI KHOẢN
-- =========================================================

CREATE TABLE tai_khoan (
ma_tai_khoan INT AUTO_INCREMENT PRIMARY KEY,
ten_dang_nhap VARCHAR(100) NOT NULL UNIQUE,
mat_khau VARCHAR(255) NOT NULL,
vai_tro ENUM('CHU_TRO', 'KHACH_THUE') NOT NULL,
trang_thai ENUM('HOAT_DONG', 'TAM_DUNG') NOT NULL DEFAULT 'HOAT_DONG',
ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
ma_khach_thue INT UNIQUE,

    CONSTRAINT fk_tai_khoan_khach_thue
        FOREIGN KEY (ma_khach_thue)
        REFERENCES khach_thue(ma_khach_thue)
        ON UPDATE CASCADE
        ON DELETE SET NULL

) ENGINE=InnoDB;
USE ql_phong_tro;

-- =========================================================
-- 1. DỮ LIỆU BẢNG khach_thue
-- =========================================================

INSERT INTO khach_thue
(ho_ten, so_dien_thoai, cccd_giay_to, thong_tin_lien_he, trang_thai)
VALUES
('Nguyen Van An', '0901234567', '079123456789', 'TP. Ho Chi Minh', 'DANG_THUE'),
('Tran Thi Binh', '0912345678', '079234567890', 'TP. Ho Chi Minh', 'DANG_THUE'),
('Le Hoang Nam', '0923456789', '079345678901', 'Binh Duong', 'DANG_THUE'),
('Pham Minh Khoa', '0934567890', '079456789012', 'Dong Nai', 'DA_CHUYEN_DI');

-- =========================================================
-- 2. DỮ LIỆU BẢNG tai_khoan
-- =========================================================

INSERT INTO tai_khoan
(ten_dang_nhap, mat_khau, vai_tro, trang_thai, ma_khach_thue)
VALUES
('chutro', '123456', 'CHU_TRO', 'HOAT_DONG', NULL),
('nguyenvana', '123456', 'KHACH_THUE', 'HOAT_DONG', 1),
('leholangc', '123456', 'KHACH_THUE', 'HOAT_DONG', 2),
('tranthib', '123456', 'KHACH_THUE', 'HOAT_DONG', 3);

-- =========================================================
-- 3. DỮ LIỆU BẢNG can_tro
-- =========================================================

INSERT INTO can_tro
(ten_can, dia_chi, mo_ta)
VALUES
('Can Tro 1', '123 Nguyen Van Cu, Quan 5, TP. Ho Chi Minh', 'Can tro khu A'),
('Can Tro 2', '456 Le Van Viet, Thu Duc, TP. Ho Chi Minh', 'Can tro khu B');

-- =========================================================
-- 4. DỮ LIỆU BẢNG phong_tro
-- =========================================================

INSERT INTO phong_tro
(ma_can, gia_thue, trang_thai, mo_ta)
VALUES
(1, 3500000, 'DANG_THUE', 'Phong 101, tang 1'),
(1, 3200000, 'DA_GIU', 'Phong 102, tang 1'),
(1, 3000000, 'TRONG', 'Phong 103, tang 1'),
(2, 4000000, 'DANG_THUE', 'Phong 201, tang 2'),
(2, 3800000, 'DANG_XU_LY_TRA_PHONG', 'Phong 202, tang 2');

-- =========================================================
-- 5. DỮ LIỆU BẢNG noi_that
-- =========================================================

INSERT INTO noi_that
(ma_phong, ten_thiet_bi, loai_thiet_bi, so_luong, tinh_trang, ngay_ghi_nhan, ghi_chu)
VALUES
(1, 'May lanh', 'Thiet bi dien', 1, 'TOT', '2026-08-01', 'Hoat dong binh thuong'),
(1, 'Giuong', 'Noi that', 1, 'TOT', '2026-08-01', 'Giuong 1m6'),
(1, 'Tu lanh', 'Thiet bi dien', 1, 'TOT', '2026-08-01', 'Dang su dung'),
(2, 'May lanh', 'Thiet bi dien', 1, 'TOT', '2026-08-01', 'Hoat dong binh thuong'),
(2, 'May giat', 'Thiet bi dien', 1, 'TOT', '2026-08-01', 'Dung chung');

-- =========================================================
-- 6. DỮ LIỆU BẢNG dat_coc
-- =========================================================

INSERT INTO dat_coc
(ma_khach_thue, ma_phong, so_tien_coc, ngay_dat_coc,
ngay_bat_dau_giu, ngay_het_han_giu, ngay_xu_ly, trang_thai)
VALUES
(1, 1, 3500000, '2026-07-25', '2026-07-25', '2026-08-01', '2026-08-01', 'DANG_THUE'),
(2, 2, 3200000, '2026-08-20', '2026-08-20', '2026-08-30', NULL, 'DANG_GIU'),
(3, 4, 4000000, '2026-07-28', '2026-07-28', '2026-08-05', '2026-08-05', 'DANG_THUE');

-- =========================================================
-- 7. DỮ LIỆU BẢNG hop_dong
-- =========================================================

INSERT INTO hop_dong
(ma_khach_thue, ma_phong, ngay_ky, ngay_bat_dau,
ngay_ket_thuc, chu_ky_thanh_toan, gia_thue,
tien_coc, phi_dich_vu, dieu_khoan, trang_thai, file_hop_dong)
VALUES
(1, 1, '2026-08-01', '2026-08-01', '2027-07-31',
'HANG_THANG', 3500000, 3500000, 300000,
'Thanh toan hang thang truoc ngay 5',
'DANG_HIEU_LUC', 'hopdong_001.pdf'),

(3, 4, '2026-08-05', '2026-08-05', '2027-08-04',
'HANG_THANG', 4000000, 4000000, 300000,
'Thanh toan hang thang truoc ngay 5',
'DANG_HIEU_LUC', 'hopdong_002.pdf'),

(4, 5, '2025-08-01', '2025-08-01', '2026-07-31',
'HANG_THANG', 3800000, 3800000, 300000,
'Hop dong da ket thuc',
'DA_THANH_LY', 'hopdong_003.pdf');

-- =========================================================
-- 8. DỮ LIỆU BẢNG dien_nuoc
-- =========================================================
-- Lưu ý:
-- Điện: tính theo chỉ số.
-- Nước: 100000 dong / nguoi / thang.

INSERT INTO dien_nuoc
(ma_phong, ky, chi_so_dau, chi_so_cuoi, luong_su_dung,
don_gia, thanh_tien, so_nguoi, tien_nuoc,
nguoi_nhap, hinh_anh_minh_chung, trang_thai_xac_nhan)
VALUES
(1, '2026-08', 1200, 1350, 150,
3500, 525000, 2, 200000,
2, 'dien_101_202608.jpg', 'DA_XAC_NHAN'),

(4, '2026-08', 2100, 2240, 140,
3500, 490000, 1, 100000,
4, 'dien_201_202608.jpg', 'DA_XAC_NHAN'),

(5, '2026-07', 1800, 1930, 130,
3500, 455000, 1, 100000,
5, 'dien_202_202607.jpg', 'DA_XAC_NHAN');

-- =========================================================
-- 9. DỮ LIỆU BẢNG khoan_phai_thu
-- =========================================================

INSERT INTO khoan_phai_thu
(ma_phong, ma_khach_thue, ky,
tien_phong, tien_dien, tien_nuoc,
phi_dich_vu, phi_phat_sinh, khoan_giam_tru,
tong_phai_thanh_toan, han_thanh_toan, trang_thai_thanh_toan)
VALUES
(1, 1, '2026-08',
3500000, 525000, 200000,
300000, 0, 0,
4525000, '2026-08-05', 'DA_THANH_TOAN'),

(4, 3, '2026-08',
4000000, 490000, 100000,
300000, 0, 200000,
4690000, '2026-08-05', 'THANH_TOAN_MOT_PHAN'),

(5, 4, '2026-07',
3800000, 455000, 100000,
300000, 0, 0,
4655000, '2026-07-05', 'QUA_HAN');

-- =========================================================
-- 10. DỮ LIỆU BẢNG thanh_toan
-- =========================================================

INSERT INTO thanh_toan
(ma_khoan_phai_thu, ngay_thanh_toan, so_tien,
phuong_thuc, nguoi_xac_nhan, ghi_chu)
VALUES
(1, '2026-08-03', 4525000,
'CHUYEN_KHOAN', 1, 'Thanh toan du thang 08'),

(2, '2026-08-04', 3000000,
'TIEN_MAT', 1, 'Thanh toan mot phan');

-- =========================================================
-- 11. DỮ LIỆU BẢNG giam_tru
-- =========================================================

INSERT INTO giam_tru
(loai_giam_tru, noi_dung, gia_tri_giam,
thoi_gian_ap_dung, ngay_tao,
ma_khach_thue, ma_phong, ma_hop_dong,
ly_do, trang_thai)
VALUES
('GIAM_TRU_CO_DINH',
'Giam tien thang dau',
200000,
'2026-08',
'2026-08-01',
3, 4, 2,
'Ho tro khach moi',
'DA_AP_DUNG');

-- =========================================================
-- 12. DỮ LIỆU BẢNG chi_phi
-- =========================================================

INSERT INTO chi_phi
(ngay_chi, ma_can, ma_phong,
loai_chi_phi, noi_dung, so_tien,
nguoi_ghi_nhan, ma_tai_san, hinh_anh_minh_chung)
VALUES
('2026-08-02', 1, 1,
'CHI_PHI_SUA_CHUA',
'Sua may lanh phong 101',
500000,
1, 1, 'hoa_don_sua_101.jpg'),

('2026-08-05', 1, NULL,
'CHI_PHI_QUAN_LY_CAN',
'Chi phi quan ly can 1',
300000,
1, NULL, NULL),

('2026-08-10', 2, 4,
'HOA_HONG_GIOI_THIEU',
'Hoa hong gioi thieu khach',
500000,
1, NULL, NULL);

-- =========================================================
-- 13. DỮ LIỆU BẢNG tra_phong
-- =========================================================

INSERT INTO tra_phong
(ma_hop_dong, ngay_thong_bao, ngay_du_kien_tra,
ngay_tra_thuc_te, chi_so_dien_cuoi,
cong_no, hu_hong, khoan_khau_tru,
tien_coc_ban_dau, tien_coc_hoan_lai,
ngay_thanh_ly, ly_do)
VALUES
(3, '2026-07-15', '2026-07-31',
'2026-07-31', 1930,
0, 'May lanh bi hong nhe',
300000,
3800000, 3500000,
'2026-07-31', 'Ket thuc hop dong');

-- =========================================================
-- 14. DỮ LIỆU BẢNG thong_bao
-- =========================================================

INSERT INTO thong_bao
(ma_tai_khoan_nhan, doi_tuong_lien_quan,
loai_thong_bao, noi_dung,
thoi_diem_gui, trang_thai_doc)
VALUES
(2, 'KHOAN_PHAI_THU',
'TIEN_PHONG',
'Tien phong thang 08 da duoc tao.',
'2026-08-01 08:00:00', TRUE),

(3, 'HOP_DONG',
'HOP_DONG',
'Hop dong cua ban sap het han.',
'2026-08-01 09:00:00', FALSE),

(4, 'THANH_TOAN',
'CONG_NO',
'Ban con mot khoan thanh toan chua hoan tat.',
'2026-08-05 10:00:00', FALSE),

(5, 'TRA_PHONG',
'TRA_PHONG',
'Thong tin thanh ly hop dong da duoc cap nhat.',
'2026-07-31 15:00:00', TRUE),

(1, 'PHONG',
'SU_CO',
'Phong 101 co phat sinh su co may lanh.',
'2026-08-02 14:00:00', TRUE);

-- =========================================================
-- 3. BẢNG CĂN TRỌ
-- =========================================================

CREATE TABLE can_tro (
ma_can INT AUTO_INCREMENT PRIMARY KEY,
ten_can VARCHAR(100) NOT NULL,
dia_chi VARCHAR(255) NOT NULL,
mo_ta TEXT
) ENGINE=InnoDB;

-- =========================================================
-- 4. BẢNG PHÒNG TRỌ
-- =========================================================

CREATE TABLE phong_tro (
ma_phong INT AUTO_INCREMENT PRIMARY KEY,
ma_can INT NOT NULL,
gia_thue DECIMAL(12,2) NOT NULL,
trang_thai ENUM(
'TRONG',
'DA_GIU',
'DANG_THUE',
'DANG_XU_LY_TRA_PHONG'
) NOT NULL DEFAULT 'TRONG',
mo_ta TEXT,

    CONSTRAINT fk_phong_can
        FOREIGN KEY (ma_can)
        REFERENCES can_tro(ma_can)
        ON UPDATE CASCADE
        ON DELETE RESTRICT

) ENGINE=InnoDB;

-- =========================================================
-- 5. BẢNG NỘI THẤT
-- =========================================================

CREATE TABLE noi_that (
ma_tai_san INT AUTO_INCREMENT PRIMARY KEY,
ma_phong INT NOT NULL,
ten_thiet_bi VARCHAR(100) NOT NULL,
loai_thiet_bi VARCHAR(100),
so_luong INT NOT NULL DEFAULT 1,
tinh_trang VARCHAR(100),
ngay_ghi_nhan DATE,
ghi_chu TEXT,

    CONSTRAINT fk_noi_that_phong
        FOREIGN KEY (ma_phong)
        REFERENCES phong_tro(ma_phong)
        ON UPDATE CASCADE
        ON DELETE RESTRICT

) ENGINE=InnoDB;

-- =========================================================
-- 6. BẢNG ĐẶT CỌC / GIỮ PHÒNG
-- =========================================================

CREATE TABLE dat_coc (
ma_dat_coc INT AUTO_INCREMENT PRIMARY KEY,
ma_khach_thue INT NOT NULL,
ma_phong INT NOT NULL,
so_tien_coc DECIMAL(12,2) NOT NULL,
ngay_dat_coc DATE NOT NULL,
ngay_bat_dau_giu DATE NOT NULL,
ngay_het_han_giu DATE NOT NULL,
ngay_xu_ly DATE,
trang_thai ENUM(
'DANG_GIU',
'DANG_THUE',
'DA_HUY',
'HET_HAN'
) NOT NULL DEFAULT 'DANG_GIU',

    CONSTRAINT fk_dat_coc_khach
        FOREIGN KEY (ma_khach_thue)
        REFERENCES khach_thue(ma_khach_thue)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_dat_coc_phong
        FOREIGN KEY (ma_phong)
        REFERENCES phong_tro(ma_phong)
        ON UPDATE CASCADE
        ON DELETE RESTRICT

) ENGINE=InnoDB;

-- =========================================================
-- 7. BẢNG HỢP ĐỒNG
-- =========================================================

CREATE TABLE hop_dong (
ma_hop_dong INT AUTO_INCREMENT PRIMARY KEY,
ma_khach_thue INT NOT NULL,
ma_phong INT NOT NULL,
ngay_ky DATE NOT NULL,
ngay_bat_dau DATE NOT NULL,
ngay_ket_thuc DATE NOT NULL,
chu_ky_thanh_toan VARCHAR(50),
gia_thue DECIMAL(12,2) NOT NULL,
tien_coc DECIMAL(12,2) NOT NULL,
phi_dich_vu DECIMAL(12,2) DEFAULT 0,
dieu_khoan TEXT,
trang_thai ENUM(
'DANG_HIEU_LUC',
'DA_KET_THUC',
'DA_THANH_LY'
) NOT NULL DEFAULT 'DANG_HIEU_LUC',
file_hop_dong VARCHAR(255),

    CONSTRAINT fk_hop_dong_khach
        FOREIGN KEY (ma_khach_thue)
        REFERENCES khach_thue(ma_khach_thue)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_hop_dong_phong
        FOREIGN KEY (ma_phong)
        REFERENCES phong_tro(ma_phong)
        ON UPDATE CASCADE
        ON DELETE RESTRICT

) ENGINE=InnoDB;

-- =========================================================
-- 8. BẢNG ĐIỆN / NƯỚC
-- =========================================================

CREATE TABLE dien_nuoc (
ma_dien_nuoc INT AUTO_INCREMENT PRIMARY KEY,
ma_phong INT NOT NULL,
ky VARCHAR(20) NOT NULL,

    chi_so_dau DECIMAL(12,2),
    chi_so_cuoi DECIMAL(12,2),
    luong_su_dung DECIMAL(12,2),

    don_gia DECIMAL(12,2),
    thanh_tien DECIMAL(12,2),

    so_nguoi INT,
    tien_nuoc DECIMAL(12,2),

    nguoi_nhap INT,
    hinh_anh_minh_chung VARCHAR(255),

    trang_thai_xac_nhan ENUM(
        'CHO_XAC_NHAN',
        'DA_XAC_NHAN',
        'CAN_DIEU_CHINH'
    ) NOT NULL DEFAULT 'CHO_XAC_NHAN',

    CONSTRAINT fk_dien_nuoc_phong
        FOREIGN KEY (ma_phong)
        REFERENCES phong_tro(ma_phong)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_dien_nuoc_nguoi_nhap
        FOREIGN KEY (nguoi_nhap)
        REFERENCES tai_khoan(ma_tai_khoan)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    CONSTRAINT uq_dien_nuoc_phong_ky
        UNIQUE (ma_phong, ky)

) ENGINE=InnoDB;

-- =========================================================
-- 9. BẢNG KHOẢN PHẢI THU / HÓA ĐƠN
-- =========================================================

CREATE TABLE khoan_phai_thu (
ma_khoan_phai_thu INT AUTO_INCREMENT PRIMARY KEY,
ma_phong INT NOT NULL,
ma_khach_thue INT NOT NULL,
ky VARCHAR(20) NOT NULL,

    tien_phong DECIMAL(12,2) NOT NULL DEFAULT 0,
    tien_dien DECIMAL(12,2) NOT NULL DEFAULT 0,
    tien_nuoc DECIMAL(12,2) NOT NULL DEFAULT 0,
    phi_dich_vu DECIMAL(12,2) NOT NULL DEFAULT 0,
    phi_phat_sinh DECIMAL(12,2) NOT NULL DEFAULT 0,
    khoan_giam_tru DECIMAL(12,2) NOT NULL DEFAULT 0,

    tong_phai_thanh_toan DECIMAL(12,2) NOT NULL,
    han_thanh_toan DATE NOT NULL,

    trang_thai_thanh_toan ENUM(
        'CHUA_THANH_TOAN',
        'THANH_TOAN_MOT_PHAN',
        'DA_THANH_TOAN',
        'QUA_HAN'
    ) NOT NULL DEFAULT 'CHUA_THANH_TOAN',

    CONSTRAINT fk_khoan_thu_phong
        FOREIGN KEY (ma_phong)
        REFERENCES phong_tro(ma_phong)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_khoan_thu_khach
        FOREIGN KEY (ma_khach_thue)
        REFERENCES khach_thue(ma_khach_thue)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT uq_khoan_thu_phong_ky
        UNIQUE (ma_phong, ky)

) ENGINE=InnoDB;

-- =========================================================
-- 10. BẢNG THANH TOÁN
-- =========================================================

CREATE TABLE thanh_toan (
ma_thanh_toan INT AUTO_INCREMENT PRIMARY KEY,
ma_khoan_phai_thu INT NOT NULL,
ngay_thanh_toan DATE NOT NULL,
so_tien DECIMAL(12,2) NOT NULL,
phuong_thuc VARCHAR(50),
nguoi_xac_nhan INT,
ghi_chu TEXT,

    CONSTRAINT fk_thanh_toan_khoan_thu
        FOREIGN KEY (ma_khoan_phai_thu)
        REFERENCES khoan_phai_thu(ma_khoan_phai_thu)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_thanh_toan_nguoi_xac_nhan
        FOREIGN KEY (nguoi_xac_nhan)
        REFERENCES tai_khoan(ma_tai_khoan)
        ON UPDATE CASCADE
        ON DELETE SET NULL

) ENGINE=InnoDB;

-- =========================================================
-- 11. BẢNG GIẢM TRỪ / ƯU ĐÃI
-- =========================================================

CREATE TABLE giam_tru (
ma_giam_tru INT AUTO_INCREMENT PRIMARY KEY,
loai_giam_tru VARCHAR(50) NOT NULL,
noi_dung TEXT,
gia_tri_giam DECIMAL(12,2) NOT NULL,
thoi_gian_ap_dung VARCHAR(100),
ngay_tao DATE NOT NULL,

    ma_khach_thue INT,
    ma_phong INT,
    ma_hop_dong INT,

    ly_do TEXT,
    trang_thai VARCHAR(50),

    CONSTRAINT fk_giam_tru_khach
        FOREIGN KEY (ma_khach_thue)
        REFERENCES khach_thue(ma_khach_thue)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    CONSTRAINT fk_giam_tru_phong
        FOREIGN KEY (ma_phong)
        REFERENCES phong_tro(ma_phong)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    CONSTRAINT fk_giam_tru_hop_dong
        FOREIGN KEY (ma_hop_dong)
        REFERENCES hop_dong(ma_hop_dong)
        ON UPDATE CASCADE
        ON DELETE SET NULL

) ENGINE=InnoDB;

-- =========================================================
-- 12. BẢNG CHI PHÍ
-- =========================================================

CREATE TABLE chi_phi (
ma_chi_phi INT AUTO_INCREMENT PRIMARY KEY,
ngay_chi DATE NOT NULL,

    ma_can INT,
    ma_phong INT,

    loai_chi_phi VARCHAR(100) NOT NULL,
    noi_dung TEXT,
    so_tien DECIMAL(12,2) NOT NULL,

    nguoi_ghi_nhan INT,
    ma_tai_san INT,
    hinh_anh_minh_chung VARCHAR(255),

    CONSTRAINT fk_chi_phi_can
        FOREIGN KEY (ma_can)
        REFERENCES can_tro(ma_can)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    CONSTRAINT fk_chi_phi_phong
        FOREIGN KEY (ma_phong)
        REFERENCES phong_tro(ma_phong)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    CONSTRAINT fk_chi_phi_nguoi_ghi
        FOREIGN KEY (nguoi_ghi_nhan)
        REFERENCES tai_khoan(ma_tai_khoan)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    CONSTRAINT fk_chi_phi_tai_san
        FOREIGN KEY (ma_tai_san)
        REFERENCES noi_that(ma_tai_san)
        ON UPDATE CASCADE
        ON DELETE SET NULL

) ENGINE=InnoDB;

-- =========================================================
-- 13. BẢNG TRẢ PHÒNG
-- =========================================================

CREATE TABLE tra_phong (
ma_tra_phong INT AUTO_INCREMENT PRIMARY KEY,
ma_hop_dong INT NOT NULL,

    ngay_thong_bao DATE,
    ngay_du_kien_tra DATE,
    ngay_tra_thuc_te DATE,

    chi_so_dien_cuoi DECIMAL(12,2),
    cong_no DECIMAL(12,2) DEFAULT 0,
    hu_hong TEXT,

    khoan_khau_tru DECIMAL(12,2) DEFAULT 0,
    tien_coc_ban_dau DECIMAL(12,2) DEFAULT 0,
    tien_coc_hoan_lai DECIMAL(12,2) DEFAULT 0,

    ngay_thanh_ly DATE,
    ly_do TEXT,

    CONSTRAINT fk_tra_phong_hop_dong
        FOREIGN KEY (ma_hop_dong)
        REFERENCES hop_dong(ma_hop_dong)
        ON UPDATE CASCADE
        ON DELETE RESTRICT

) ENGINE=InnoDB;

-- =========================================================
-- 14. BẢNG THÔNG BÁO
-- =========================================================

CREATE TABLE thong_bao (
ma_thong_bao INT AUTO_INCREMENT PRIMARY KEY,
ma_tai_khoan_nhan INT NOT NULL,

    doi_tuong_lien_quan VARCHAR(100),
    loai_thong_bao VARCHAR(50) NOT NULL,
    noi_dung TEXT NOT NULL,

    thoi_diem_gui DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    trang_thai_doc BOOLEAN NOT NULL DEFAULT FALSE,

    CONSTRAINT fk_thong_bao_tai_khoan
        FOREIGN KEY (ma_tai_khoan_nhan)
        REFERENCES tai_khoan(ma_tai_khoan)
        ON UPDATE CASCADE
        ON DELETE RESTRICT

) ENGINE=InnoDB;

-- =========================================================
-- Quan hệ:
-- =========================================================

khach_thue
│
├── tai_khoan
├── dat_coc
├── hop_dong
├── khoan_phai_thu
└── giam_tru

can_tro
│
└── phong_tro
│
├── noi_that
├── dat_coc
├── hop_dong
├── dien_nuoc
└── khoan_phai_thu
│
└── thanh_toan

hop_dong
│
└── tra_phong

can_tro
└── chi_phi

phong_tro
└── chi_phi

tai_khoan
├── dien_nuoc
├── thanh_toan
├── chi_phi
└── thong_bao
