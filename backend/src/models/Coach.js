const mongoose = require("mongoose");

const coachSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    match: /^[a-zA-Z\s]{2,50}$/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@soulscouts\.com$/,
  },
  phone: {
    type: String,
    match: /^(\+1|1)?\d{10}$/,
    required: false,
  },
  specialization: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Coach", coachSchema);
