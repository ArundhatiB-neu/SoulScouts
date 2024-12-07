const express = require("express");
const {
  submitSurvey,
  fetchSurveys,
} = require("../controllers/wellnessSurveyController");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/submit", authenticateToken, submitSurvey);
router.get("/fetch", authenticateToken, fetchSurveys);

module.exports = router;
