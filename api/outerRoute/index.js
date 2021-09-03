const express = require('express');

const outerController = require('./outerController')

const router = express.Router();

const outer = new outerController();

router.post('/stripe-payment', outer.stripeCardCharge)
router.post('/send-otp', outer.sendMessageOTP)
router.post('/send-mail', outer.sendMail);
router.post('/sendgrid-mail', outer.sendSendGridMail)

router.get('/get-products', outer.getProducts)

router.post('/create-product', outer.createProduct)

module.exports = router;