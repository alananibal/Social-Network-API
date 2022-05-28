const router = require('express').Router();

const {
    getAllthoughts,
    getThoughtById,
    createThought,
    // updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughts-controllers');

router.route('/')
    .get(getAllthoughts)
    .post(createThought);

router.route('/:id')
.get(getThoughtById)
.delete(deleteThought);

router.route('/:thoughtId/reactions')
.post(createReaction)
.delete(deleteReaction)

module.exports = router;