const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect(
  // Connect to MongoDB database
  process.env.MONGODB_URI || "mongodb://localhost/socialNetworkDB"
); // Configure Mongoose to use new URL parser and Mongoose's default promise library

module.exports = mongoose.connection;
