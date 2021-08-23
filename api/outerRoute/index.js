const express = require('express');

const outerController = require('./outerController')

const router = express.Router();

const outer = new outerController();

router.post('/stripe-payment', outer.stripeCardCharge)
router.post('/send-otp', outer.sendMessageOTP)
router.post('/send-mail', outer.sendMail);

module.exports = router;