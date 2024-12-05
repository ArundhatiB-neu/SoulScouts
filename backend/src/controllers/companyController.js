const bcrypt = require("bcrypt");
const Company = require("../models/Company");
const User = require("../models/User");

exports.registerCompany = async (req, res) => {
  const { companyName, domain, hrEmail, hrFullName, hrPassword } = req.body;

  // Validate all fields
  if (!companyName || !domain || !hrEmail || !hrFullName || !hrPassword) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Validate company name (only letters, spaces, and hyphens allowed)
  const companyNameRegex = /^[a-zA-Z\s-]+$/;
  if (!companyNameRegex.test(companyName)) {
    return res.status(400).json({
      error: "Company name can only contain letters, spaces, or hyphens.",
    });
  }

  // Validate HR full name (only letters, spaces, and hyphens allowed)
  const fullNameRegex = /^[a-zA-Z\s-]+$/;
  if (!fullNameRegex.test(hrFullName)) {
    return res.status(400).json({
      error: "HR full name can only contain letters, spaces, or hyphens.",
    });
  }

  // Validate email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(hrEmail)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  // Extract domain from HR email and validate it matches the provided domain
  const emailDomain = hrEmail.split("@")[1];
  if (emailDomain !== domain) {
    return res.status(400).json({
      error: `The domain in the HR email (${emailDomain}) must match the provided domain (${domain}).`,
    });
  }

  // Validate password (min 8 chars, at least one uppercase, one lowercase, one number, and one special character)
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(hrPassword)) {
    return res.status(400).json({
      error:
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
    });
  }

  try {
    // Check if the company domain is already registered
    const existingCompany = await Company.findOne({ domain });
    if (existingCompany) {
      return res
        .status(400)
        .json({ error: "Company domain is already registered." });
    }

    // Create a new company entry
    const newCompany = new Company({
      name: companyName,
      domain,
      createdAt: new Date(),
    });
    const savedCompany = await newCompany.save();

    // Hash the password for security
    const hashedPassword = await bcrypt.hash(hrPassword, 10);

    // Create a new HR user linked to the company
    const newUser = new User({
      fullName: hrFullName,
      email: hrEmail,
      password: hashedPassword,
      role: "HR", // User type
      companyId: savedCompany._id, // Link to company
      createdAt: new Date(),
    });

    await newUser.save();

    // Respond with success
    res.status(201).json({
      message: "Company and HR user registered successfully.",
      company: savedCompany,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred while registering the company.",
    });
  }
};
