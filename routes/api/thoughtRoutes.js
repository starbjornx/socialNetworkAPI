const router = require('express').Router();
const {
    getSingleThought,
    getThoughts,
    createThoughts,
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThoughts);

router.route('/:postId').get(getSingleThought);

module.exports = router;
