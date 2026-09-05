const express = require("express");
const controller = require("../controllers/management.controller");
const authMiddleware = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const router = express.Router();
router.use(authMiddleware);

router.get(
  "/can-tro",
  authorize("canTro.read"),
  controller.listCanTro.bind(controller),
);
router.post(
  "/can-tro",
  authorize("canTro.write"),
  controller.createCanTro.bind(controller),
);
router.put(
  "/can-tro/:id",
  authorize("canTro.write"),
  controller.updateCanTro.bind(controller),
);
router.delete(
  "/can-tro/:id",
  authorize("canTro.write"),
  controller.deleteCanTro.bind(controller),
);

router.get(
  "/khach-thue",
  authorize("khachThue.read"),
  controller.listKhachThue.bind(controller),
);
router.post(
  "/khach-thue",
  authorize("khachThue.write"),
  controller.createKhachThue.bind(controller),
);
router.put(
  "/khach-thue/:id",
  authorize("khachThue.write"),
  controller.updateKhachThue.bind(controller),
);
router.delete(
  "/khach-thue/:id",
  authorize("khachThue.write"),
  controller.deleteKhachThue.bind(controller),
);

router.get(
  "/thu-chi",
  authorize("thuChi.read"),
  controller.listChiPhi.bind(controller),
);
router.post(
  "/thu-chi",
  authorize("thuChi.write"),
  controller.createChiPhi.bind(controller),
);
router.put(
  "/thu-chi/:id",
  authorize("thuChi.write"),
  controller.updateChiPhi.bind(controller),
);
router.delete(
  "/thu-chi/:id",
  authorize("thuChi.write"),
  controller.deleteChiPhi.bind(controller),
);

module.exports = router;
