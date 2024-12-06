const Employee = require("../models/Employee");
const Company = require("../models/Company");
const bcrypt = require("bcrypt");

exports.registerEmployee = async (req, res) => {
  const { fullName, company, email, domain, phone, password, confirmPassword } =
    req.body;

  // Validate required fields
  if (
    !fullName ||
    !company ||
    !email ||
    !domain ||
    !password ||
    !confirmPassword
  ) {
    return res
      .status(400)
      .json({ error: "All fields except phone are required." });
  }

  // Full name validation: letters and spaces only
  const fullNameRegex = /^[a-zA-Z\s]+$/;
  if (!fullNameRegex.test(fullName)) {
    return res
      .status(400)
      .json({ error: "Full name can only contain letters and spaces." });
  }

  // Email validation: general email pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  // Phone validation: optional but must be a valid US phone number if provided
  const phoneRegex = /^(\+1|1)?\d{10}$/;
  if (phone && !phoneRegex.test(phone)) {
    return res.status(400).json({
      error: "Invalid phone number. Must be a valid US phone number.",
    });
  }

  // Password validation: strong password (minimum 8 characters, 1 uppercase, 1 lowercase, 1 digit, 1 special character)
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error:
        "Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character.",
    });
  }

  // Validate password match
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match." });
  }

  try {
    // Check if company exists
    const companyExists = await Company.findOne({ name: company });
    if (!companyExists) {
      return res
        .status(400)
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
      company,
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
  const { company } = req.query; // getting name form query param

  try {
    if (!company) {
      return res.status(400).json({ error: "Company name is required." });
    }

    const employees = await Employee.find({ company }).select("-password");
    if (!employees || employees.length === 0) {
      return res
        .status(404)
        .json({ error: "No employees found for this company." });
    }

    res.status(200).json({
      message: "Employees retrieved successfully.",
      employees,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching employees." });
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

