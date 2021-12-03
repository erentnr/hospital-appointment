const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DiseaseSchema = Schema({
    name: {
        type: String,
        unique: true,
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
    }
});

const Disease = mongoose.model("Disease",DiseaseSchema);
module.exports = Disease;
