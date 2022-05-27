const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller');

router
    .router('/')
    .get(getAllUsers)
    .post(createUser);

router
.route('/:id')
.get(getuserById)
.put(updateuser)
.delete(deleteuser);

module.exports = router;