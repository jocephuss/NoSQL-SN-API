const { Thought, User } = require("../models");

module.exports = {
  // Retrieve all thoughts. Return a 404 error if no thoughts are found.
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // Retrieve a single thought by its ID. Return a 404 error if the thought is not found.
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Thought not found" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Create a new thought, and add it to the user's thoughts array. Ensure that the new thought respects the unique username and content rules.
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "User not found" })
          : res.json({ message: "Thought created successfully", Thought })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Update a thought by its ID. Ensure that the updated thought respects the unique username and content rules.
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete a thought by its ID, and remove it from the user's thoughts array as well.
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Thought not found" })
          : User.findOneAndUpdate(
              {
                thoughts: req.params.thoughtId,
              },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "User not found" })
          : res.json({ message: "Thought deleted successfully" })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Add a reaction to a thought by its ID. Ensure that the reaction respects the unique username and content rules.
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Thought not found" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Remove a reaction from a thought by its ID and reaction ID.
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Thought not found" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
