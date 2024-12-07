// config/jwtConfig.js
module.exports = {
  jwtSecret: process.env.JWT_SECRET || "default_secret",
  jwtExpiry: "24h", // Match the session expiry time
};