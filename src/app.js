const express = require('express');
require('./db/mongoose');

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

require('./routes/router')(app);

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
})