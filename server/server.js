const express = require('express');

// Import environement varibles
require('dotenv').config();

// MongoDB connection
require('./config/database').connect();

// Declare app
const app = express();

// Listen App
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server is alive!');
});
