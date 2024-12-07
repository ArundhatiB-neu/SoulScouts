const express = require("express");
const {
  registerEmployee,
  updateEmployee,
  getAllEmployees,
  deleteEmployees,
  assignCoach,
} = require("../controllers/employeeController");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Register a new employee
router.post("/", registerEmployee);

// Update an employee
router.put("/update/:id", authenticateToken, updateEmployee);

// Assign a coach to an employee
router.post("/assign-coach", authenticateToken, assignCoach);

// Get all employees for a company
router.get("/getAll", authenticateToken, getAllEmployees);

// Delete an employee
router.get("/delete/:id", authenticateToken, deleteEmployees);

module.exports = router;