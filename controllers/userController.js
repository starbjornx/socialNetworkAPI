const { User, Thought } = require("../models");

module.exports = {
    getUsers(req, res) {
        User.find().populate('friends')
            .then((users) => res.status(200).json(users))
            .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ id: req.params.id })
            .populate("thoughts")
            .populate("friends")
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with that ID" })
                    : res.status(200).json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.status(200).json(user))
            .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with that ID" })
                    : res.status(200).json({ message: "User deleted!" })
            )
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with this id!" })
                    : res.status(200).json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { friends: req.params.friendId } },
            { new: true }
        )
            .populate("friends")
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with this id!" })
                    : res.status(200).json(user)
            )
            .catch((err) => res.json(err));
    },

    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
            .populate("friends")
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with this id!" })
                    : res.status(200).json(user)
            )
            .catch((err) => res.status(400).json(err));
    },
};