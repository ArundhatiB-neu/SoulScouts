const WellnessSurvey = require("../models/WellnessSurvey");

exports.submitSurvey = async (req, res) => {
  const { employeeId, companyId, coachId, ...surveyData } = req.body;

  if (!employeeId || !companyId) {
    return res
      .status(400)
      .json({ error: "Employee ID and Company ID are required." });
  }

  try {
    const newSurvey = new WellnessSurvey({
      employeeId,
      companyId,
      coachId,
      ...surveyData,
    });

    const savedSurvey = await newSurvey.save();
    res.status(201).json({
      message: "Wellness survey submitted successfully.",
      survey: savedSurvey,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting the survey." });
  }
};

exports.fetchSurveys = async (req, res) => {
  const { companyId, coachId, employeeId } = req.query;

  try {
    const filters = {};
    if (companyId) filters.companyId = companyId;
    if (coachId) filters.coachId = coachId;
    if (employeeId) filters.employeeId = employeeId;

    const surveys = await WellnessSurvey.find(filters)
      .populate("employeeId", "fullName email")
      .populate("companyId", "name domain")
      .populate("coachId", "fullName email");

    if (!surveys || surveys.length === 0) {
      return res.status(404).json({ error: "No surveys found." });
    }

    res.status(200).json({
      message: "Surveys retrieved successfully.",
      surveys,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching surveys." });
  }
};
