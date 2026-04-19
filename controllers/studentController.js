const StudentModel = require('../models/studentModel');

// Validation helper
const validateStudent = (data) => {
    const errors = [];
    if (!data.first_name || data.first_name.length < 2) errors.push("First name is required and should be at least 2 characters.");
    if (!data.last_name || data.last_name.length < 2) errors.push("Last name is required and should be at least 2 characters.");
    if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) errors.push("A valid email is required.");
    if (!data.enrollment_date) errors.push("Enrollment date is required.");
    if (!data.major) errors.push("Major is required.");
    if (!['Active', 'Inactive', 'Graduated'].includes(data.status)) errors.push("Invalid status.");
    return errors;
};

exports.getAllStudents = async (req, res) => {
    try {
        const { search, sortBy, order } = req.query;
        const students = await StudentModel.getAll(search, sortBy, order);
        res.status(200).json(students);
    } catch (error) {
        console.error("Error in getAllStudents:", error);
        res.status(500).json({ error: "Database error while fetching students." });
    }
};

exports.getStudentById = async (req, res) => {
    try {
        const student = await StudentModel.getById(req.params.id);
        if (!student) {
            return res.status(404).json({ error: "Student not found." });
        }
        res.status(200).json(student);
    } catch (error) {
        console.error("Error in getStudentById:", error);
        res.status(500).json({ error: "Database error while fetching student." });
    }
};

exports.createStudent = async (req, res) => {
    try {
        const errors = validateStudent(req.body);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const newId = await StudentModel.create(req.body);
        res.status(201).json({ message: "Student created successfully", id: newId });
    } catch (error) {
        console.error("Error in createStudent:", error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: "Email already exists." });
        }
        res.status(500).json({ error: "Database error while creating student." });
    }
};

exports.updateStudent = async (req, res) => {
    try {
        const errors = validateStudent(req.body);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const affectedRows = await StudentModel.update(req.params.id, req.body);
        if (affectedRows === 0) {
            return res.status(404).json({ error: "Student not found." });
        }
        res.status(200).json({ message: "Student updated successfully" });
    } catch (error) {
        console.error("Error in updateStudent:", error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: "Email already exists." });
        }
        res.status(500).json({ error: "Database error while updating student." });
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        const affectedRows = await StudentModel.delete(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({ error: "Student not found." });
        }
        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        console.error("Error in deleteStudent:", error);
        res.status(500).json({ error: "Database error while deleting student." });
    }
};
