// database.js
const mongoose = require("mongoose");

async function connectDb() {
  const MONGODB_URI = process.env.MONGODB_URI;

  try {
    // Mongoose automatically handles useNewUrlParser and useUnifiedTopology
    await mongoose.connect(MONGODB_URI); 
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection error:", err);
    throw err; // Throw error to be handled in app.js
  }
}

module.exports = connectDb;
