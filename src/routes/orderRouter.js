const moment = require('moment');

const express = require('express');
const router = new express.Router();

const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');


router.post('/order', async (req, res) => {
    try {
        const order = new Order(req.body);
        const product = await Product.findById(req.body.productId);
        let productDate = moment(product.createdAt);
        let now = moment(new Date());
        let isMonth = now.diff(productDate, 'months');
        if (isMonth > 0) {
            price = product.price;
            let discount = 20;
            priceDiscount = price - (price / 100 * discount);
            order.cost = priceDiscount.toFixed(2);
            order.discount = discount;
        } else {
            order.cost = product.price;
        }
        order.save();
        res.status(201).send(order);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/order/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate(['createdBy', 'productId']).exec();
        if (!order) {
            return res.status(404).send("Order not found");
        }
        res.status(200).send(order);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.delete('/order/:id', async (req, res) => {
    try {
        if (!req.body.role) {
            return res.status(401).send("Type your role adn try again");
        }
        const orderDeleted = await Order.findByIdAndDelete(req.params.id);
        if (!orderDeleted) {
            return res.status(404).send('No such order');
        }
        res.status(200).send(orderDeleted);
    } catch (e) {
        res.status(500).send(e);
    }
});

// I decide to allow update only status for reasons like not allow Cashiers and Consultants to change to prevent manipulations of orders
router.patch('/order/:id', async (req, res) => {
    try {
        const user = await User.findById(req.body.user_id);
        if (!user) {
            return res.status(401).send("Enter your ID");
        }
        const status = req.body.status;

        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).send('No such order');
        }
        if (user.role === 2 && status === "Выполнен") {
            order.acceptedBy = user._id;
        } else if (user.role === 3 && status === "Оплачен" && order.acceptedBy) {
            order.confirmedBy = user._id;
        } else {
            return res.status(401).send("Input role and check order status");
        }
        order.status = status;
        order.save();
        res.status(200).send(order);
    } catch (e) {
        res.status(500).send(e);
    }
});

/*
    Booker can search in two dates in format: "YYYY-MM-DD". Example - "2018-11-26", "2019-11-26"
*/
router.get('/orders', async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        let orderList = {};

        if (!user) {
            return res.status(401).send('No such user');
        } else if (user.role === 3) {
            orderList = await Order.find({
                $or: [{
                        status: "Создан"
                    },
                    {
                        status: "Выполнен"
                    }
                ]
            }).populate(['createdBy', 'productId']).exec();
        } else if (user.role === 2) {
            orderList = await Order.find({
                status: "Создан"
            }).populate(['createdBy', 'productId']).exec();
        } else if (user.role === 1) {
            if (req.body.from && req.body.to) {

                let endDate = moment(req.body.to).add(1, 'days');
                orderList = await Order.find({
                    createdAt: {
                        $gt: req.body.from,
                        $lte: endDate
                    }
                }).populate(['createdBy', 'productId']).exec();
                return res.send(orderList);
            } else {
                orderList = await Order.find({}).populate(['createdBy', 'productId']).exec();
                return res.send(orderList);
            }
        }
        res.send(orderList);
    } catch (e) {

    }


});

module.exports = router;