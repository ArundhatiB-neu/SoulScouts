const jwt = require("jsonwebtoken");
const Session = require("../models/Session");

const authenticateToken = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default_secret"
    );

    // Check if the token exists in the session collection
    const session = await Session.findOne({ token, userId: decoded.id });
    if (!session || new Date() > session.expiresAt) {
      return res
        .status(401)
        .json({ error: "Session expired. Please log in again." });
    }

    req.user = decoded; // Attach user info to request object
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    res.status(401).json({ error: "Invalid token." });
  }
};

module.exports = authenticateToken;
