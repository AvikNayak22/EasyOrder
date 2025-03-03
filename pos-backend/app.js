require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const app = express();

const PORT = process.env.PORT || 8000;
connectDB();

app.get("/", (req, res) => {
  res.json({ message: "Hello from pos server" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
