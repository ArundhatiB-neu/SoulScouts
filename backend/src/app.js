const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const hrRoutes = require("./routes/hrRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const coachRoutes = require("./routes/coachRoutes");
const loginRoutes = require("./routes/loginRoutes");
const authenticateToken = require("./middleware/authMiddleware");
const logoutRoutes = require("./routes/logoutRoutes");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Public Routes
app.use("/register/hr", hrRoutes);
app.use("/register/coach", coachRoutes);
app.use("/login", loginRoutes);

// Consolidated Employee Routes
app.use("/employee", employeeRoutes);

// Authenticated Routes Middleware
app.use(authenticateToken);

// Authenticated Routes
app.use("/logout", logoutRoutes);

module.exports = app;