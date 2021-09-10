const express = require('express');
const outerController = require('./outerController')

const upload = require('../../multer.config');

// const Cloudinary = require('../../cloudinary.config');

const bodyParser = require('body-parser');
var fileupload = require('express-fileupload');
const { ChannelList } = require('twilio/lib/rest/flexApi/v1/channel');
const router = express.Router();
const outer = new outerController();

router.use(fileupload({
    useTempFiles: true
}))
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/stripe-payment', outer.stripeCardCharge)
router.post('/send-otp', outer.sendMessageOTP)
router.post('/send-mail', outer.sendMail);
router.post('/sendgrid-mail', outer.sendSendGridMail)

router.get('/get-products', outer.getProducts)
router.post('/create-product',  outer.createProduct)
router.post('/add-product', upload.single('image'), outer.addProduct)
router.get('/cart', outer.getCartProducts)
router.delete('/delete-item/:id', outer.removeCartProducts)
router.get('/order-details', outer.getOrders)

// router.post("/upload", function(req, response, next){
//     // collected image from a user
//      const file =  req.files.photo
   
//     console.log('body',req.tempFilePath);
//     // upload image here
//     Cloudinary.uploader.upload(file.tempFilePath, function(error, result){
//            response.send({
//                success: true,
//                result
//            })
//      });

// });

module.exports = router;