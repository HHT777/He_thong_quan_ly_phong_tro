const express = require("express");
const datCocController = require("../controllers/datCoc.controller");
const authMiddleware = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Only landlord can manage deposits
router.post(
  "/",
  authorize("datCoc.write"),
  datCocController.createDatCoc.bind(datCocController),
);
router.get(
  "/",
  authorize("datCoc.read"),
  datCocController.getDatCocList.bind(datCocController),
);
router.get(
  "/:id",
  authorize("datCoc.read"),
  datCocController.getDatCocById.bind(datCocController),
);
router.put(
  "/:id",
  authorize("datCoc.write"),
  datCocController.updateDatCoc.bind(datCocController),
);
router.post(
  "/:id/confirm",
  authorize("datCoc.write"),
  datCocController.confirmDeposit.bind(datCocController),
);
router.post(
  "/:id/cancel",
  authorize("datCoc.write"),
  datCocController.cancelDeposit.bind(datCocController),
);

module.exports = router;
