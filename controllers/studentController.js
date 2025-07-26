const asyncHandler = require('express-async-handler')
const Student = require('../models/studentModel');

const addStudent = asyncHandler(async (req, res) => {
    const student = await Student.create(req.body);
    res.status(201).json(student);
});

const getStudent = asyncHandler(async (req, res) => {
    const students = await Student.find();
    res.status(200).json(students);
});

const updateStudent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const student = await Student.findByIdAndUpdate(id, req.body, { new: true });
    if (!student) {
        throw new Error("Student not found");
    }
    res.status(200).json(student);
});

const deleteStudent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
        throw new Error("Student not found");
    }
    res.status(200).json({ message: "Student deleted successfully" });
});

module.exports = {
    addStudent,
    getStudent,
    updateStudent,
    deleteStudent,
};