const express = require('express');
const router = express.Router();

const { processPayment, getStripeApi } = require("../controllers/paymentController.js")
const { isAuthenticatedUser } = require("../middlewares/userAuthentication.js")

router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/stripeApi").get(isAuthenticatedUser, getStripeApi);

module.exports = router;