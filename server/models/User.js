const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    first_name:{
        type: String,
        require: true
    },
    last_name:{
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    phone: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ["admin","doctor","patient"],
        default: "patient"
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    }
});

const User = mongoose.model('User',UserSchema);
module.exports = User;