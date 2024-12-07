const express = require("express");
const {
  registerCoach,
  assignCompany,
  getAllCoaches,
} = require("../controllers/coachController");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", registerCoach);
router.post("/assign-company", authMiddleware, assignCompany);
router.get("/getAll", authMiddleware, getAllCoaches);


module.exports = router;
