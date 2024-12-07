const jwt = require('jsonwebtoken');
const Session = require('../models/Session');

// Utility function to generate tokens
const generateAuthToken = async (userId, type) => {
  const token = jwt.sign(
    { userId, type },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '24h' }
  );

  // Store session
  const session = new Session({
    type,
    userId,
    token,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
  });
  await session.save();

  return token;
};

// Standardized response handler
const createAuthResponse = async (user, type) => {
  const token = await generateAuthToken(user._id, type);
  const { password, ...userWithoutPassword } = user.toObject();
  
  return {
    message: `${type} registered successfully`,
    token,
    user: userWithoutPassword,
    role: type.toLowerCase()
  };
};

module.exports = {
  generateAuthToken,
  createAuthResponse
};