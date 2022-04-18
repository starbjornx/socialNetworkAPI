const { User, Thought } = require('../models');

module.exports = {
    // Get all students
    getUsers(req, res) {
        User.find()
            .then(async (users) => {
                const userObj = {
                    users,

                };
                return res.json(userObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Get a single student
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then(async (user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json({
                        user,
                        grade: await grade(req.params.userId),
                    })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // create a new student
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // Delete a student and remove them from the course
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No such user exists' })
                    : Course.findOneAndUpdate(
                        { user: req.params.userId },
                        { $pull: { users: req.params.userId } },
                        { new: true }
                    )
            )
            .then((course) =>
                !course
                    ? res.status(404).json({
                        message: 'Users deleted',
                    })
                    : res.json({ message: 'Users successfully deleted' })
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    updateUser(req, res) {
        User.findOneAndUpdate
    }
};
