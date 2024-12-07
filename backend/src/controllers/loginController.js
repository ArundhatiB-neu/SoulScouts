const Employee = require("../models/Employee");
const HR = require("../models/HR");
const Coach = require("../models/Coach");
const Admin = require("../models/Admin");
const Session = require("../models/Session");
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
    let user =
      (await Employee.findOne({ email })
        .populate("company", "name domain")
        .populate("coach", "fullName email specialization")) ||
      (await HR.findOne({ email })) ||
      (await Coach.findOne({ email })) ||
      (await Admin.findOne({ email }));

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Check for existing session
    const existingSession = await Session.findOne({ userId: user._id });

    if (existingSession) {
      // Verify if the session has expired
      const now = new Date();
      if (existingSession.expiresAt > now) {
        return res.status(400).json({
          error: "User already logged in. Please log out first.",
        });
      } else {
        // Remove expired session
        await Session.deleteOne({ _id: existingSession._id });
      }
    }

    // Generate a new JWT token
    const token = jwt.sign(
      {
        id: user._id,
        type: user.constructor.modelName,
      },
      jwtSecret,
      { expiresIn: jwtExpiry }
    );

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15);

    // Save new session
    const newSession = new Session({
      type: user.constructor.modelName,
      userId: user._id,
      token,
      createdAt: new Date(),
      expiresAt,
    });

    await newSession.save();

    let responseUser = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      type: user.constructor.modelName,
    };

    if (user.constructor.modelName === "Employee") {
      responseUser.company = user.company;
      responseUser.coach = user.coach;
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