const { captureCardCharge } = require('../stripe');
const ejs = require('ejs');
const { sendSMS } = require('../../twilio.config');
const { transporter, mailOptions } = require('../../nodemailer.config');

const stripeCardChargeModel = async (req, res) => {
    const { email, phoneNumber, firstName, lastName, addressLine1, postalCode, city,
        state, country, products, total } = req.body;
    
    const result = await captureCardCharge(req, res);

    if (false) {
    } else {
        const body = await ejs.renderFile(ROOT_DIR + '/templates/invoice.ejs', {
            firstName, lastName, addressLine1, postalCode, city,
            state, country, products, total
        });
        const subject = "Invoice mail"
        const response = await transporter.sendMail(mailOptions(email, subject, body), (error) => {
            res.send(error)
        })
        const message = "You have successfully purchased the product"
        await sendSMS(message, phoneNumber)
    }
    return result;
}


const getProductsModel = (callback) => {

    const sql = `select * from products`;

    DBConnection.query(sql, (err, result) => {

        if (result.length) {
            callback(result);
        } else {
            callback(false, ' No data found')
        }

    })
}

// const createProductModel = (req, res) => {
//     const { title, description, price, quantity, image} = req.body;
//       console.log('title',req.query.title)
//     DBConnection.query(
//         `INSERT INTO products  (title, description, price, quantity, image) 
//         VALUES  (?, ?, ?, ?, ?)`, [title, description, price, quantity,image]
//       , (err, res) => {
//         if (err) {
//           console.log("error: ", err);
//           return;
//         }
//         console.log('created product',res)
//     })    
// }

  

module.exports = {
    stripeCardChargeModel,
    getProductsModel, 
    // createProductModel
}