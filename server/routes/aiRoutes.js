const express = require("express");

const {
  suggestTasks,
} = require("../controllers/aiController");


const router = express.Router();


router.post(
  "/suggest",
  suggestTasks
);


module.exports = router;