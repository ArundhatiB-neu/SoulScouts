module.exports = {
  jwtSecret: process.env.JWT_SECRET || "default_secret",
  jwtExpiry: "15m", // JWT token validity
};
