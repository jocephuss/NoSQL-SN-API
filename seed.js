const connection = require("./config/connection");
const { User, Thought } = require("./models");
const mongoose = require("mongoose");

// Sample users data
const users = [
  {
    username: "johnDoe",
    email: "john@example.com",
  },
  {
    username: "janeDoe",
    email: "jane@example.com",
  },
  {
    username: "lernantino",
    email: "lernantino@gmail.com",
  },
];

// Sample thoughts data
const thoughts = [
  {
    thoughtText: "This is a cool thought!",
    username: "johnDoe",
  },
  {
    thoughtText: "Learning Mongoose is fun!",
    username: "janeDoe",
  },
  {
    thoughtText: "Seeding databases is useful!",
    username: "lernantino",
  },
];

// Seed function to insert data into the database
async function seedDatabase() {
  try {
    await mongoose.connection.dropDatabase();

    // Insert users into the User collection
    const createdUsers = await User.insertMany(users);

    // Create an array of thought objects with assigned user ids
    const userThoughts = thoughts.map((thought, index) => {
      return {
        ...thought,
        userId: createdUsers[index % createdUsers.length]._id, // Assign a user to each thought
      };
    });

    // Insert thoughts into the Thought collection
    await Thought.insertMany(userThoughts);

    console.log("Database seeded successfully!");
    process.exit(0); // // Exit the process with a success code if seeding is successful
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1); // // Exit the process with an error code if seeding fails
  }
}
// Connect to the MongoDB database
connection.once("open", () => {
  seedDatabase();
});
