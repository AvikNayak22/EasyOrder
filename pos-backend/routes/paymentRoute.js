const express = require("express");
const isVerifiedUser = require("../middlewares/tokenVerification");
const {
  createOrder,
  verifyPayment,
  WebHookVerification,
} = require("../controllers/paymentController");
const router = express.Router();

router.route("/create-order").post(isVerifiedUser, createOrder);
router.route("/verify-payment").post(isVerifiedUser, verifyPayment);
router.route("/webhook-verification").post(isVerifiedUser, WebHookVerification);

module.exports = router;
