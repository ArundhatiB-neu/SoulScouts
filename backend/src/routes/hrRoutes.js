const express = require("express");
const { registerHR } = require("../controllers/hrController");
const router = express.Router();

router.post("/", registerHR);  // This is correct for /api/register/hr

module.exports = router;
