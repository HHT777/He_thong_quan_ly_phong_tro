const express = require("express");
const {
  KhoanPhaiThuController,
  ThanhToanController,
} = require("../controllers/khoanPhaiThu.controller");
const authMiddleware = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// ========== KHOẢN PHẢI THU (Bills) Routes ==========
router.post(
  "/",
  authorize("khoanPhaiThu.write"),
  KhoanPhaiThuController.createKhoanPhaiThu.bind(KhoanPhaiThuController),
);
router.get(
  "/",
  authorize("khoanPhaiThu.read"),
  KhoanPhaiThuController.getKhoanPhaiThuList.bind(KhoanPhaiThuController),
);
router.get(
  "/list/overdue",
  authorize("khoanPhaiThu.read"),
  KhoanPhaiThuController.getOverdueBills.bind(KhoanPhaiThuController),
);
router.get(
  "/:id",
  authorize("khoanPhaiThu.read"),
  KhoanPhaiThuController.getKhoanPhaiThuById.bind(KhoanPhaiThuController),
);
router.get(
  "/khach-thue/:khachThueId",
  authorize("khoanPhaiThu.read"),
  KhoanPhaiThuController.getOutstandingBills.bind(KhoanPhaiThuController),
);
// ========== THANH TOÁN (Payment) Routes ==========
router.post(
  "/payment/create",
  authorize("thanhToan.write"),
  ThanhToanController.createThanhToan.bind(ThanhToanController),
);
router.get(
  "/payment/list",
  authorize("thanhToan.read"),
  ThanhToanController.getThanhToanList.bind(ThanhToanController),
);
router.get(
  "/payment/stats",
  authorize("thanhToan.stats"),
  ThanhToanController.getPaymentStats.bind(ThanhToanController),
);
router.get(
  "/payment/:id",
  authorize("thanhToan.read"),
  ThanhToanController.getThanhToanById.bind(ThanhToanController),
);

module.exports = router;
