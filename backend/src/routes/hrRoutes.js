const express = require("express");
const { registerHR } = require("../controllers/hrController");
const router = express.Router();

router.post("/", registerHR);

module.exports = router;
