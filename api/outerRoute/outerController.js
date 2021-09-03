const { sendSMS } = require('../../twilio.config');
const { transporter, mailOptions } = require('../../nodemailer.config');
const { sendEmail } = require('../../sendgrid.config');
const { stripeCardChargeModel, getProductsModel, createProductModel } = require('./outerModel');

class outerController {

    async stripeCardCharge(req, res) {
        const result = await stripeCardChargeModel(req, res);
        if (result instanceof Error) {
            res.status(400).send("payment failed");
        } else {
            res.status(200).send("payment success");
        }
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

    sendSendGridMail = (req, res) => {
        const { to, body, subject } = req.body;
        console.log(req.body);
        const result = sendEmail(to, body, subject);
        res.status(200).send(result)
    }

    getProducts = (req, res) => {
        getProductsModel((data, error) => {
            let response = { status: 0, data: null, error: null };

            if (data === false) {
                response.status = 0;
                response.error = error;
            } else {
                response.status = 1;
                response.data = data;
            }

            res.send(response);
        });
    }
    
    createProduct = (req, res) => {
        createProductModel((data, error) => {
            let response = { status: 0, data: null, error: null };

            if (data === false) {
                response.status = 0;
                response.error = error;
            } else {
                response.status = 1;
                response.data = data;
            }

            res.send(response);
        })
    }
}

module.exports = outerController;