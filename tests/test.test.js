const request = require('supertest'),
    app = require('../src/app');

const User = require('../src/models/User'),
    Product = require('../src/models/Product'),
    Order = require('../src/models/Order'),
    Bill = require('../src/models/Bill');

const {
    cashierOne,
    cashierTwo,
    consulterOne,
    bookerOne,
    productOne,
    productTwo,
    productThree,
    productFour,
    setupDatabase
} = require('./fixtures/db');

beforeAll(setupDatabase);


describe('Use case for workers from test task', () => {

    test('should find first cashier for sure', async () => {
        const response = await request(app)
            .get(`/user/${cashierOne._id}`)
            .send()
            .expect(200);
    });

    let order = {};
    test('should create and find order', async () => {
        const response = await request(app)
            .post('/order')
            .send({
                createdBy: cashierOne._id,
                productId: productOne._id,
            })
            .expect(201);
        order = await Order.findById(response.body._id);
        return response.body;
    });

    test('should update order to completed by consultant', async () => {
        const response = await request(app)
            .patch(`/order/${order._id}`)
            .send({
                status: "Выполнен",
                user_id: consulterOne._id
            })
            .expect(200);
    });

    test('should cashier to create bill and check bill', async () => {
        const response = await request(app)
            .post('/bill')
            .send({
                user_id: cashierOne._id,
                orderId: order._id
            })
            .expect(201);
    });

    test('should cashier change status of order to paid', async () => {
        const response = await request(app)
            .patch(`/order/${order._id}`)
            .send({
                status: "Оплачен",
                user_id: cashierOne._id,
            })
            .expect(200);
    });

    test('should booker find orders without any filter', async () => {
        const response = await request(app)
            .get('/orders')
            .send({
                user_id: bookerOne._id
            })
            .expect(200);
    });
})


let orderTwo = {};
describe('Various tests to check works', () => {

    test('should cashier create another order and find it', async () => {
        const response = await request(app)
            .post("/order")
            .send({
                createdBy: cashierTwo._id,
                productId: productThree._id
            })
            .expect(201);

        orderTwo = await Order.findById(response.body._id);
        expect(orderTwo).not.toBeNull();
    });

    test('should worker try find orders without sending user_id', async () => {
        const response = await request(app)
            .get('/orders')
            .send()
            .expect(401);
    });

    test('should first product be with month discount', async () => {
        const response = await request(app)
            .get(`/product/${productOne._id}`)
            .send()
            .expect(200);

        expect(response.body.price).toEqual(9.6);
    });

    test('should delete second cashier', async () => {
        const response = await request(app)
            .delete(`/user/${cashierTwo._id}`)
            .send()
            .expect(200);
    });

    test('should try to change order by user without permission', async () => {
        const response = await request(app)
            .patch(`/order/${orderTwo._id}`)
            .send({
                user_id: bookerOne._id,
                status: "Выполнен"
            })
            .expect(401);
    });
});

describe('Test each endpoint', () => {

    describe("Test Product's endpoints", () => {

        let testProduct = {};
        test('should create new product and check is created', async () => {
            const response = await request(app)
                .post('/product')
                .send({
                    name: "Cool Computer",
                    price: 12
                })
                .expect(200);

            testProduct = await Product.findById(response.body._id);
            expect(testProduct).not.toBeNull();
        });

        test('should update product', async () => {
            const response = await request(app)
                .patch(`/product/${testProduct._id}`)
                .send({
                    name: "More cool computer"
                })
                .expect(200);
            testProduct = await Product.findById(response.body._id);
            expect(testProduct.name).toEqual("More cool computer");
        });

        test('should get list of products', async () => {
            const response = await request(app)
                .get('/products')
                .send()
                .expect(200);

            expect(response.body.length).toBeGreaterThanOrEqual(4);
        });

        test('should delete product', async () => {
            const response = await request(app)
                .delete(`/product/${testProduct._id}`)
                .send()
                .expect(200);
        });
    });

    describe("Test Order's endpoints", () => {

        let testOrder = {};
        test('should create new order and check is created', async () => {
            const response = await request(app)
                .post('/order')
                .send({
                    createdBy: cashierOne._id,
                    productId: productTwo._id
                })
                .expect(201)
            testOrder = await Order.findById(response.body._id);
            expect(testOrder).not.toBeNull();
        });

        test('should update order to completed by consultant', async () => {
            const response = await request(app)
                .patch(`/order/${testOrder._id}`)
                .send({
                    status: "Выполнен",
                    user_id: consulterOne._id
                })
                .expect(200);
        });

        test('should cashier find orders', async () => {
            const response = await request(app)
                .get('/orders')
                .send({
                    user_id: bookerOne._id
                })
                .expect(200);
        });

        test('should delete test order with sending role(role just for check)', async () => {
            const response = await request(app)
                .delete(`/order/${testOrder._id}`)
                .send({
                    role: 1
                })
                .expect(200);
        });
    })

    describe("Test Bill's endpoints", () => {

        let testBill = {};
        test('should update order & create bill and check is created', async () => {
            const updateOrder = await request(app)
                .patch(`/order/${orderTwo._id}`)
                .send({
                    user_id: consulterOne._id,
                    status: "Выполнен"
                })
                .expect(200);

            response = await request(app)
                .post('/bill')
                .send({
                    user_id: cashierOne._id,
                    orderId: orderTwo._id
                })
                .expect(201);

            testBill = await Bill.findById(response.body._id);
            expect(testBill).not.toBeNull();
        });

        test('should update bill', async () => {
            const response = await request(app)
                .patch(`/bill/${testBill._id}`)
                .send({
                    name: "Big monitor"
                })
                .expect(200);
        });

        test('should get list of bills', async () => {
            const response = await request(app)
                .get('/bills')
                .send()
                .expect(200);
        });

        test('should delete test bill', async () => {
            const response = await request(app)
                .delete(`/bill/${testBill._id}`)
                .send()
                .expect(200);
        });
    });

    describe("Test User's endpoints", () => {

        let testUser = {};
        test('should create user and check is created', async () => {
            const response = await request(app)
                .post('/user')
                .send({
                    name: "Test User",
                    role: 1
                })
                .expect(201);
            testUser = await User.findById(response.body._id);
            expect(testUser).not.toBeNull()
        });

        test('should update user', async () => {
            const response = await request(app)
                .patch(`/user/${testUser._id}`)
                .send({
                    name: "Petro"
                })
                .expect(200);
        });

        test('should get list of users', async () => {
            const response = await request(app)
                .get('/users')
                .send()
                .expect(200);
        });

        test('should delete user', async () => {
            const response = await request(app)
                .delete(`/user/${testUser._id}`)
                .send()
                .expect(200);
        });

    });
});