const { captureCardCharge } = require('../stripe');
const ejs = require('ejs');
const { sendSMS } = require('../../twilio.config');
const { transporter, mailOptions } = require('../../nodemailer.config');
const { cloudUpload } = require('../../cloudinary.config');

const stripeCardChargeModel = async (req, res) => {
    const { email, phoneNumber, firstName, lastName, addressLine1, postalCode, city,
        state, country, products, total } = req.body;
    products.map((product) => {
        DBConnection.query(
            `Insert into order_details (user_id, product_id, product_count) values (?,?,?)`,
            [2, product.product_id, 2]
            , (err, res) => {
                if (err) {
                    console.log("error: ", err);
                }
                console.log('products', res)
            })
    })

    const result = await captureCardCharge(req, res);

    if (false) {
    } else {
        const body = await ejs.renderFile(ROOT_DIR + '/templates/invoice.ejs', {
            firstName, lastName, addressLine1, postalCode, city,
            state, country, products, total
        });
        const subject = "Invoice mail"
        const response = await transporter.sendMail(mailOptions(email, subject, body), (error) => {
            res.send(error)
        })
        const message = "You have successfully purchased the product"
        await sendSMS(message, phoneNumber)
    }
    return result;
}


const getProductsModel = (callback) => {

    const sql = `select * from products`;

    DBConnection.query(sql, (err, result) => {

        if (result.length) {
            callback(result);
        } else {
            callback(false, ' No data found')
        }

    })
}

const createProductModel = async (req, callback) => {
    const { title, description, price, quantity } = req.body;
    const image = req.file;
    const uploadResponse = await cloudUpload(image.path)
    DBConnection.query(
        `INSERT INTO products  (title, description, price, quantity, image) 
        VALUES  (?, ?, ?, ?, ?)`, [title, description, price, quantity, uploadResponse.secure_url]
        , (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(false, err)
            }
            callback(res)
        })
}

const addProductModel = (req, callback) => {
    const { user_id, product_id, product_count } = req.body;

    const query = `INSERT INTO cart_details  (user_id, product_id, product_count) 
        VALUES  (${user_id}, ${product_id}, ${product_count}) `
    DBConnection.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            callback(false, err)
        }
        callback(res)
    })
}

const getCartProductsModel = (callback) => {

    const sql = `SELECT product_id, user_id, title, description, price FROM cart_details JOIN products ON cart_details.product_id = products.id`

    DBConnection.query(sql, (err, result) => {

        if (result.length) {
            callback(result);
        } else {
            callback(false, ' No data found')
        }

    })
}

const removeCartProductsModel = (req, callback) => {
    const id = req.params.id;
    DBConnection.query(
        `DELETE FROM cart_details WHERE (product_id)=(?)`, [id]
        , (err, res) => {
            if (err) {
                console.log("error: ", err);
                callback(false, err)
            }
            callback(res)
        })
}

const getOrderModel = (callback) => {

    const sql = `SELECT product_id, title, description, price FROM order_details JOIN products ON order_details.product_id = products.id`

    DBConnection.query(sql, (err, result) => {

        if (result.length) {
            callback(result);
        } else {
            callback(false, ' No data found')
        }

    })
}

module.exports = {
    stripeCardChargeModel,
    getProductsModel,
    createProductModel,
    addProductModel,
    getCartProductsModel,
    removeCartProductsModel,
    getOrderModel
}