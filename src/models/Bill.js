const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    name: {
        type: String,
        ref: 'Order.Product.name'
    },
    price: {
        type: Number,
        ref: 'Order.cost'
    },
    orderDate: {
        type: Date,
        ref: 'Order.createdAt'
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;