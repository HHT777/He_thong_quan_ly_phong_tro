const express = require("express");
const hopDongController = require("../controllers/hopDong.controller");
const authMiddleware = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Only landlord can create and update contracts
router.post(
  "/",
  authorize("hopDong.write"),
  hopDongController.createHopDong.bind(hopDongController),
);
router.get(
  "/",
  authorize("hopDong.read"),
  hopDongController.getHopDongList.bind(hopDongController),
);
router.get(
  "/expiring",
  authorize("hopDong.read"),
  hopDongController.getExpiringContracts.bind(hopDongController),
);
router.get(
  "/:id",
  authorize("hopDong.read"),
  hopDongController.getHopDongById.bind(hopDongController),
);
router.put(
  "/:id",
  authorize("hopDong.write"),
  hopDongController.updateHopDong.bind(hopDongController),
);
router.post(
  "/:id/renew",
  authorize("hopDong.write"),
  hopDongController.renewHopDong.bind(hopDongController),
);

module.exports = router;
