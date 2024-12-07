const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const hrRoutes = require("./routes/hrRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const coachRoutes = require("./routes/coachRoutes");
const loginRoutes = require("./routes/loginRoutes");
const authenticateToken = require("./middleware/authMiddleware");
const logoutRoutes = require("./routes/logoutRoutes");
const companyRoutes = require("./routes/companyRoutes");
const wellnessSurveyRoutes = require("./routes/wellnessSurveyRoutes");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Public Routes
app.use("/register/hr", hrRoutes);
// app.use("/register/coach", coachRoutes);
app.use("/login", loginRoutes);

// Consolidated Employee Routes
app.use("/employee", employeeRoutes);

// Consolidated Coach Routes
app.use("/coach", coachRoutes);

// Consolidated Company Routes
app.use("/company", companyRoutes);

app.use("/wellness-survey", wellnessSurveyRoutes);

// Authenticated Routes Middleware
app.use(authenticateToken);

// Authenticated Routes
app.use("/logout", logoutRoutes);

module.exports = app;