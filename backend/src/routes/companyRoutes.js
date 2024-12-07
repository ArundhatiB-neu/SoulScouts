const express = require("express");
const {
  getAllCompanies,
  deleteCompany,
} = require("../controllers/companyController");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.get("/getAll", getAllCompanies);
router.delete("/delete", authMiddleware, deleteCompany);

module.exports = router;
