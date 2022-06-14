const { User } = require('../models');

const UserController = {
  // get all Users
  getAllUsers(req, res) {
    User.find({})
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one User by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // createUser
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

  // update User by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // delete User
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },
  // Create friends
  addFriend({ params }, res) {
    console.log(params._id)
    console.log(params.friendId)
    User.findOneAndUpdate(
      { _id: params.id },
      { $push: { friends: params.friendId}},
      { new: true}
      )
      // .populate({path: 'friends', select: ('-__v')})
      // .select('-__v')
      .then(dbUsersData => {
        if(!dbUsersData) {
            res.status(404).json({message: 'No User with this particular ID!'});
            return;
        }
        res.json(dbUsersData);
    })
    .catch(err => res.status(400).json(err));

  },

  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      {_id: params.id}, 
      {$pull: { friends: params.friendId}}, 
      {new: true}
      )
    // .populate({path: 'friends', select: '-__v'})
    // .select('-__v')
    .then(dbUsersData => {
        if(!dbUsersData) {
            res.status(404).json({message: 'No User with this particular ID!'});
            return;
        }
        res.json(dbUsersData);
    })
    .catch(err => res.status(400).json(err));
  }


};

module.exports = UserController;
