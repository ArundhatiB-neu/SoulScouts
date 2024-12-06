const Session = require("../models/Session");

exports.logout = async (req, res) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }

    // Delete the session from the database
    const deletedSession = await Session.findOneAndDelete({ token });

    if (!deletedSession) {
      return res
        .status(404)
        .json({ error: "Session not found or already logged out." });
    }

    res.status(200).json({ message: "Successfully logged out." });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ error: "An error occurred during logout." });
  }
};
