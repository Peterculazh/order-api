const express = require('express');
const router = new express.Router();

const User = require('../models/User');

router.get('/users', async (req, res) => {
    const userList = await User.find({});

    res.status(200).send(userList);
});

module.exports = router;