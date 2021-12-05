const mongoose = require("mongoose");

exports.connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Connection established.");
    })
    .catch((err) => {
      console.log("Connection error:", err);
    });
};
