-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 06, 2026 at 07:34 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ql_phong_tro`
--

-- --------------------------------------------------------

--
-- Table structure for table `can_tro`
--

CREATE TABLE `can_tro` (
  `ma_can` int(11) NOT NULL,
  `ten_can` varchar(100) NOT NULL,
  `dia_chi` varchar(255) NOT NULL,
  `mo_ta` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `can_tro`
--

INSERT INTO `can_tro` (`ma_can`, `ten_can`, `dia_chi`, `mo_ta`) VALUES
(1, 'Căn Trọ 1', '123 Nguyễn Văn Cư, Quận 5, TP. Hồ Chí Minh', 'Khu trọ A'),
(2, 'Căn Trọ 2', '456 Lê Văn Việt, Thủ Đức, TP. Hồ Chí Minh', 'Khu trọ B');

-- --------------------------------------------------------

--
-- Table structure for table `chi_phi`
--

CREATE TABLE `chi_phi` (
  `ma_chi_phi` int(11) NOT NULL,
  `ngay_chi` datetime NOT NULL,
  `ma_can` int(11) DEFAULT NULL,
  `ma_phong` int(11) DEFAULT NULL,
  `loai_chi_phi` varchar(100) NOT NULL,
  `noi_dung` text DEFAULT NULL,
  `so_tien` decimal(12,2) NOT NULL,
  `nguoi_ghi_nhan` int(11) DEFAULT NULL,
  `ma_tai_san` int(11) DEFAULT NULL,
  `hinh_anh_minh_chung` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dat_coc`
--

