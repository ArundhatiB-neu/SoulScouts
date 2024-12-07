const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');

// Apply authenticateToken middleware at the route level
router.get('/profile', authenticateToken, getUserProfile);

module.exports = router;