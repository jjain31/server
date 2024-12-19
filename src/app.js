require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const cors = require("cors");

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const seedBanks = require("./Seed/seedBanks");
const seedUniversity = require("./Seed/seedUniversity");
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

app.get("/", (req, res) => {
  res.send("API is running");
});

// Ensure that mongoose connection is only established once in serverless environment
let isDbConnected = false;

async function connectDb() {
  if (!isDbConnected) {
    const MONGODB_URI = process.env.MONGODB_URI;
    try {
      await mongoose.connect(MONGODB_URI);
      isDbConnected = true;
      console.log("Database connected successfully");
      await seedBanks();
      await seedUniversity();
    } catch (err) {
      console.error("Database connection error:", err);
    }
  }
}

app.use(async (req, res, next) => {
  await connectDb();
  next();
});

// Export the Express app as a serverless function for Vercel
module.exports = (req, res) => {
  app(req, res);
};
