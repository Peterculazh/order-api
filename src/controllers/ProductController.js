const Product = require('../models/Product');

module.exports = {
    create(req, res) {
        try {
            const product = new Product(req.body);
            product.save();
            return res.status(200).send(product);
        } catch (e) {
            return res.status(500).send(e);
        }
    },
    async listAll(req, res) {
        const productsList = await Product.findProducts({});
        return await res.status(200).send(productsList);
    }
}