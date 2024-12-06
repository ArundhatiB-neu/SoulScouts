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
