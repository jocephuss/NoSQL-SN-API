const { User, Thought } = require("../models");

module.exports = {
  // Retrieve all users. Return a 404 error if no users are found.
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // Retrieve a single user by their ID. Return a 404 error if the user is not
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate("thoughts")
      .populate("friends")
      .then((user) => {
        if (!user) {
          return res
            .status(404)
            .json({ message: "No user found with this ID!" });
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Create a new user. Return a 400 error if the user data is invalid.
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json(err));
  },

  // Update a user by their ID. Return a 404 error if the user is not found. Return a 400 error if the user data is invalid.
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "User not found" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete a user by their ID. Return a 404 error if the user is not found. Delete all associated thoughts as well.
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "User not found" })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: "User deleted successfully" }))
      .catch((err) => res.status(500).json(err));
  },

  // Add a new thought for a user by their ID. Return a 404 error if the user is not found. Return a 400 error if the thought data is invalid.
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "User not found" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Remove a friend from a user by their ID. Return a 404 error if the user is not found. Return a 400 error if the friend ID is invalid.
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "User not found" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
