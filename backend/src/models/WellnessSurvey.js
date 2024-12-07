const mongoose = require("mongoose");

const wellnessSurveySchema = new mongoose.Schema({
  date: { type: Date, required: true, default: Date.now },
  department: { type: String },
  physical: { type: Number },
  mental: { type: Number },
  workLife: { type: Number },
  total: { type: Number },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  coachId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Coach",
    required: false,
  },
  analytics: {
    physicalWellness: {
      energyLevel: { type: String },
      sleepHours: { type: String },
    },
    mentalWellness: {
      stressLevel: { type: String },
      overwhelmedByWork: { type: String },
    },
    workLifeBalance: {
      workBeyondOfficeHours: { type: String },
      disconnectFromWork: { type: String },
    },
  },
});

module.exports = mongoose.model("WellnessSurvey", wellnessSurveySchema);
