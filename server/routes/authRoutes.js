const express = require("express");

const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  changePassword,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Forgot Password

router.post("/forgot-password", forgotPassword);

// Reset Password
router.post("/reset-password/:token", resetPassword);

// Change Password
router.put("/change-password", protect, changePassword);

module.exports = router;