const express = require("express");
const {
  getAllResources,
  addResource,
} = require("../controllers/resourceController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/getAll", authMiddleware, getAllResources);
router.post("/add", authMiddleware, addResource);

module.exports = router;
