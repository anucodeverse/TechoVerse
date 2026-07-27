const express = require("express");
const router = express.Router();


const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/authController");


const protect =
require("../middleware/authMiddleware");

const {
  loginLimiter,
} = require("../middleware/rateLimitMiddleware");

// ================= REGISTER =================

router.post(
  "/register",
  registerUser
);



// ================= LOGIN =================

router.post(
  "/login",
  loginLimiter,
  loginUser
);



// ================= PROFILE =================

router.get(
  "/profile",
  protect,
  getProfile
);



module.exports = router;