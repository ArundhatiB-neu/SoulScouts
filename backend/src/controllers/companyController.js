const Company = require("../models/Company");

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find({}, { name: 1, domain: 1 }); // Fetch only relevant fields (e.g., name and domain)
    if (!companies || companies.length === 0) {
      return res.status(404).json({ error: "No companies found." });
    }
    res.status(200).json({
      message: "Companies retrieved successfully.",
      companies,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching companies." });
  }
};
