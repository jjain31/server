require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const app = express();
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const seedBanks = require("./Seed/seedBanks");
const seedUniversity = require("./Seed/seedUniversity");
const universityBankRouter = require("./routes/universityBankRouter");
app.use(cookieParser());
app.use(express.json());


app.use(cors({
  origin:"http://localhost:5173",
  credentials:true,
}));



app.use("/auth", authRouter);
app.use("/profile", profileRouter);

app.use("/student", universityBankRouter);

const MONGODB_URI = process.env.MONGODB_URI;

app.get("/", (req, res) => {
    res.send("API is running");
});
mongoose.connect(MONGODB_URI)
  .then(async() => {
    console.log("Database connected successfully");
    await seedBanks();
    await seedUniversity();
   
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
