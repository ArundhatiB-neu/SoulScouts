const Employee = require("../models/Employee");
const Company = require("../models/Company");
const bcrypt = require("bcrypt");
const Coach = require("../models/Coach");

exports.registerEmployee = async (req, res) => {
  const {
    fullName,
    companyId,
    email,
    domain,
    phone,
    password,
    confirmPassword,
  } = req.body;

  // Validate required fields
  if (
    !fullName ||
    !companyId ||
    !email ||
    !domain ||
    !password ||
    !confirmPassword
  ) {
    return res
      .status(400)
      .json({ error: "All fields except phone are required." });
  }

  // Validate password match
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match." });
  }

  try {
    // Check if company exists
    const companyExists = await Company.findById(companyId);
    if (!companyExists) {
      return res
        .status(404)
        .json({ error: "Company not found. Please contact your admin." });
    }

    // Check if email already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res
        .status(400)
        .json({ error: "An employee with this email already exists." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new employee
    const newEmployee = new Employee({
      fullName,
      company: companyId,
      email,
      domain,
      phone,
      password: hashedPassword,
    });

    const savedEmployee = await newEmployee.save();
    res.status(201).json({
      message: "Employee registered successfully.",
      employee: savedEmployee,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred during employee registration." });
  }
};

exports.updateEmployee = async (req, res) => {
  const { id } = req.params; // Employee ID from request parameters
  const { phone, newPassword } = req.body;

  try {
    // Validate if at least one field is provided
    if (!phone && !newPassword) {
      return res.status(400).json({ error: "Please provide data to update." });
    }

    // Validate US phone number if provided
    if (phone) {
      const phoneRegex = /^(\+1|1)?\d{10}$/;
      if (!phoneRegex.test(phone)) {
        return res.status(400).json({
          error: "Invalid phone number. It must be a valid US phone number.",
        });
      }
    }

    // Validate password if provided
    if (newPassword) {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(newPassword)) {
        return res.status(400).json({
          error:
            "Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character.",
        });
      }

      // Fetch the existing employee to compare the password
      const employee = await Employee.findById(id);
      if (!employee) {
        return res.status(404).json({ error: "Employee not found." });
      }

      const isSamePassword = await bcrypt.compare(
        newPassword,
        employee.password
      );
      if (isSamePassword) {
        return res.status(400).json({
          error: "The new password cannot be the same as the old password.",
        });
      }
    }

    // Update employee details
    const updates = {};
    if (phone) updates.phone = phone;
    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      updates.password = hashedPassword;
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found." });
    }

    res.status(200).json({
      message: "Employee updated successfully.",
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the employee." });
  }
};

// Get all employees by company name
exports.getAllEmployees = async (req, res) => {
  const { companyId } = req.query; // Company ID passed as a query parameter

  try {
    // Validate if companyId is provided
    if (!companyId) {
      return res.status(400).json({ error: "Company ID is required." });
    }

    // Fetch all employees associated with the company, populating company and coach details
    const employees = await Employee.find({ company: companyId })
      .populate("company", "name domain") // Populate company details
      .populate("coach", "fullName email specialization"); // Populate coach details if present

    // Check if employees exist
    if (!employees || employees.length === 0) {
      return res
        .status(404)
        .json({ error: "No employees found for this company." });
    }

    // Return employees excluding their passwords
    const filteredEmployees = employees.map((employee) => {
      const { password, ...rest } = employee._doc;
      return rest;
    });

    res.status(200).json({
      message: "Employees retrieved successfully.",
      employees: filteredEmployees,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching employees.",
    });
  }
};

// Delete an employee by ID
exports.deleteEmployees = async (req, res) => {
  const { id } = req.params; // Get the employee ID from route parameters

  try {
    const deletedEmployee = await Employee.findByIdAndDelete(id, {
      projection: { password: 0 },
    });

    if (!deletedEmployee) {
      return res.status(404).json({ error: "Employee not found." });
    }
    const { password, ...employeeWithoutPassword } = deletedEmployee._doc;

    res.status(200).json({
      message: "Employee deleted successfully.",
      employee: employeeWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the employee." });
  }
};

exports.assignCoach = async (req, res) => {
  const { employeeId, coachId } = req.body;

  try {
    // Validate if both IDs are provided
    if (!employeeId || !coachId) {
      return res
        .status(400)
        .json({ error: "Employee ID and Coach ID are required." });
    }

    // Check if employee exists
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found." });
    }

    // Check if coach exists
    const coach = await Coach.findById(coachId);
    if (!coach) {
      return res.status(404).json({ error: "Coach not found." });
    }

    // Assign the coach to the employee
    employee.coach = coachId;
    const updatedEmployee = await employee.save();

    res.status(200).json({
      message: "Coach assigned to employee successfully.",
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while assigning the coach." });
  }
};