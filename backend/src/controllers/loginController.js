const Employee = require("../models/Employee");
const HR = require("../models/HR");
const Coach = require("../models/Coach");
const Admin = require("../models/Admin");
const Session = require("../models/Session");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { jwtSecret, jwtExpiry } = require("../config/jwtConfig");

const TYPE_TO_ROLE = {
  'employee': 'employee',
  'HR': 'hr',
  'Coach': 'coach',
  'Admin': 'admin'
};

exports.loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  console.log('Login attempt:', { email, role }); // Debug log

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    // Find user based on the provided role
    let user;
    let userType;

    switch (role) {
      case 'employee':
    user = await Employee.findOne({ email })
        .populate("company", "name domain")
        .populate("coach", "fullName email specialization");
    userType = 'employee';  // lowercase
    break;
      case 'hr':
        user = await HR.findOne({ email });
        userType = 'HR';
        break;
      case 'coach':
        user = await Coach.findOne({ email });
        userType = 'Coach';
        break;
      case 'admin':
        user = await Admin.findOne({ email });
        userType = 'Admin';
        break;
      default:
        return res.status(400).json({ error: "Invalid role specified." });
    }

    console.log('Found user:', !!user, 'Type:', userType); // Debug log

    if (!user) {
      return res.status(401).json({ error: "Invalid login credentials." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid login credentials." });
    }

    // Clear existing sessions
    await Session.deleteMany({ userId: user._id });

    const token = jwt.sign(
      {
        id: user._id,
        type: userType
      },
      jwtSecret,
      { expiresIn: jwtExpiry }
    );

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    const newSession = new Session({
      type: userType,
      userId: user._id,
      token,
      expiresAt,
    });

    await newSession.save();

    let responseUser = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: role // Use the provided role since we've already validated it
    };

    if (role === 'employee') {
      responseUser.company = user.company;
      responseUser.coach = user.coach;
    }

    res.status(200).json({
      message: "Login successful.",
      user: responseUser,
      token,
      role
    });
  } catch (error) {
    console.error('Login error:', {
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({ error: "An error occurred during login." });
  }
};