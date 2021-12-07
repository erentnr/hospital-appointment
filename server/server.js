const express = require("express");

// Import Routes
const usersRouter = require("./routes/usersRoute");
const authRouter = require("./routes/authRoute");
const departmentsRouter = require("./routes/departmentsRoute");
const appointmentsRouter = require("./routes/appointmentsRoute");
const diseasesRouter = require("./routes/diseasesRoute");


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
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/departments", departmentsRouter);
app.use("/appointments", appointmentsRouter);
app.use("/diseases", diseasesRouter);

// Listen App
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is alive!");
});
