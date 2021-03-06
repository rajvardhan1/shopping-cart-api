const express = require('express');
const outerController = require('./outerController')

const upload = require('../../multer.config');

const router = express.Router();
const outer = new outerController();

router.post('/stripe-payment', outer.stripeCardCharge)
router.post('/send-otp', outer.sendMessageOTP)
router.post('/send-mail', outer.sendMail);
router.post('/sendgrid-mail', outer.sendSendGridMail)

router.get('/get-products', outer.getProducts)
router.post('/create-product', upload.single('image'), outer.createProduct)
router.post('/add-product', upload.single('image'), outer.addProduct)
router.get('/cart', outer.getCartProducts)
router.delete('/delete-item/:id', outer.removeCartProducts)
router.get('/order-details', outer.getOrders)

module.exports = router;