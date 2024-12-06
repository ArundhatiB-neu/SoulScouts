const express = require("express");
const { logout } = require("../controllers/logoutController");
const authenticateToken = require("../middleware/authMiddleware"); // Protect the route with token validation

const router = express.Router();

router.post("/", authenticateToken, logout); // Logout route with token validation

module.exports = router;
