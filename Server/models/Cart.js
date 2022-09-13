const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Cart = new schema({
    UserID: { unique: true, type: String, required: true },
    Products : [ {
        ProductID : { unique: true, type: String, required: true },
        ProductName: { type: String, required: true },
        ProductPrice: { type: Number, required: true },
        Quantity: { type: Number, required: true },
        Image: { type: String, required: false}
    }],
    Total: { type: Number, required: true}
    // Discount: { type: Number, required: true},
    // Amount: { type: Number, required: true}
});

const cart = mongoose.model('cart', Cart);
module.exports = cart;