const jwt = require("jsonwebtoken");
const Session = require("../models/Session");

const authenticateToken = async (req, res, next) => {
  console.log('Auth header:', req.header("Authorization"));
  const token = req.header("Authorization")?.split(" ")[1];
  console.log('Extracted token:', token);

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    console.log('Attempting to verify token...');
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default_secret"
    );
    console.log('Decoded token:', decoded);

    // Check if the token exists in the session collection
    const session = await Session.findOne({ token, userId: decoded.id });
    console.log('Found session:', session);
    
    if (!session || new Date() > session.expiresAt) {
      console.log('Session invalid or expired:', { 
        sessionExists: !!session, 
        expiryTime: session?.expiresAt,
        currentTime: new Date()
      });
      return res
        .status(401)
        .json({ error: "Session expired. Please log in again." });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    res.status(401).json({ error: "Invalid token." });
  }
};

module.exports = authenticateToken;