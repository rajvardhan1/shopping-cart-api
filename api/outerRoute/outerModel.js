const { captureCardCharge } = require('../stripe');
const ejs = require('ejs');

const stripeCardChargeModel = async (req, res) => {
    // const { email, subject, mailBody } = req.body;
    const result = await captureCardCharge(req, res);

    return result;
    // const body = await ejs.renderFile(ROOT_DIR + '/templates/invoice.ejs');

    // if (result) {
    //     const response = await transporter.sendMail(mailOptions(email, subject, body), (error) => {
    //         console.log(error, ' mailError')
    //         res.send(error)
    //     })
    // }
}

module.exports = {
    stripeCardChargeModel
}