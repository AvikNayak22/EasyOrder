const Razorpay = require("razorpay");
const config = require("../config/config");
const crypto = require("crypto");
const createHttpError = require("http-errors");
const Payment = require("../models/paymentModel");

const createOrder = async (req, res, next) => {
  const razorpay = new Razorpay({
    key_id: config.razorpayKeyId,
    key_secret: config.razorpaySecretKey,
  });

  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // Converting amount to smallest currency unit (paisa) since Razorpay expects amount in paisa
      currency: "INR", // Setting currency to Indian Rupees
      receipt: `receipt_${Date.now()}`, // Generating unique receipt ID using current timestamp
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};

const verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const expectedSignature = crypto
      .createHmac("sha256", config.razorpaySecretKey)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (razorpay_signature === expectedSignature) {
      res.status(200).json({
        success: true,
        message: "Payment verified successfully!",
      });
    } else {
      const error = createHttpError(400, "Payment verification failed!");
      return next(error);
    }
  } catch (error) {
    next(error);
  }
};

const WebHookVerification = async (req, res, next) => {
  try {
    const secret = config.razorpayWebhookSecret;
    const signature = req.headers["x-razorpay-signature"];

    const body = JSON.stringify(req.body);

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    if (signature === expectedSignature) {
      console.log("Webhook verified: ", req.body);

      if (req.body.event === "payment.captured") {
        const payment = req.body.payload.payment.entity;

        console.log(`Payment captured: ${payment.amount / 100} INR`);

        // Save payment details to the database
        const newPayment = new Payment({
          paymentId: payment.id,
          orderId: payment.order_id,
          amount: payment.amount / 100,
          currency: payment.currency,
          status: payment.status,
          method: payment.method,
          email: payment.email,
          contact: payment.contact,
          createdAt: new Date(payment.createdAt * 1000),
        });

        await newPayment.save();
      }

      res.status(200).json({
        success: true,
      });
    } else {
      const error = createHttpError(400, "Invalid signature!");
      return next(error);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  verifyPayment,
  WebHookVerification,
};
