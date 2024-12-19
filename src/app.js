require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const cors = require("cors");

// Importing routes
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const universityBankRouter = require("./routes/universityBankRouter");

// Initialize Express app
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// Define routes
app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/student", universityBankRouter);
app.get("/", (req, res) => {
    res.send("API is running");
});
// MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

let isConnected = false; // Track connection status globally
async function connectToDatabase() {
  if (!isConnected) {
    try {
      await mongoose.connect(MONGODB_URI); // Connect to MongoDB
      console.log("Database connected successfully");
      isConnected = true; // Mark as connected
    } catch (err) {
      console.error("Database connection error:", err);
      throw new Error("Database connection failed");
    }
  }
}

module.exports = async (req, res) => {
  try {
    await connectToDatabase(); // Ensure DB connection
    app(req, res); // Delegate request handling to Express
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

