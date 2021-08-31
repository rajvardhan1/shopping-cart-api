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
            console.log(error, ' mailError')
            res.send(error)
        })
        const message = "You have successfully purchased the product"
        await sendSMS(message, phoneNumber)
    }
    return result;
}

module.exports = {
    stripeCardChargeModel
}