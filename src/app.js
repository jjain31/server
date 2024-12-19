require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const cors = require("cors");

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const universityBankRouter = require("./routes/universityBankRouter");

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/student", universityBankRouter);

const MONGODB_URI = process.env.MONGODB_URI;

// Function to establish a database connection
let isConnected = false; // Track connection status
async function connectToDatabase() {
  if (!isConnected) {
    try {
      await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Database connected successfully");
      isConnected = true; // Mark as connected
    } catch (err) {
      console.error("Database connection error:", err);
    }
  }
}

// Export the handler function for Vercel
module.exports = async (req, res) => {
  await connectToDatabase(); // Ensure DB connection is established
  app(req, res); // Delegate request handling to Express
};
