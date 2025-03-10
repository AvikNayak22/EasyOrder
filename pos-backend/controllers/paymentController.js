const Razorpay = require("razorpay");
const config = require("../config/config");
const crypto = require("crypto");
const createHttpError = require("http-errors");
const Payment = require("../models/paymentModel");

const createOrder = async (req, res, next) => {
  // Initialize Razorpay instance with API keys
  const razorpay = new Razorpay({
    key_id: config.razorpayKeyId,
    key_secret: config.razorpaySecretKey,
  });

  try {
    const { amount } = req.body;

    // Configure order options
    const options = {
      amount: amount * 100, // Converting amount to smallest currency unit (paisa) since Razorpay expects amount in paisa
      currency: "INR", // Setting currency to Indian Rupees
      receipt: `receipt_${Date.now()}`, // Generating unique receipt ID using current timestamp
    };

    // Create order in Razorpay
    const order = await razorpay.orders.create(options);

    // Send successful response with order details
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
    // Extract payment details from request body
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    // Generate expected signature using order_id and payment_id
    const expectedSignature = crypto
      .createHmac("sha256", config.razorpaySecretKey)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    // Compare received signature with expected signature
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
    // Get webhook secret and signature from request
    const secret = config.razorpayWebhookSecret;
    const signature = req.headers["x-razorpay-signature"];

    // Convert request body to string for signature verification
    const body = JSON.stringify(req.body);

    // Generate expected signature using webhook secret
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    // Verify webhook signature
    if (signature === expectedSignature) {
      console.log("Webhook verified: ", req.body);

      // Handle payment.captured event
      if (req.body.event === "payment.captured") {
        const payment = req.body.payload.payment.entity;

        console.log(`Payment captured: ${payment.amount / 100} INR`);

        // Create new payment record in database
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

        // Save payment details to database
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

// Export controller functions
module.exports = {
  createOrder,
  verifyPayment,
  WebHookVerification,
};
