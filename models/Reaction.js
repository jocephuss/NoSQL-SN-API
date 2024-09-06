const { Schema, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

// Define the reaction schema with required fields and custom date format
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(), // Generate a unique ObjectId for each reaction
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp), // Use custom date format function
    },
  },
  {
    toJSON: {
      getters: true, // Include virtual properties in the JSON output
    },
    id: false,
  }
);

module.exports = reactionSchema;
