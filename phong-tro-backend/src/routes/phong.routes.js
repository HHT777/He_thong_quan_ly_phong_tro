const express = require("express");
const phongController = require("../controllers/phong.controller");
const authMiddleware = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Only landlord can manage rooms
router.post(
  "/",
  authorize("phong.write"),
  phongController.createPhong.bind(phongController),
);
router.get(
  "/",
  authorize("phong.read"),
  phongController.getPhongList.bind(phongController),
);
router.get(
  "/:id",
  authorize("phong.read"),
  phongController.getPhongById.bind(phongController),
);
router.put(
  "/:id",
  authorize("phong.write"),
  phongController.updatePhong.bind(phongController),
);
router.delete(
  "/:id",
  authorize("phong.write"),
  phongController.deletePhong.bind(phongController),
);

module.exports = router;
