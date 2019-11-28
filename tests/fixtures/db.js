const mongoose = require('mongoose');
const User = require('../../src/models/User');
const Product = require('../../src/models/Product');
const Order = require('../../src/models/Order');
const Bill = require('../../src/models/Bill');

const cashierOneId = new mongoose.Types.ObjectId();
const cashierOne = {
    _id: cashierOneId,
    name: "Peter Cashier",
    role: 3
};

const cashierTwoId = new mongoose.Types.ObjectId();
const cashierTwo = {
    _id: cashierTwoId,
    name: "Danil Cashier",
    role: 3
};

const consulterOneId = new mongoose.Types.ObjectId();
const consulterOne = {
    _id: consulterOneId,
    name: "Ilya Consulter",
    role: 2
};

const bookerOneId = new mongoose.Types.ObjectId();
const bookerOne = {
    _id: bookerOneId,
    name: 'Nazar Booker',
    role: 1
};

const productOneId = new mongoose.Types.ObjectId();
const productOne = {
    _id: productOneId,
    name: "Big Monitor",
    price: 12,
    createdAt: '2018-02-20'
};

const productTwoId = new mongoose.Types.ObjectId();
const productTwo = {
    _id: productTwoId,
    name: "Keyboard",
    price: 3.2
};

const productThreeId = new mongoose.Types.ObjectId();
const productThree = {
    _id: productThreeId,
    name: "Computer",
    price: 122,
    discount: 10,
    createdAt: '2019-03-07'
};

const productFourId = new mongoose.Types.ObjectId();
const productFour = {
    _id: productFourId,
    name: "Mouse",
    price: 2.5
};

const setupDatabase = async () => {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    await Bill.deleteMany();
    await new User(cashierOne).save();
    await new User(cashierTwo).save();
    await new User(consulterOne).save();
    await new User(bookerOne).save();
    await new Product(productOne).save();
    await new Product(productTwo).save();
    await new Product(productThree).save();
    await new Product(productFour).save();
};

module.exports = {
    cashierOne,
    cashierTwo,
    consulterOne,
    bookerOne,
    productOne,
    productTwo,
    productThree,
    productFour,
    setupDatabase
};