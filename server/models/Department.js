const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  name: {
    type: String,
    required: true,
  }
});

const Department = mongoose.model("Department", PostSchema);
module.exports = Department;
