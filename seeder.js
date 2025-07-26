
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const fs = require('fs');

const User = require('./models/userModel');
const Student = require('./models/studentModel');

const seed = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    await User.deleteMany();
    await Student.deleteMany();

    const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'));
    const students = JSON.parse(fs.readFileSync('./data/students.json', 'utf-8'));

    for (let user of users) {
        user.password = await bcrypt.hash(user.password, 10);
        await User.create(user);
    }

    await Student.insertMany(students);
    console.log("Seed complete");
    process.exit();
};

seed();
