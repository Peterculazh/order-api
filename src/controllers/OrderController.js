const moment = require('moment');

const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

module.exports = {
    async create(req, res) {
        try {
            const user = await User.findById(req.body.createdBy);
            if (user.role !== 3) {
                return res.status(401).send("You cann't create orders");
            }
            const order = new Order(req.body);
            const product = await Product.findById(req.body.productId);
            order.cost = product.price;
            order.discount = product.discount;
            order.save();
            res.status(201).send(order);
        } catch (e) {
            res.status(500).send(e);
        }
    },
    async readById(req, res) {
        try {
            const order = await Order.findById(req.params.id).populate(['createdBy', 'productId']).exec();
            if (!order) {
                return res.status(404).send({
                    error: "Order not found"
                });
            }
            res.status(200).send(order);
        } catch (e) {
            res.status(500).send(e);
        }
    },
    async deleteById(req, res) {
        try {
            if (!req.body.role) {
                return res.status(401).send({
                    error: "Type your role adn try again"
                });
            }
            const orderDeleted = await Order.findByIdAndDelete(req.params.id);
            if (!orderDeleted) {
                return res.status(404).send('No such order');
            }
            res.status(200).send(orderDeleted);
        } catch (e) {
            res.status(500).send(e);
        }
    },
    async updateById(req, res) {
        try {
            const user = await User.findById(req.body.user_id);
            if (!user) {
                return res.status(401).send({
                    error: "Enter your ID"
                });
            }
            const status = req.body.status;

            const order = await Order.findById(req.params.id);
            if (!order) {
                return res.status(404).send({
                    error: 'No such order'
                });
            }
            if (user.role === 2 && status === "Выполнен") {
                order.acceptedBy = user._id;
            } else if (user.role === 3 && status === "Оплачен" && order.acceptedBy) {
                order.confirmedBy = user._id;
            } else {
                return res.status(401).send({
                    error: "Input role and check order status"
                });
            }
            order.status = status;
            order.save();
            res.status(200).send(order);
        } catch (e) {
            res.status(500).send(e);
        }
    },
    async listAll(req, res) {
        try {
            const user = await User.findById(req.body.user_id);
            let orderList = {};

            if (!user) {
                return res.status(401).send({
                    error: 'No such user'
                });
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
                    let startDate = req.body.from
                    let endDate = moment(req.body.to).add(1, 'days');
                    delete req.body.userId
                    delete req.body.from
                    delete req.body.to;
                    orderList = await Order.find({
                        createdAt: {
                            $gt: startDate,
                            $lte: endDate
                        },
                        ...req.body
                    }).populate(['createdBy', 'productId']).exec();
                    return res.status(200).send(orderList);
                } else {
                    orderList = await Order.find({}).populate(['createdBy', 'productId']).exec();
                    return res.status(200).send(orderList);
                }
            }
            res.status(200).send(orderList);
        } catch (e) {
            res.status(500).send(e);
        }
    }
}