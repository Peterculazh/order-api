const Order = require('../models/Order');
const Bill = require('../models/Bill');
const User = require("../models/User");

module.exports = {
    async create(req, res) {
        try {
            const user = await User.findById(req.body.user_id);
            if (!user) {
                return res.status(401).send({
                    error: "Enter your ID"
                });
            } else if (user.role !== 3) {
                return res.status(401).send({
                    error: "You cann't create bill"
                });
            }

            const order = await Order.findById(req.body.orderId).populate('productId');
            if (!order) {
                return res.status(404).send({
                    error: 'No such order'
                });
            } else if (!order.status === "Выполнено") {
                return res.status(404).send({
                    error: "You cann't create bill until order isn't completed"
                });
            }
            const bill = new Bill({
                name: order.productId.name,
                price: order.cost,
                orderDate: order.createdAt,
            });
            bill.save();
            return res.status(201).send(bill);
        } catch (e) {
            return res.status(500).send(e);
        }
    },
    async readById(req, res) {
        try {
            const bill = await Bill.findById(req.params.id);
            if (!bill) {
                return res.status(404).send({
                    error: "No such bill"
                });
            }
            return res.status(200).send(bill);
        } catch (e) {
            return res.status(500).send(e);
        }
    },
    async updateById(req, res) {
        const billId = req.params.id;
        delete req.body.id;

        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'price', 'createdAt'];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).send({
                error: "Invalid updates"
            });
        }

        const bill = await Bill.findById(billId);
        if (!bill) {
            return res.status(400).send({
                error: "No such bill"
            });
        }
        updates.forEach(update => bill[update] = req.body[update]);
        await bill.save();
        res.status(200).send(bill);
    },
    async deleteById(req, res) {
        const bill = await Bill.findByIdAndDelete(req.params.id);
        if (!bill) {
            return res.status(400).send({
                error: "No such bill"
            });
        }
        res.status(200).send(bill);
    },
    async listAll(req, res) {
        try {
            const billList = await Bill.find({});
            return res.status(200).send(billList);
        } catch (e) {
            return res.status(500).send(e);
        }
    }
}