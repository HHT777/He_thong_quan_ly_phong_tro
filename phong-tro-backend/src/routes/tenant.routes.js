const express = require("express");
const controller = require("../controllers/tenant.controller");
const authMiddleware = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const router = express.Router();
router.use(authMiddleware);
router.get(
  "/thong-bao",
  authorize("thongBao.read"),
  controller.listNotifications.bind(controller),
);
router.post(
  "/su-co",
  authorize("suCo.write"),
  controller.createIssue.bind(controller),
);

module.exports = router;
