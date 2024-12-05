const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const companyRoutes = require("./routes/companyRoutes");
const fs = require("fs");

// Create profilePictures folder if it doesn't exist
const profilePicturesDir = path.join(__dirname, "../profilePictures");

if (!fs.existsSync(profilePicturesDir)) {
  fs.mkdirSync(profilePicturesDir, { recursive: true });
}
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Set up static folder to serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Log routes
console.log("User routes loaded");
app.use("/user", userRoutes);

console.log("Company routes loaded");
app.use("/company", companyRoutes);

module.exports = app;