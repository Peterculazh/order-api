const User = require('../models/User');

module.exports = {
    create(req, res) {
        try {
            const user = new User(req.body);
            user.save();
            return res.status(200).send(user);
        } catch (e) {
            return res.status(500).send(user);
        }
    },
    async readById(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).send({
                    error: "No such user"
                });
            }
            return res.status(200).send(user);
        } catch (e) {
            return res.status(500).send(user);
        }
    },
    async updateById(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                ...req.body
            });
            if (!user) {
                return res.status(404).send({
                    error: "No such user"
                });
            }
            return res.status(200).send(user);
        } catch (e) {
            return res.status(500).send(user);
        }
    },
    async deleteById(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) {
                return res.status(404).send({
                    error: "No such user"
                });
            }
            return res.status(200).send(user);
        } catch (e) {
            return res.status(500).send(user);
        }
    },
    async listAll(req, res) {
        try {
            const userList = await User.find({});
            return res.status(200).send(userList);
        } catch (e) {
            return res.status(500).send(user);
        }
    }
}