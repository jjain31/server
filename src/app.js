// app.js
require('dotenv').config();
const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require("cors");

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const universityBankRouter = require("./routes/universityBankRouter");
const connectDb = require("./database"); // Import the connectDb function

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173", // Allow local dev environment
  credentials: true,
}));

app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/student", universityBankRouter);

app.get("/", (req, res) => {
  res.send("API is running");
});

// Call the connectDb function to establish the database connection
connectDb()
  .then(() => {
    // Start the server after successful database connection
    app.listen(3000, () => {
      console.log(`Server started on port 3000`);
    });
  })
  .catch((err) => {
    console.error("Error during database connection:", err);
  });

module.exports = app;
