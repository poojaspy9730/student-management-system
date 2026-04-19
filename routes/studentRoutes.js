const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// GET /api/students - Get all students (with search/sort)
router.get('/', studentController.getAllStudents);

// GET /api/students/:id - Get student by ID
router.get('/:id', studentController.getStudentById);

// POST /api/students - Create a new student
router.post('/', studentController.createStudent);

// PUT /api/students/:id - Update an existing student
router.put('/:id', studentController.updateStudent);

// DELETE /api/students/:id - Delete a student
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
