const express = require("express");
const { registerCoach } = require("../controllers/coachController");
const router = express.Router();

// Register a new coach
router.post("/register", registerCoach);
// router.post("/assign-company", registerCoach);


module.exports = router;
