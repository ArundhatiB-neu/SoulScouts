const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");
const {
  updateUserSettings,
  changePassword
} = require("../controllers/settingsController");

// Update general settings (role-specific fields included)
router.put("/update", authenticateToken, updateUserSettings);

// Change password
router.put("/change-password", authenticateToken, changePassword);

module.exports = router;