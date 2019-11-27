const ProductController = require('../controllers/index').product;
const BillController = require('../controllers/index').bill;
const UserController = require('../controllers/index').user;
const OrderController = require('../controllers/index').order;

module.exports = app => {

    app.post('/product', ProductController.create);
    app.get('/product/:id', ProductController.readById);
    app.patch('/product/:id', ProductController.updateById);
    app.delete('/product/:id', ProductController.deleteById);
    app.get('/products', ProductController.listAll);

    app.post('/order', OrderController.create);
    app.get('/order/:id', OrderController.readById);
    app.patch('/order/:id', OrderController.updateById);
    app.delete('/order/:id', OrderController.deleteById);
    app.get('/orders', OrderController.listAll);

    app.post('/bill', BillController.create);
    app.get('/bill/:id', BillController.readById);
    app.patch('/bill/:id', BillController.updateById);
    app.delete('/bill/:id', BillController.deleteById);
    app.get('/bills', BillController.listAll);

    app.post('/user', UserController.create);
    app.get('/user/:id', UserController.readById);
    app.patch('/user/:id', UserController.updateById);
    app.delete('/user/:id', UserController.deleteById);
    app.get('/users', UserController.listAll);
}