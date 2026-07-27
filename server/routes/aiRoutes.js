const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  suggestTasks,
} = require("../controllers/aiController");

const {
  aiLimiter,
} = require("../middleware/rateLimitMiddleware");
const router = express.Router();

router.post(
  "/suggest",
  protect,
  aiLimiter,
  suggestTasks
);



module.exports = router;