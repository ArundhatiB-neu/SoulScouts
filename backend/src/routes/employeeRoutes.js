const express = require("express");
const {
  registerEmployee,
  updateEmployee,
  getAllEmployees,
  deleteEmployees,
} = require("../controllers/employeeController");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// Register a new employee
router.post("/register", registerEmployee);

// Update an employee
router.put("/update/:id", authenticateToken, updateEmployee);
// Get all employees for a company
router.get("/getAll", authenticateToken, getAllEmployees);
router.get("/delete/:id", authenticateToken, deleteEmployees);

module.exports = router;