const Employee = require("../models/Employee");
const HR = require("../models/HR");
const Coach = require("../models/Coach");
const Session = require("../models/Session"); // Import the Session model
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { jwtSecret, jwtExpiry } = require("../config/jwtConfig");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  try {
    // Check if the user exists in all collections
    let user =
      (await Employee.findOne({ email })
        .populate("company", "name domain")
        .populate("coach", "fullName email specialization")) ||
      (await HR.findOne({ email })) ||
      (await Coach.findOne({ email }));

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Check for existing active session
    const existingSession = await Session.findOne({ userId: user._id });
    if (existingSession) {
      return res
        .status(400)
        .json({ error: "User already logged in. Please log out first." });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        type: user.constructor.modelName, // Identify if HR, Employee, or Coach
      },
      jwtSecret,
      { expiresIn: jwtExpiry }
    );

    // Calculate token expiration time
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15);

    // Save token to the Session collection
    const newSession = new Session({
      type: user.constructor.modelName,
      userId: user._id,
      token,
      createdAt: new Date(),
      expiresAt,
    });

    await newSession.save();

    // Prepare the response based on user type
    let responseUser = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      type: user.constructor.modelName,
    };

    // including company and coach details for employees
    if (user.constructor.modelName === "Employee") {
      responseUser.company = user.company; // Populated company details
      responseUser.coach = user.coach; // Populated coach details, if any
    }

    res.status(200).json({
      message: "Login successful.",
      user: responseUser,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during login." });
  }
};
