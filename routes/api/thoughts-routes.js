const router = require('express').Router();

const {
    getAllthoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughts-controllers');

router
    .route('/thoughts')
    .get(getAllthoughts)
    .post(createThought);

router
.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

router
.route('/thoughts/:thoughtId/reactions')
.post(createReaction)
.delete(deleteReaction)

module.exports = router;