require('dotenv').config();

const nodemailer = require('nodemailer')

module.exports.transporter = nodemailer.createTransport({
    service: process.env.NODEMAILER_SERVICE,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD
    }
});

module.exports.mailOptions = (to, subject, mailBody) => {
    return ({
        from: 'no-reply@domain.com <contact.raj@gmail.com>',
        to,
        subject,
        html: mailBody
    });
};
