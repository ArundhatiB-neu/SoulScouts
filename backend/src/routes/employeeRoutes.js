const express = require("express");
const { registerEmployee } = require("../controllers/employeeController");
const router = express.Router();

router.post("/", registerEmployee);

module.exports = router;
