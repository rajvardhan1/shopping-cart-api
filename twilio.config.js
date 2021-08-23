require('dotenv').config();

const twilio = require('twilio');

const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSMS = async (message, to) => {
    return await client.messages.create({
        body: message,
        to: to,
        from: process.env.TWILIO_NUMBER
    }).catch(error => error);
};

module.exports = { sendSMS };
