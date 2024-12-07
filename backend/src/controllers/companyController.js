const Company = require("../models/Company");
const HR = require("../models/HR");
const Employee = require("../models/Employee");
const Coach = require("../models/Coach");

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

// delete company
exports.deleteCompany = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Company ID is required." });
  }

  try {
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ error: "Company not found." });
    }

    const companyName = company.name;

    // Deleting HR accounts linked to the company name
    await HR.deleteMany({ companyName });

    // Deleting employees linked to the company ID
    await Employee.deleteMany({ company: id });

    // Reset the company field for coaches linked to the company ID
    await Coach.updateMany({ company: id }, { $unset: { company: "" } });

    // Finally, delete the company itself
    await Company.findByIdAndDelete(id);

    res.status(200).json({
      message: `Company and all associated data deleted successfully for company: ${companyName}`,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the company." });
  }
};