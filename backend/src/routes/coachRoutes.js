const express = require("express");
const { registerCoach } = require("../controllers/coachController");
const router = express.Router();

router.post("/", registerCoach);

module.exports = router;
