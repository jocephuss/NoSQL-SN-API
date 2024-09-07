const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from.env file

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiRoutes = require("./routes");
app.use("/api", apiRoutes);

// Connect to MongoDB database
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/socialNetworkDB"
);

mongoose.set("debug", true); // Enable logging for mongoose operations

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
