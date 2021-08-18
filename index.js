const cors = require('cors');
const express = require('express');
const { v4: uuid } = require('uuid');
const jsSHA = require('jssha');
require('dotenv').config();

const app = express();

const stripe = require('stripe')(process.env.STRIPE_KEY)


app.use(express.json());
app.use(cors());


app.post('/stripe-payment', (req, res) => {
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
})

app.post('/generate-hash', (req, res) => {
    const { txnid, amount, productinfo, firstname, email } = req.body;

    if (!txnid || !amount || !productinfo || !firstname || !email) {
        res.send("Mandotry fields required");
    } else {
        var hashString = process.env.PAYU_KEY + '|' + txnid + '|' + amount
            + '|' + productinfo + '|' + firstname + '|' + email + '|' + '||||||||||' + process.env.PAYU_SALT_KEY

        var sha = new jsSHA('SHA-512', "TEXT");

        sha.update(hashString);

        var hash = sha.getHash("HEX");
        res.status(200).send({ 'hash': hash })
    }
})

app.post('/payu-payment', (req, res) => {
    var { status, email, firstname, productinfo, amount, txnid, hash, status } = req.body;

    var hashString = process.env.PAYU_SALT_KEY + '|' + status + '||||||||||' + '|' + email + '|'
        + firstname + '|' + productinfo + '|' + amount + '|' + txnid + '|'
        + process.env.PAYU_SALT_KEY

    var sha = new jsSHA('SHA-512', "TEXT");
    sha.update(hashString)
    var nHash = sha.getHash("HEX");

    if (nHash == hash) {
        res.send({ 'status': status });
    } else {
        res.send({ 'status': "Error occured" });
    }
})

app.listen(8000, () => {
    console.log("Listning  at PORT 8000")
})