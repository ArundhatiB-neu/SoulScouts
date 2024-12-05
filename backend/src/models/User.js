const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company" }, // Links user to company
    profilePicture: { type: String, default: null },
    phoneNumber: { type: String, default: null },
    domain: {
      type: String,
      enum: ["engineering", "sales", "marketing"],
      default: null,
    },
    emergencyContactName: { type: String, default: null },
    emergencyContactEmail: { type: String, default: null },
    emergencyContactPhone: { type: String, default: null },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["employee", "HR", "admin", "coach"],
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
