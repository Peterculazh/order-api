const Order = require('../models/Order');
const Bill = require('../models/Bill');

module.exports = {
    async create(req, res) {
        try {
            const order = await Order.findById(req.body.orderId).populate('productId');
            if (!order) {
                return res.status(404).send('No such order');
            }
            const bill = new Bill({
                name: order.productId.name,
                price: order.cost,
                orderDate: order.createdAt,
            });
            bill.save();
            return res.status(200).send(bill);
        } catch (e) {
            return res.status(500).send(e);
        }
    }
}