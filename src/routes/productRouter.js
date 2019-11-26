const express = require('express');
const router = new express.Router();
const Product = require('../models/Product');

router.post('/product', (req, res) => {
    try {
        const product = new Product(req.body);
        product.save();
        console.log(product);
        res.status(200).send(product);
    } catch (e) {
        res.status(500).send(e);
    }
})

router.get('/products', async (req, res) => {
    const productsList = await Product.find({});
    res.status(200).send(productsList);
});

module.exports = router;