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

A

app.use("/auth", authRouter);A
app.use("/profile", profileRouter);

app.use("/student", universityBankRouter);

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.send("API is running");
});
mongoose.connect(MONGODB_URI)
  .then(async() => {
    console.log("Database connected successfully");
    await seedBanks();
    await seedUniversity();
    app.listen(3000, () => {
      console.log(`Server started on port 3000`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
