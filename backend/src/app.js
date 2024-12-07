const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

// Move all middleware to top
app.use(bodyParser.json());
app.use(cors());

// Import route modules after middleware setup
const hrRoutes = require("./routes/hrRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const coachRoutes = require("./routes/coachRoutes");
const loginRoutes = require("./routes/loginRoutes");
const authenticateToken = require("./middleware/authMiddleware");
const logoutRoutes = require("./routes/logoutRoutes");
const companyRoutes = require("./routes/companyRoutes");
const wellnessSurveyRoutes = require("./routes/wellnessSurveyRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const settingsRoutes = require('./routes/settingsRoutes');
const userRoutes = require('./routes/userRoutes');

// Then define routes
// Move user routes with other protected routes
app.use("/api/user", userRoutes); // Remove duplicate authenticateToken since it's in the route

// Public Routes (no authentication required)
app.use("/api/register/hr", hrRoutes);
app.use("/api/register/employee", employeeRoutes);
app.use("/api/register/coach", coachRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/company/public", companyRoutes);

// Protected Routes (require authentication)
app.use("/api/settings", authenticateToken, settingsRoutes);
app.use("/api/employees", authenticateToken, employeeRoutes);
app.use("/api/coaches", authenticateToken, coachRoutes);
app.use("/api/companies", authenticateToken, companyRoutes);
app.use("/api/wellness-survey", authenticateToken, wellnessSurveyRoutes);
app.use("/api/resources", authenticateToken, resourceRoutes);
app.use("/api/logout", authenticateToken, logoutRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;