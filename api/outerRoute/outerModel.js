const { captureCardCharge } = require('../stripe');

const stripeCardChargeModel = (req, res) => {
    captureCardCharge(req, res)
}

module.exports = {
    stripeCardChargeModel
}