const HR = require("../models/HR");
const Company = require("../models/Company");
const bcrypt = require("bcrypt");

// Helper functions for validation
const validateFullName = (name) => /^[a-zA-Z\s]+$/.test(name);
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone) =>
  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone); // US phone numbers
const validateCompanyName = (name) => /^[a-zA-Z\s]+$/.test(name);
const validateDomain = (domain) =>
  /^@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(domain);
const validatePassword = (password) =>
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password); // At least 8 characters, 1 letter, 1 number, 1 special character

exports.registerHR = async (req, res) => {
  const {
    fullName,
    email,
    phone,
    companyName,
    domain,
    password,
    confirmPassword,
  } = req.body;

  if (!validateFullName(fullName)) {
    return res
      .status(400)
      .json({ error: "Invalid full name. Letters and spaces only." });
  }
  if (!validateEmail(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }
  if (phone && !validatePhone(phone)) {
    return res.status(400).json({ error: "Invalid US phone number format." });
  }
  if (!validateCompanyName(companyName)) {
    return res
      .status(400)
      .json({ error: "Invalid company name. Letters and spaces only." });
  }
  if (!validateDomain(domain)) {
    return res
      .status(400)
      .json({ error: "Invalid domain format. Should be like @company.com." });
  }
  if (!validatePassword(password)) {
    return res.status(400).json({
      error:
        "Password must be at least 8 characters long, contain at least one letter, one number, and one special character.",
    });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match." });
  }

  try {
    const existingHR = await HR.findOne({ email });
    if (existingHR) {
      return res
        .status(400)
        .json({ error: "HR with this email already exists." });
    }

    const existingCompany = await Company.findOne({ domain });
    if (!existingCompany) {
      const newCompany = new Company({ name: companyName, domain });
      await newCompany.save();
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newHR = new HR({
      fullName,
      email,
      phone,
      companyName,
      domain,
      password: hashedPassword,
    });

    const savedHR = await newHR.save();
    res
      .status(201)
      .json({ message: "HR registered successfully.", hr: savedHR });
  } catch (error) {
    res.status(500).json({ error: "An error occurred during registration." });
  }
};
