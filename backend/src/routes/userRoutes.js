const express = require("express");
const multer = require("multer");
const path = require("path");
const { registerUser, getUsers } = require("../controllers/userController");

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "profilePictures/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// User registration route
router.post("/register", upload.single("profilePicture"), registerUser);

// Get all users
router.get("/", getUsers);

module.exports = router;
