require('dotenv').config();
const { v4: uuid } = require('uuid');

const stripe = require('stripe')(process.env.STRIPE_KEY)

const createCustomerCard = async (req) => {
    const { firstName, lastName, cardNumber, expMonth, expYear, cvv } = req.body;
    const token = await stripe.tokens.create({
        card: {
            name: firstName + " " + lastName,
            number: cardNumber,
            exp_month: expMonth,
            exp_year: expYear,
            cvc: cvv,
        }
    })

    return token;
}

const captureCardCharge = async (req, res) => {
    const { email, total, addressLine1, postalCode, phoneNumber, city, state, country } = req.body;

    const token = await createCustomerCard(req)

    const idempotencyKey = uuid();

    const customer = await stripe.customers.create({
        email: email,
        source: token.id,
        name: token.card.name,
        address: {
            line1: addressLine1,
            postal_code: postalCode,
            city: city,
            state: state,
            country: country,
        },
        shipping: {
            name: token.card.name,
            address: {
                city: city,
                country: country
            }
        }
    })

    const result = await stripe.charges.create({
        amount: total * 100,
        currency: 'inr',
        customer: customer.id,
        receipt_email: email,
        description: 'Description about the product purchased',
        shipping: {
            name: token.card.name,
            address: {
                line1: addressLine1,
                postal_code: postalCode,
                city: city,
                state: state,
                country: country
            },
            phone: phoneNumber
        }
    }, { idempotencyKey })

    return result;
}

module.exports = {
    captureCardCharge,
    createCustomerCard
}