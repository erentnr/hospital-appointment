const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creating schema
const PostSchema = new Schema({
  name: String,
 
});

module.exports = mongoose.model('Department', PostSchema);