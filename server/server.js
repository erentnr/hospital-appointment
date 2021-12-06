const express = require("express");

// Import Routes
const departmentsRoute = require("./routes/departmentsRoute");
const userRouter = require("./routes/usersRoute");

// Import environement varibles
require("dotenv").config();

// MongoDB connection
require("./config/database").connect();

// Declare app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", departmentsRoute);
app.use("/users", userRouter);

// Listen App
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is alive!");
});
