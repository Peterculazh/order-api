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
    async readById(req, res) {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send({
                error: "No such product"
            });
        }
        return res.status(200).send(product);
    },
    async updateById(req, res) {
        const product = await Product.findByIdAndUpdate(req.params.id, {
            ...req.body
        });
        if (!product) {
            return res.status(404).send({
                error: "No such product"
            });
        }
        return res.status(200).send(product);
    },
    async deleteById(req, res) {
        const product = await Product.findOneAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send({
                error: "No such product"
            });
        }
        return res.status(200).send(product);
    },
    async listAll(req, res) {
        const productsList = await Product.findProducts({});
        return res.status(200).send(productsList);
    }
}