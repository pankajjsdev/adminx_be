const mongoose = require("mongoose");
const logger = require('../config/logger');


// Get MongoDB URI from environment variable
const uri = `${process.env.MONGODB_URI}/${process.env.DATABASE_NAME}`;

console.log("connecting to db...");
const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to db");
  } catch (err) {
    console.error("Error connecting to db:", err.message);
    logger.error(err)
    process.exit(1); // Exiting the process with code 1 upon connection failure
  }
};

module.exports = connectDB;
