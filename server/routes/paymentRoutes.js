const express = require("express");

const router = express.Router();


const {
  createCheckoutSession,
  verifyPayment
} = require("../controllers/paymentController");


const protect =
require("../middleware/authMiddleware");




// Create Stripe Checkout Session
router.post(
  "/create-checkout-session",
  protect,
  createCheckoutSession
);




// Verify Payment
router.post(
  "/verify-payment",
  protect,
  verifyPayment
);



module.exports = router;