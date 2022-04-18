const { User, Thought } = require('../models');

module.exports = {
    // Get all students
    getThoughts(req, res) {
        Thought.find()
            .then(async (thoughts) => {
                const thoughtObj = {
                    thoughts,

                };
                return res.json(thoughtObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Get a single student
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then(async (thought) =>
                !thought
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json({
                        thought,
                        grade: await grade(req.params.thoughtId),
                    })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // create a new student
    createThoughts(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // Delete a student and remove them from the course
    // deleteThoughts(req, res) {
    //     Student.findOneAndRemove({ _id: req.params.userId })
    //         .then((student) =>
    //             !student
    //                 ? res.status(404).json({ message: 'No such student exists' })
    //                 : Course.findOneAndUpdate(
    //                     { students: req.params.userId },
    //                     { $pull: { students: req.params.userId } },
    //                     { new: true }
    //                 )
    //         )
    //         .then((course) =>
    //             !course
    //                 ? res.status(404).json({
    //                     message: 'Student deleted, but no courses found',
    //                 })
    //                 : res.json({ message: 'Student successfully deleted' })
    //         )
    //         .catch((err) => {
    //             console.log(err);
    //             res.status(500).json(err);
    //         });
    // },

};
