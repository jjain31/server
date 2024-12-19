// database.js
const mongoose = require("mongoose");

let isConnected = false; // Track the connection status

async function connectDb() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection error:", err);
    throw err;
  }
}

module.exports = connectDb;
