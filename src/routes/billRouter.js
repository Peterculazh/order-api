const express = require('express');
const router = new express.Router();
const Order = require('../models/Order');
const Bill = require('../models/Bill');

router.post('/bill', async (req, res) => {
    const order = await Order.findById(req.body.orderId).populate('productId');
    if (!order) {
        return res.status(404).send('No such order');
    }
    const bill = new Bill({
        name: order.productId.name,
        price: order.cost,
        orderDate: order.createdAt,
    });
    try {
        bill.save();
        res.status(200).send(bill);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;