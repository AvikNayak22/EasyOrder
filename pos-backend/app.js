require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const config = require("./config/config");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const createHttpError = require("http-errors");

const app = express();

const PORT = config.port;
connectDB();

//Middlewares
app.use(express.json()); // Parse JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

//Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Hello from pos server" });
});

//Other endpoints
app.use("/api/user", require("./routes/userRoute"));

//Global error handler
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
