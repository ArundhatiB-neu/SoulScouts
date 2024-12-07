// config/jwtConfig.js
module.exports = {
  jwtSecret: process.env.JWT_SECRET || "default_secret",
  jwtExpiry: "15m", // Match the session expiry time
};