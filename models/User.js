const { Schema, model } = require("mongoose");

// Define the User schema and model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"], // Regular expression for email validation
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true, // Include virtual properties in the JSON output
    },
    id: false,
  }
);
// Add a virtual property to count the number of friends a user has
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});
// Create the User model from the schema
const User = model("User", userSchema); // Export the User model for use in other files
module.exports = User;