CREATE TABLE `dat_coc` (
  `ma_dat_coc` int(11) NOT NULL,
  `ma_khach_thue` int(11) NOT NULL,
  `ma_phong` int(11) NOT NULL,
  `so_tien_coc` decimal(12,2) NOT NULL,
  `ngay_dat_coc` datetime NOT NULL,
  `ngay_bat_dau_giu` datetime NOT NULL,
  `ngay_het_han_giu` datetime NOT NULL,
  `ngay_xu_ly` datetime DEFAULT NULL,
  `trang_thai` enum('DANG_GIU','DANG_THUE','DA_HUY','HET_HAN') NOT NULL DEFAULT 'DANG_GIU'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `dat_coc`
--

INSERT INTO `dat_coc` (`ma_dat_coc`, `ma_khach_thue`, `ma_phong`, `so_tien_coc`, `ngay_dat_coc`, `ngay_bat_dau_giu`, `ngay_het_han_giu`, `ngay_xu_ly`, `trang_thai`) VALUES
(1, 1, 1, 3500000.00, '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2026-09-01 00:00:00', '2026-09-01 00:00:00', 'DANG_THUE'),
(2, 2, 2, 3200000.00, '2026-08-15 00:00:00', '2026-08-15 00:00:00', '2026-09-15 00:00:00', NULL, 'DANG_GIU'),
(3, 3, 4, 4000000.00, '2026-08-05 00:00:00', '2026-08-05 00:00:00', '2026-09-05 00:00:00', '2026-09-05 00:00:00', 'DANG_THUE');

-- --------------------------------------------------------

--
-- Table structure for table `dien_nuoc`
--

CREATE TABLE `dien_nuoc` (
  `ma_dien_nuoc` int(11) NOT NULL,
  `ma_phong` int(11) NOT NULL,
  `ky` varchar(20) NOT NULL,
  `chi_so_dau` decimal(12,2) DEFAULT NULL,
  `chi_so_cuoi` decimal(12,2) DEFAULT NULL,
  `luong_su_dung` decimal(12,2) DEFAULT NULL,
  `don_gia` decimal(12,2) DEFAULT NULL,
  `thanh_tien` decimal(12,2) DEFAULT NULL,
  `so_nguoi` int(11) DEFAULT NULL,
  `tien_nuoc` decimal(12,2) DEFAULT NULL,
  `nguoi_nhap` int(11) DEFAULT NULL,
  `hinh_anh_minh_chung` varchar(255) DEFAULT NULL,
  `trang_thai_xac_nhan` enum('CHO_XAC_NHAN','DA_XAC_NHAN','CAN_DIEU_CHINH') NOT NULL DEFAULT 'CHO_XAC_NHAN'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `giam_tru`
--

CREATE TABLE `giam_tru` (
  `ma_giam_tru` int(11) NOT NULL,
  `loai_giam_tru` varchar(50) NOT NULL,
  `noi_dung` text DEFAULT NULL,
  `gia_tri_giam` decimal(12,2) NOT NULL,
  `thoi_gian_ap_dung` varchar(100) DEFAULT NULL,
  `ngay_tao` datetime NOT NULL,
  `ma_khach_thue` int(11) DEFAULT NULL,
  `ma_phong` int(11) DEFAULT NULL,
  `ma_hop_dong` int(11) DEFAULT NULL,
  `ly_do` text DEFAULT NULL,
  `trang_thai` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hop_dong`
--

CREATE TABLE `hop_dong` (
  `ma_hop_dong` int(11) NOT NULL,
  `ma_khach_thue` int(11) NOT NULL,
  `ma_phong` int(11) NOT NULL,
  `ngay_ky` datetime NOT NULL,
  `ngay_bat_dau` datetime NOT NULL,
  `ngay_ket_thuc` datetime NOT NULL,
  `chu_ky_thanh_toan` varchar(50) DEFAULT NULL,
  `gia_thue` decimal(12,2) NOT NULL,
  `tien_coc` decimal(12,2) NOT NULL,
  `phi_dich_vu` decimal(12,2) DEFAULT 0.00,
  `dieu_khoan` text DEFAULT NULL,
  `trang_thai` enum('DANG_HIEU_LUC','DA_KET_THUC','DA_THANH_LY') NOT NULL DEFAULT 'DANG_HIEU_LUC',
  `file_hop_dong` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `hop_dong`
--

INSERT INTO `hop_dong` (`ma_hop_dong`, `ma_khach_thue`, `ma_phong`, `ngay_ky`, `ngay_bat_dau`, `ngay_ket_thuc`, `chu_ky_thanh_toan`, `gia_thue`, `tien_coc`, `phi_dich_vu`, `dieu_khoan`, `trang_thai`, `file_hop_dong`) VALUES
(1, 1, 1, '2026-08-01 00:00:00', '2026-08-01 00:00:00', '2027-07-31 00:00:00', 'HANG_THANG', 3500000.00, 3500000.00, 300000.00, 'Thanh toán hàng tháng trước ngày 5', 'DANG_HIEU_LUC', 'hopdong_001.pdf'),
(2, 2, 2, '2026-08-15 00:00:00', '2026-08-15 00:00:00', '2027-08-14 00:00:00', 'HANG_THANG', 3200000.00, 3200000.00, 250000.00, 'Thanh toán hàng tháng trước ngày 5', 'DANG_HIEU_LUC', 'hopdong_002.pdf'),
(3, 3, 4, '2026-08-05 00:00:00', '2026-08-05 00:00:00', '2027-08-04 00:00:00', 'HANG_THANG', 4000000.00, 4000000.00, 350000.00, 'Thanh toán hàng tháng trước ngày 5', 'DANG_HIEU_LUC', 'hopdong_003.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `khach_thue`
--

CREATE TABLE `khach_thue` (
  `ma_khach_thue` int(11) NOT NULL,
  `ho_ten` varchar(150) NOT NULL,
  `so_dien_thoai` varchar(20) DEFAULT NULL,
  `cccd_giay_to` varchar(50) DEFAULT NULL,
  `thong_tin_lien_he` varchar(255) DEFAULT NULL,
  `trang_thai` enum('DANG_THUE','DA_CHUYEN_DI','TAM_DUNG') NOT NULL DEFAULT 'DANG_THUE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `khach_thue`
--

INSERT INTO `khach_thue` (`ma_khach_thue`, `ho_ten`, `so_dien_thoai`, `cccd_giay_to`, `thong_tin_lien_he`, `trang_thai`) VALUES
(1, 'Nguyễn Văn A', '0901234567', '079123456789', 'TP. Hồ Chí Minh', 'DANG_THUE'),
(2, 'Trần Thị B', '0912345678', '079234567890', 'TP. Hồ Chí Minh', 'DANG_THUE'),
(3, 'Lê Hoàng C', '0923456789', '079345678901', 'Bình Dương', 'DANG_THUE');

-- --------------------------------------------------------

--
-- Table structure for table `khoan_phai_thu`
--

CREATE TABLE `khoan_phai_thu` (
  `ma_khoan_phai_thu` int(11) NOT NULL,
  `ma_phong` int(11) NOT NULL,
  `ma_khach_thue` int(11) NOT NULL,
  `ky` varchar(20) NOT NULL,
  `tien_phong` decimal(12,2) DEFAULT 0.00,
  `tien_dien` decimal(12,2) DEFAULT 0.00,
  `tien_nuoc` decimal(12,2) DEFAULT 0.00,
  `phi_dich_vu` decimal(12,2) DEFAULT 0.00,
  `phi_phat_sinh` decimal(12,2) DEFAULT 0.00,
  `khoan_giam_tru` decimal(12,2) DEFAULT 0.00,
  `tong_phai_thanh_toan` decimal(12,2) NOT NULL,
  `han_thanh_toan` datetime NOT NULL,
  `trang_thai_thanh_toan` enum('CHUA_THANH_TOAN','THANH_TOAN_MOT_PHAN','DA_THANH_TOAN','QUA_HAN') NOT NULL DEFAULT 'CHUA_THANH_TOAN'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `noi_that`
--

CREATE TABLE `noi_that` (
  `ma_tai_san` int(11) NOT NULL,
  `ma_phong` int(11) NOT NULL,
  `ten_thiet_bi` varchar(100) NOT NULL,
  `loai_thiet_bi` varchar(100) DEFAULT NULL,
  `so_luong` int(11) DEFAULT 1,
  `tinh_trang` varchar(100) DEFAULT NULL,
  `ngay_ghi_nhan` datetime DEFAULT NULL,
  `ghi_chu` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `phong_tro`
--

CREATE TABLE `phong_tro` (
  `ma_phong` int(11) NOT NULL,
  `ma_can` int(11) NOT NULL,
  `gia_thue` decimal(12,2) NOT NULL,
  `trang_thai` enum('TRONG','DA_GIU','DANG_THUE','DANG_XU_LY_TRA_PHONG') NOT NULL DEFAULT 'TRONG',
  `mo_ta` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `phong_tro`
--

INSERT INTO `phong_tro` (`ma_phong`, `ma_can`, `gia_thue`, `trang_thai`, `mo_ta`) VALUES
(1, 1, 3500000.00, 'DANG_THUE', 'Phòng 101, tầng 1'),
(2, 1, 3200000.00, 'DANG_THUE', 'Phòng 102, tầng 1'),
(3, 1, 3000000.00, 'TRONG', 'Phòng 103, tầng 1'),
(4, 2, 4000000.00, 'DANG_THUE', 'Phòng 201, tầng 2');

-- --------------------------------------------------------

--
-- Table structure for table `tai_khoan`
--

CREATE TABLE `tai_khoan` (
  `ma_tai_khoan` int(11) NOT NULL,
  `ten_dang_nhap` varchar(100) NOT NULL,
  `mat_khau` varchar(255) NOT NULL,
  `vai_tro` enum('CHU_TRO','KHACH_THUE') NOT NULL,
  `trang_thai` enum('HOAT_DONG','TAM_DUNG') NOT NULL DEFAULT 'HOAT_DONG',
  `ngay_tao` datetime DEFAULT NULL,
  `ma_khach_thue` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tai_khoan`
--

INSERT INTO `tai_khoan` (`ma_tai_khoan`, `ten_dang_nhap`, `mat_khau`, `vai_tro`, `trang_thai`, `ngay_tao`, `ma_khach_thue`) VALUES
(1, 'chutro', '$2a$10$JU6T6tpkYD58OngvZF4zpekywID5Dn9w5FbX4jJAf5e.urV8RFmha', 'CHU_TRO', 'HOAT_DONG', '2026-09-05 04:47:52', NULL),
(2, 'nguyenvana', '$2a$10$9.OJEydHmqOCHaAndFP7rOWj/VU9NBKsOfGq9lPvYEl7pRQg3YVrq', 'KHACH_THUE', 'HOAT_DONG', '2026-09-05 04:47:52', 1),
(3, 'leholangc', '$2a$10$uYPExr98m.rtTIq2pI14Yukxeovj.bOEWa50lhpDtZ4SNKl0GegVu', 'KHACH_THUE', 'HOAT_DONG', '2026-09-05 04:47:52', 3),
(4, 'tranthib', '$2a$10$r3BDtPmjbrLxDDEZtRj0huDW34B5SIgC4Ol20XDxE4zHoD2aYJavC', 'KHACH_THUE', 'HOAT_DONG', '2026-09-05 04:47:52', 2);

-- --------------------------------------------------------

--
-- Table structure for table `thanh_toan`
--

CREATE TABLE `thanh_toan` (
  `ma_thanh_toan` int(11) NOT NULL,
  `ma_khoan_phai_thu` int(11) NOT NULL,
  `ngay_thanh_toan` datetime NOT NULL,
  `so_tien` decimal(12,2) NOT NULL,
  `phuong_thuc` varchar(50) DEFAULT NULL,
  `nguoi_xac_nhan` int(11) DEFAULT NULL,
  `ghi_chu` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `thong_bao`
--

CREATE TABLE `thong_bao` (
  `ma_thong_bao` int(11) NOT NULL,
  `ma_tai_khoan_nhan` int(11) NOT NULL,
  `doi_tuong_lien_quan` varchar(100) DEFAULT NULL,
  `loai_thong_bao` varchar(50) NOT NULL,
  `noi_dung` text NOT NULL,
  `thoi_diem_gui` datetime DEFAULT NULL,
  `trang_thai_doc` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tra_phong`
--

CREATE TABLE `tra_phong` (
  `ma_tra_phong` int(11) NOT NULL,
  `ma_hop_dong` int(11) NOT NULL,
  `ngay_thong_bao` datetime DEFAULT NULL,
  `ngay_du_kien_tra` datetime DEFAULT NULL,
  `ngay_tra_thuc_te` datetime DEFAULT NULL,
  `chi_so_dien_cuoi` decimal(12,2) DEFAULT NULL,
  `cong_no` decimal(12,2) DEFAULT 0.00,
  `hu_hong` text DEFAULT NULL,
  `khoan_khau_tru` decimal(12,2) DEFAULT 0.00,
  `tien_coc_ban_dau` decimal(12,2) DEFAULT 0.00,
  `tien_coc_hoan_lai` decimal(12,2) DEFAULT 0.00,
  `ngay_thanh_ly` datetime DEFAULT NULL,
  `ly_do` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `can_tro`
--
ALTER TABLE `can_tro`
  ADD PRIMARY KEY (`ma_can`);

--
-- Indexes for table `chi_phi`
--
ALTER TABLE `chi_phi`
  ADD PRIMARY KEY (`ma_chi_phi`),
  ADD KEY `ma_can` (`ma_can`),
  ADD KEY `ma_phong` (`ma_phong`),
  ADD KEY `nguoi_ghi_nhan` (`nguoi_ghi_nhan`),
  ADD KEY `ma_tai_san` (`ma_tai_san`);

--
-- Indexes for table `dat_coc`
--
ALTER TABLE `dat_coc`
  ADD PRIMARY KEY (`ma_dat_coc`),
  ADD KEY `ma_khach_thue` (`ma_khach_thue`),
  ADD KEY `ma_phong` (`ma_phong`);

--
-- Indexes for table `dien_nuoc`
--
ALTER TABLE `dien_nuoc`
  ADD PRIMARY KEY (`ma_dien_nuoc`),
  ADD UNIQUE KEY `dien_nuoc_ma_phong_ky` (`ma_phong`,`ky`),
  ADD KEY `nguoi_nhap` (`nguoi_nhap`);

--
-- Indexes for table `giam_tru`
--
ALTER TABLE `giam_tru`
  ADD PRIMARY KEY (`ma_giam_tru`),
  ADD KEY `ma_khach_thue` (`ma_khach_thue`),
  ADD KEY `ma_phong` (`ma_phong`),
  ADD KEY `ma_hop_dong` (`ma_hop_dong`);

--
-- Indexes for table `hop_dong`
--
ALTER TABLE `hop_dong`
  ADD PRIMARY KEY (`ma_hop_dong`),
  ADD KEY `ma_khach_thue` (`ma_khach_thue`),
  ADD KEY `ma_phong` (`ma_phong`);

--
-- Indexes for table `khach_thue`
--
ALTER TABLE `khach_thue`
  ADD PRIMARY KEY (`ma_khach_thue`),
  ADD UNIQUE KEY `cccd_giay_to` (`cccd_giay_to`),
  ADD UNIQUE KEY `cccd_giay_to_2` (`cccd_giay_to`),
  ADD UNIQUE KEY `cccd_giay_to_3` (`cccd_giay_to`);

--
-- Indexes for table `khoan_phai_thu`
--
ALTER TABLE `khoan_phai_thu`
  ADD PRIMARY KEY (`ma_khoan_phai_thu`),
  ADD UNIQUE KEY `khoan_phai_thu_ma_phong_ky` (`ma_phong`,`ky`),
  ADD KEY `ma_khach_thue` (`ma_khach_thue`);

--
-- Indexes for table `noi_that`
--
ALTER TABLE `noi_that`
  ADD PRIMARY KEY (`ma_tai_san`),
  ADD KEY `ma_phong` (`ma_phong`);

--
-- Indexes for table `phong_tro`
--
ALTER TABLE `phong_tro`
  ADD PRIMARY KEY (`ma_phong`),
  ADD KEY `ma_can` (`ma_can`);

--
-- Indexes for table `tai_khoan`
--
ALTER TABLE `tai_khoan`
  ADD PRIMARY KEY (`ma_tai_khoan`),
  ADD UNIQUE KEY `ten_dang_nhap` (`ten_dang_nhap`),
  ADD UNIQUE KEY `ten_dang_nhap_2` (`ten_dang_nhap`),
  ADD UNIQUE KEY `ten_dang_nhap_3` (`ten_dang_nhap`),
  ADD UNIQUE KEY `ma_khach_thue` (`ma_khach_thue`);

--
-- Indexes for table `thanh_toan`
--
ALTER TABLE `thanh_toan`
  ADD PRIMARY KEY (`ma_thanh_toan`),
  ADD KEY `ma_khoan_phai_thu` (`ma_khoan_phai_thu`),
  ADD KEY `nguoi_xac_nhan` (`nguoi_xac_nhan`);

--
-- Indexes for table `thong_bao`
--
ALTER TABLE `thong_bao`
  ADD PRIMARY KEY (`ma_thong_bao`),
  ADD KEY `ma_tai_khoan_nhan` (`ma_tai_khoan_nhan`);

--
-- Indexes for table `tra_phong`
--
ALTER TABLE `tra_phong`
  ADD PRIMARY KEY (`ma_tra_phong`),
  ADD KEY `ma_hop_dong` (`ma_hop_dong`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `can_tro`
--
ALTER TABLE `can_tro`
  MODIFY `ma_can` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `chi_phi`
--
ALTER TABLE `chi_phi`
  MODIFY `ma_chi_phi` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dat_coc`
--
ALTER TABLE `dat_coc`
  MODIFY `ma_dat_coc` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `dien_nuoc`
--
ALTER TABLE `dien_nuoc`
  MODIFY `ma_dien_nuoc` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `giam_tru`
--
ALTER TABLE `giam_tru`
  MODIFY `ma_giam_tru` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hop_dong`
--
ALTER TABLE `hop_dong`
  MODIFY `ma_hop_dong` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `khach_thue`
--
ALTER TABLE `khach_thue`
  MODIFY `ma_khach_thue` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `khoan_phai_thu`
--
ALTER TABLE `khoan_phai_thu`
  MODIFY `ma_khoan_phai_thu` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `noi_that`
--
ALTER TABLE `noi_that`
  MODIFY `ma_tai_san` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `phong_tro`
--
ALTER TABLE `phong_tro`
  MODIFY `ma_phong` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tai_khoan`
--
ALTER TABLE `tai_khoan`
  MODIFY `ma_tai_khoan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `thanh_toan`
--
ALTER TABLE `thanh_toan`
  MODIFY `ma_thanh_toan` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `thong_bao`
--
ALTER TABLE `thong_bao`
  MODIFY `ma_thong_bao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tra_phong`
--
ALTER TABLE `tra_phong`
  MODIFY `ma_tra_phong` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chi_phi`
--
ALTER TABLE `chi_phi`
  ADD CONSTRAINT `chi_phi_ibfk_5` FOREIGN KEY (`ma_can`) REFERENCES `can_tro` (`ma_can`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `chi_phi_ibfk_6` FOREIGN KEY (`ma_phong`) REFERENCES `phong_tro` (`ma_phong`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `chi_phi_ibfk_7` FOREIGN KEY (`nguoi_ghi_nhan`) REFERENCES `tai_khoan` (`ma_tai_khoan`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `chi_phi_ibfk_8` FOREIGN KEY (`ma_tai_san`) REFERENCES `noi_that` (`ma_tai_san`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `dat_coc`
--
ALTER TABLE `dat_coc`
  ADD CONSTRAINT `dat_coc_ibfk_5` FOREIGN KEY (`ma_khach_thue`) REFERENCES `khach_thue` (`ma_khach_thue`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dat_coc_ibfk_6` FOREIGN KEY (`ma_phong`) REFERENCES `phong_tro` (`ma_phong`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `dien_nuoc`
--
ALTER TABLE `dien_nuoc`
  ADD CONSTRAINT `dien_nuoc_ibfk_4` FOREIGN KEY (`nguoi_nhap`) REFERENCES `tai_khoan` (`ma_tai_khoan`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `giam_tru`
--
ALTER TABLE `giam_tru`
  ADD CONSTRAINT `giam_tru_ibfk_4` FOREIGN KEY (`ma_khach_thue`) REFERENCES `khach_thue` (`ma_khach_thue`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `giam_tru_ibfk_5` FOREIGN KEY (`ma_phong`) REFERENCES `phong_tro` (`ma_phong`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `giam_tru_ibfk_6` FOREIGN KEY (`ma_hop_dong`) REFERENCES `hop_dong` (`ma_hop_dong`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `hop_dong`
--
ALTER TABLE `hop_dong`
  ADD CONSTRAINT `hop_dong_ibfk_5` FOREIGN KEY (`ma_khach_thue`) REFERENCES `khach_thue` (`ma_khach_thue`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hop_dong_ibfk_6` FOREIGN KEY (`ma_phong`) REFERENCES `phong_tro` (`ma_phong`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `khoan_phai_thu`
--
ALTER TABLE `khoan_phai_thu`
  ADD CONSTRAINT `khoan_phai_thu_ibfk_3` FOREIGN KEY (`ma_phong`) REFERENCES `phong_tro` (`ma_phong`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `khoan_phai_thu_ibfk_4` FOREIGN KEY (`ma_khach_thue`) REFERENCES `khach_thue` (`ma_khach_thue`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `noi_that`
--
ALTER TABLE `noi_that`
  ADD CONSTRAINT `noi_that_ibfk_1` FOREIGN KEY (`ma_phong`) REFERENCES `phong_tro` (`ma_phong`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `phong_tro`
--
ALTER TABLE `phong_tro`
  ADD CONSTRAINT `phong_tro_ibfk_1` FOREIGN KEY (`ma_can`) REFERENCES `can_tro` (`ma_can`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tai_khoan`
--
ALTER TABLE `tai_khoan`
  ADD CONSTRAINT `tai_khoan_ibfk_1` FOREIGN KEY (`ma_khach_thue`) REFERENCES `khach_thue` (`ma_khach_thue`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `thanh_toan`
--
ALTER TABLE `thanh_toan`
  ADD CONSTRAINT `thanh_toan_ibfk_3` FOREIGN KEY (`ma_khoan_phai_thu`) REFERENCES `khoan_phai_thu` (`ma_khoan_phai_thu`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `thanh_toan_ibfk_4` FOREIGN KEY (`nguoi_xac_nhan`) REFERENCES `tai_khoan` (`ma_tai_khoan`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `thong_bao`
--
ALTER TABLE `thong_bao`
  ADD CONSTRAINT `thong_bao_ibfk_1` FOREIGN KEY (`ma_tai_khoan_nhan`) REFERENCES `tai_khoan` (`ma_tai_khoan`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `tra_phong`
--
ALTER TABLE `tra_phong`
  ADD CONSTRAINT `tra_phong_ibfk_1` FOREIGN KEY (`ma_hop_dong`) REFERENCES `hop_dong` (`ma_hop_dong`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
