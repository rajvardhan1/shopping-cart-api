const { stripeCardChargeModel } = require('./outerModel');
const { sendSMS } = require('../../twilio.config');
const { transporter, mailOptions } = require('../../nodemailer.config');

class outerController {

    stripeCardCharge(req, res) {
        stripeCardChargeModel(req, res);
    }

    sendMessageOTP = (req, res) => {
        const { message, to } = req.body;
        const response = sendSMS(message, to);
        res.send(response)
    }

    sendMail = async (req, res) => {
        const { email, subject, mailBody } = req.body;
        const response = await transporter.sendMail(mailOptions(email, subject, mailBody), (error) => {
            console.log(error, ' mailError')
            res.send(error)
        })
        res.send("success")
    }

}

module.exports = outerController;