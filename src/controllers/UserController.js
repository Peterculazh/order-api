const User = require('../models/User');

module.exports = {
    async listAll(req, res) {
        const userList = await User.find({});

        res.status(200).send(userList);
    }
}