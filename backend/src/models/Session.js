// models/Session.js
const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,

    enum: ["employee", "HR", "Coach", "Admin"], // Match the model names exactly
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Session", sessionSchema);