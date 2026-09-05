const express = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Public routes
router.post("/login", authController.login.bind(authController));
router.post(
  "/register-khach-thue",
  authController.registerKhachThue.bind(authController),
);

// Protected routes
router.get(
  "/profile",
  authMiddleware,
  authController.getProfile.bind(authController),
);

module.exports = router;
