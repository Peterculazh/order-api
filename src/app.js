const express = require('express');
require('./db/mongoose');

const app = express();
app.use(express.json());

require('./routes/router')(app);

module.exports = app;