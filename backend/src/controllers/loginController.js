const Employee = require("../models/Employee");
const HR = require("../models/HR");
const Coach = require("../models/Coach");
const bcrypt = require("bcrypt");

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
    const user =
      (await Employee.findOne({ email })) ||
      (await HR.findOne({ email })) ||
      (await Coach.findOne({ email }));

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    res.status(200).json({
      message: "Login successful.",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        type: user.constructor.modelName, // Identify if HR, Employee, or Coach
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during login." });
  }
};
