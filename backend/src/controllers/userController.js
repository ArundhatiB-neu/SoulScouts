const multer = require("multer");
const path = require("path");
const User = require("../models/User");
const Company = require("../models/Company");
const bcrypt = require("bcrypt");

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only JPEG, PNG, and JPG formats are allowed."));
    }
    cb(null, true);
  },
});

// Registration handler
exports.registerUser = [
  upload.single("profilePicture"), // Middleware to handle the uploaded file
  async (req, res) => {
    try {
      const {
        fullName,
        email,
        password,
        phoneNumber,
        domain,
        emergencyContactName,
        emergencyContactEmail,
        emergencyContactPhone,
        role,
      } = req.body;

      if (
        !fullName ||
        !email ||
        !password ||
        !domain ||
        !emergencyContactName ||
        !emergencyContactEmail ||
        !emergencyContactPhone ||
        !role
      ) {
        return res.status(400).json({ error: "All fields are required." });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format." });
      }

      const phoneRegex = /^\d{10}$/;
      if (phoneNumber && !phoneRegex.test(phoneNumber)) {
        return res
          .status(400)
          .json({ error: "Invalid phone number. Must be 10 digits." });
      }

      const domainName = email.split("@")[1];
      const company = await Company.findOne({ domain: domainName });
      if (!company) {
        return res
          .status(400)
          .json({ error: "Invalid company domain. Contact your admin." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        fullName,
        email,
        password: hashedPassword,
        phoneNumber,
        profilePicture: req.file ? req.file.path : null,
        domain,
        emergencyContactName,
        emergencyContactEmail,
        emergencyContactPhone,
        role,
        company: company._id,
        createdAt: new Date(),
      });

      await user.save();

      res.status(201).json({ message: "User registered successfully.", user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred during registration." });
    }
  },
];

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("companyId", "name domain");
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ error: "An error occurred while fetching users." });
  }
};
