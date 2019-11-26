const mongoose = require('mongoose');

const productScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Product = mongoose.model('Product', productScheme);

module.exports = Product;