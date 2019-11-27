const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    orderDate: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;