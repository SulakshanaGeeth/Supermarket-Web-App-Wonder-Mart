const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Order = new schema({
    UserID: {type: String, required: true },
    Name : {type: String, required: true },
    Address : {type: String, required: true },
    Mobile : {type: Number, required: true },
    Email: {type: String, required: true },
    Card : {type: Object, required: true},
    Products : [ {
        ProductID : {unique:false, type: String, required: true },
        ProductName: { type: String, required: true },
        ProductPrice: { type: Number, required: true },
        Quantity: { type: Number, required: true },
        Image: { type: String, required: true}
    }],
    // Total: { type: Number, required: true},
    // Discount: { type: Number, required: true},
    Amount: { type: Number, required: true},
    Rider: { type: Boolean, required: true},
    Deliver: { type: Boolean, required: true}
})

const order = mongoose.model('order', Order);
module.exports = order;