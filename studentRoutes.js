const express = require("express");
const router = express.Router();
const protect = require("../middleware/authmiddleware");

const {
    getAllStudents,
    addStudent,
    updateStudent,
    deleteStudent
} = require("../controllers/studentcontroller");

router.get("/", protect, getAllStudents);
router.post("/", protect, addStudent);
router.put("/:id", protect, updateStudent);
router.delete("/:id", protect, deleteStudent);
module.exports = router;