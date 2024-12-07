// controllers/settingsController.js
const HR = require("../models/HR");
const Employee = require("../models/Employee");
const Coach = require("../models/Coach");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");

const validatePassword = (password) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

const validatePhone = (phone) => /^(\+1|1)?\d{10}$/.test(phone);

exports.updateUserSettings = async (req, res) => {
  try {
    const userId = req.user.id;
    const userType = req.user.type;
    const { fullName, phone, domain, specialization, emergencyContact } = req.body;

    const UserModel = {
      HR,
      Employee,
      Coach,
      Admin
    }[userType];

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const updates = {};

    // Handle common fields
    if (fullName && userType !== 'Admin') {
      if (!/^[a-zA-Z\s]{2,50}$/.test(fullName)) {
        return res.status(400).json({ error: "Invalid full name format" });
      }
      updates.fullName = fullName;
    }

    if (phone) {
      if (!validatePhone(phone)) {
        return res.status(400).json({ error: "Invalid phone number format" });
      }
      updates.phone = phone;
    }

    // Handle role-specific fields
    switch (userType) {
      case 'Employee':
        if (domain) {
          if (!['Engineering', 'Marketing', 'Sales'].includes(domain)) {
            return res.status(400).json({ error: "Invalid domain" });
          }
          updates.domain = domain;
        }
        if (emergencyContact) {
          const { name, email, phone } = emergencyContact;
          if (name && email && phone) {
            if (!/^[a-zA-Z\s]{2,50}$/.test(name)) {
              return res.status(400).json({ error: "Invalid emergency contact name" });
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
              return res.status(400).json({ error: "Invalid emergency contact email" });
            }
            if (!validatePhone(phone)) {
              return res.status(400).json({ error: "Invalid emergency contact phone" });
            }
            updates.emergencyContact = emergencyContact;
          }
        }
        break;

      case 'Coach':
        if (specialization) {
          if (!['Therapy', 'Music Therapy', 'Art Therapy', 'Meditation', 'Yoga'].includes(specialization)) {
            return res.status(400).json({ error: "Invalid specialization" });
          }
          updates.specialization = specialization;
        }
        break;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).populate('company').populate('coach');

    const { password, ...userWithoutPassword } = updatedUser.toObject();

    res.status(200).json({
      message: "Settings updated successfully",
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Settings update error:', error);
    res.status(500).json({ error: "An error occurred while updating settings" });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const userType = req.user.type;
    const { oldPassword, newPassword } = req.body;

    const UserModel = {
      HR,
      Employee,
      Coach,
      Admin
    }[userType];

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify old password
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    // Validate new password
    if (!validatePassword(newPassword)) {
      return res.status(400).json({
        error: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
      });
    }

    // Hash and update new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await UserModel.findByIdAndUpdate(userId, { password: hashedPassword });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({ error: "An error occurred while changing password" });
  }
};