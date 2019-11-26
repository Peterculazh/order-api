const mongoose = require('mongoose');

const orderScheme = new mongoose.Schema({
    cost: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'Создан'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    acceptedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    confirmedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    discount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderScheme);

module.exports = Order;