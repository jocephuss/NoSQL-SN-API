const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const dateFormat = require("../utils/dateFormat");

const thoughtsSchema = new Schema(
  {
    thoughtText: {
      // Thought content
      type: String,
      required: true,
      minlength: 5,
      maxlength: 300,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp), // Use custom date format function
    },
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 25,
      match: /^[a-zA-Z0-9]+$/, // Regular expression for username validation
    },
    reactions: [reactionSchema], // Array of reaction objects
  },
  {
    toJSON: {
      virtuals: true, // Include virtual properties in the JSON output
      getters: true,
    },
    id: false,
  }
);

thoughtsSchema.virtual("reactionCount").get(function () {
  return this.reactions.length; // Return the number of reactions for each thought
});
const Thought = model("Thought", thoughtsSchema); // Create the Thought model from the schema

module.exports = Thought;
