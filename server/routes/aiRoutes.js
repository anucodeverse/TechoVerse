const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
  suggestTasks,
} = require("../controllers/aiController");


const router = express.Router();

router.post(
  "/suggest",
  protect,
  suggestTasks
);

module.exports = router;