const mongoose = require("mongoose");

// Get MongoDB URI from environment variable
const uri = `${process.env.MONGODB_URI}/${process.env.DATABASE_NAME}`;

console.log("connecting to db...", uri);
const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Exiting the process with code 1 upon connection failure
  }
};

module.exports = connectDB;
