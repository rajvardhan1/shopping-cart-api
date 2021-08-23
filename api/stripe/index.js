require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_KEY)

const captureCardCharge = (req, res) => {
    const { products, total, token } = req.body;

    const idempotencyKey = uuid();

    return stripe.customers.create({
        email: token.email,
        source: token.id,
        name: token.card.name,
        address: {
            line1: '510 Townsend St',
            postal_code: '452009',
            city: 'Indore',
            state: 'MP',
            country: 'IN',
        },
        shipping: {
            name: 'Raj',
            address: {
                city: 'new york',
                country: 'usa'
            }
        }
    }).then(customer => {
        stripe.charges.create({
            amount: total * 100,
            currency: 'inr',
            customer: customer.id,
            receipt_email: token.email,
            description: 'Description about the product purchased',
            shipping: {
                name: "Raj",
                address: {
                    city: 'new york',
                    country: 'usa'
                }
            }
        }, { idempotencyKey })
    })
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err))
}

module.exports = {
    captureCardCharge
}