const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  category: {
    type: String,
    enum: [
      "Mindfulness",
      "Relaxation",
      "Meditation",
      "Focus Music",
      "ASMR",
      "Rain Sounds",
      "Destress Activities",
    ],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Resource", resourceSchema);
