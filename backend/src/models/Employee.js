const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    match: /^[a-zA-Z\s]{2,50}$/,
  },
  company: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  },
  domain: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    match: /^(\+1|1)?\d{10}$/,
    required: false,
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

module.exports = mongoose.model("Employee", employeeSchema);
