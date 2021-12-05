const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Department = mongoose.model("Department", DepartmentSchema);
module.exports = Department;
