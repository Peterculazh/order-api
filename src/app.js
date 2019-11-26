const express = require('express');
require('./db/mongoose');
const productRouter = require('./routes/productRouter');
const orderRouter = require('./routes/orderRouter');
const billRouter = require('./routes/billRouter');
const userRouter = require('./routes/userRouter');


const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use(productRouter);
app.use(orderRouter);
app.use(billRouter);
app.use(userRouter);

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
})