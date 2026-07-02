const Student = require('../models/student');

// get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error😡' });
  }
};

const addStudent = async (req, res) => {
  try {
    const { name, age, course, phno, city } = req.body;
    if (!name || !age || !course || !phno || !city) {
      return res.status(400).json({ message: 'Please fill all fields😡' });
    }

    const student = await Student.create({
      name,
      age,
      course,
      phno,
      city,
    });
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error😡' });
  }
};

const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllStudents,
  addStudent,
  updateStudent,
  deleteStudent,
};