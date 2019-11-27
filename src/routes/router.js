const ProductController = require('../controllers/index').product;
const BillController = require('../controllers/index').bill;
const UserController = require('../controllers/index').user;
const OrderController = require('../controllers/index').order;

module.exports = app => {

    app.post('/product', ProductController.create);
    app.get('/products', ProductController.listAll);

    app.post('/order', OrderController.create);
    app.get('/order/:id', OrderController.readById);
    app.patch('/order/:id', OrderController.updateById);
    app.delete('/order/:id', OrderController.deleteById);
    app.get('/orders', OrderController.listAll);

    app.post('/bill', BillController.create);

    app.get('/users', UserController.listAll);
}