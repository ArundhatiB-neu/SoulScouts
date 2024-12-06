const Coach = require("../models/Coach");
const bcrypt = require("bcrypt");
const Company = require("../models/Company");

exports.registerCoach = async (req, res) => {
  const { fullName, email, phone, specialization, password, confirmPassword } =
    req.body;

  // Validate required fields
  if (!fullName || !email || !specialization || !password || !confirmPassword) {
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

  // Email validation: must be @soulscouts.com
  const emailRegex = /^[^\s@]+@soulscouts\.com$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ error: "Email must be an @soulscouts.com email." });
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
    // Check if email already exists
    const existingCoach = await Coach.findOne({ email });
    if (existingCoach) {
      return res
        .status(400)
        .json({ error: "A coach with this email already exists." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new coach
    const newCoach = new Coach({
      fullName,
      email,
      phone,
      specialization,
      password: hashedPassword,
    });

    const savedCoach = await newCoach.save();
    res.status(201).json({
      message: "Coach registered successfully.",
      coach: savedCoach,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred during coach registration." });
  }
};

exports.assignCompany = async (req, res) => {
  const { coachId, companyId } = req.body;

  try {
    // Validate coach and company IDs
    if (!coachId || !companyId) {
      return res
        .status(400)
        .json({ error: "Coach ID and Company ID are required." });
    }

    // Verify if the coach exists
    const coach = await Coach.findById(coachId);
    if (!coach) {
      return res.status(404).json({ error: "Coach not found." });
    }

    // Verify if the company exists
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ error: "Company not found." });
    }

    // Assign company to coach
    coach.company = companyId;
    await coach.save();

    res.status(200).json({
      message: "Company assigned to coach successfully.",
      coach,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while assigning the company." });
  }
};

exports.getAllCoaches = async (req, res) => {
  try {
    const { company } = req.query; // Optional company ID filter from query params
    const query = company ? { company } : {}; // filter by company if provided
    const coaches = await Coach.find(query).populate("company", "name domain");

    if (!coaches || coaches.length === 0) {
      return res.status(404).json({ error: "No coaches found." });
    }
    const sanitizedCoaches = coaches.map((coach) => {
      const { password, ...rest } = coach.toObject();
      return rest;
    });

    res.status(200).json({
      message: "Coaches retrieved successfully.",
      coaches: sanitizedCoaches,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching coaches." });
  }
};