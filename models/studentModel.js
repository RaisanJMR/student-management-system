const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    grade: String,
    contact: String,
    email: { type: String, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
