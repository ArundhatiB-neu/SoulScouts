const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const hrRoutes = require("./routes/hrRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const coachRoutes = require("./routes/coachRoutes");
const loginRoutes = require("./routes/loginRoutes"); // Import login routes

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// HR, Employee, Coach, and Login Routes
app.use("/register/hr", hrRoutes);
app.use("/register/employee", employeeRoutes);
app.use("/register/coach", coachRoutes);
app.use("/login", loginRoutes); // Add login route

module.exports = app;