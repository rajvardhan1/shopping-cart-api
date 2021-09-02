require('dotenv').config();

const path = require('path');
const cors = require('cors');
const express = require('express');
const { v4: uuid } = require('uuid');
const jsSHA = require('jssha');

const bluesnap = require('bluesnap');
const fetch = require('node-fetch');

const CustomRoute = require('./api');

const app = express();

global.ROOT_DIR = path.resolve(__dirname)


const stripe = require('stripe')(process.env.STRIPE_KEY)

app.use(express.json());
app.use(cors());

global.DBConnection = require('./db.config')

new CustomRoute(app)

const buff = Buffer.from("Rajvardhan").toString('base64');

const gateway = new bluesnap.BlueSnapGateway({
    environment: 'Sandbox',
    username: 'rajvardhan',
    password: 'Singh@2000'
});

const cardTransaction = () => {
    const data = {
        "amount": 11,
        "softDescriptor": "DescTest",
        "cardHolderInfo": {
            "firstName": "Raj",
            "lastName": "singh",
            "zip": "123456"
        },
        "currency": "USD",
        "creditCard": {
            "expirationYear": 2023,
            "securityCode": 837,
            "expirationMonth": "02",
            "cardNumber": "4263982640269299"
        },
        "cardTransactionType": "AUTH_CAPTURE"
    }

    const base64String = Buffer.from('API_16292849709391208477151:Singh@2000').toString('base64');
    console.log(base64String, ' base64')

    fetch('https://sandbox.bluesnap.com/services/2/transactions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Basic ${base64String}`
        },
        body: JSON.stringify(data)
    }).then(response => {
        console.log(response, ' response')
        return response.json()
    })
        .then((res) => {
            console.log(res, ' res')
        }).catch(e => console.log(e, ' error'))
}

// cardTransaction();

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