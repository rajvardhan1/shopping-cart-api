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


// router.post('/create-product', async function (req, res, next) {
//     try {
//         res.json(await outer.create(req.body));
//     } catch (err) {
//         console.error(`Error while creating programming language`, err.message);
//         next(err);
//     }
// });

// router.post('/create-product', (req,res)=>{
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     let title = req.query.title;
//     let description = req.query.description;
//     let price = req.query.price;
//     let quantity = req.query.quantity;
//     let image = req.query.image;
//     console.log('req.query.title',req.body.title)
//     let sql =  `INSERT INTO products  (title, description, price, quantity, image) 
//     VALUES  (?, ?, ?, ?, ?)`

//     DBConnection.query(sql, [title, description, price, quantity,image],(err, result)=>{
//         if(err) throw err;
//         res.write('Inserted...');
//         res.end();
//     })
// })

module.exports = router;