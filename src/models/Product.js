const moment = require('moment');

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
    },
    discount: {
        type: Number,
        required: true,
        default: 0
    },
    monthDiscount: {
        type: Boolean,
        default: 0
    },
    appliedDiscount: {
        type: Boolean,
        default: 0
    }
});

const checkDiscount = async product => {
    if (!product.monthDiscount) {
        let productDate = moment(product.createdAt);
        let now = moment(new Date());
        let isMonth = now.diff(productDate, 'months');
        if (isMonth > 0) {
            price = product.price;
            let discount = product.discount + 20;
            product.price = price - (price / 100 * discount);
            product.discount = discount;
            product.monthDiscount = true;
            await Product.findByIdAndUpdate(product._id, {
                price: product.price,
                discount: product.discount,
                monthDiscount: product.monthDiscount
            });
            let newProduct = await Product.findById(product._id);
            return newProduct;
        } else if (product.discount !== 0 && !product.appliedDiscount && !product.monthDiscount) {
            price = product.price;
            product.price = price - (price / 100 * product.discount);
            product.appliedDiscount = true;
            await Product.findByIdAndUpdate(product._id, {
                price: product.price,
                appliedDiscount: true
            });
            let newProduct = await Product.findById(product._id);
            return newProduct;
        }
        return product;
    }

    return product;
}

productScheme.statics.findProducts = async function () {
    productsList = await this.find({});
    productsList.map(async product => {
        product = await checkDiscount(product);
        return product;
    });
    return productsList;
}

productScheme.statics.findById = async function (_id) {
    product = await this.findOne({
        _id
    });
    newProduct = await checkDiscount(product);
    return newProduct;
}

productScheme.methods.toJSON = function () {
    product = this;
    productObject = product.toObject();
    if (!productObject.monthDiscount) {
        price = productObject.price;
        productObject.price = price - (price / 100 * productObject.discount);
        productObject.price = productObject.price.toFixed(2);
    }
    return productObject;
}

const Product = mongoose.model('Product', productScheme);

module.exports = Product;