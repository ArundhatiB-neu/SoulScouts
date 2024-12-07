// settingsController.js
const Employee = require("../models/Employee");
const Coach = require("../models/Coach");
const HR = require("../models/HR");
const bcrypt = require("bcrypt");

// Helper function to validate phone number
const isValidPhone = (phone) => {
  if (!phone) return true; // Phone is optional
  return /^(\+1|1)?\d{10}$/.test(phone);
};

// Helper function to validate password
const isValidPassword = (password) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
};

// Helper function to get user model and populate options based on role
const getUserModelAndPopulate = (type) => {
  switch (type.toLowerCase()) {
    case 'employee':
      return {
        model: Employee,
        populate: { path: 'company', select: 'name domain' }
      };
    case 'coach':
      return {
        model: Coach,
        populate: { path: 'company', select: 'name domain' }
      };
    case 'hr':
      return {
        model: HR,
        populate: null
      };
    default:
      throw new Error('Invalid user type');
  }
};

exports.updateUserSettings = async (req, res) => {
  try {
    const { id: userId, type: role } = req.user; // Update to match middleware structure
    const { fullName, phone, domain, specialization, emergencyContact } = req.body;

    // Get appropriate model and populate options
    const { model: UserModel, populate } = getUserModelAndPopulate(role);
    const updateData = {};

    // Validate and set common fields
    if (fullName) {
      if (!/^[a-zA-Z\s]{2,50}$/.test(fullName)) {
        return res.status(400).json({
          error: "Full name must contain only letters and spaces (2-50 characters)"
        });
      }
      updateData.fullName = fullName;
    }

    if (phone !== undefined) {
      if (!isValidPhone(phone)) {
        return res.status(400).json({
          error: "Invalid phone number format. Must be a valid US phone number."
        });
      }
      updateData.phone = phone;
    }

    // Handle role-specific updates
    if (role === 'employee') {
      if (domain) {
        const validDomains = ['Engineering', 'Marketing', 'Sales'];
        if (!validDomains.includes(domain)) {
          return res.status(400).json({
            error: "Invalid domain selection"
          });
        }
        updateData.domain = domain;
      }

      if (emergencyContact) {
        const { name, email, phone } = emergencyContact;
        
        // Allow empty emergency contact
        if (name || email || phone) {
          if (name && !/^[a-zA-Z\s]{2,50}$/.test(name)) {
            return res.status(400).json({
              error: "Emergency contact name must contain only letters and spaces"
            });
          }
          
          if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({
              error: "Invalid emergency contact email format"
            });
          }
          
          if (phone && !isValidPhone(phone)) {
            return res.status(400).json({
              error: "Invalid emergency contact phone number"
            });
          }
        }
        
        updateData.emergencyContact = emergencyContact;
      }
    }

    if (role === 'coach' && specialization) {
      const validSpecializations = ['Therapy', 'Music Therapy', 'Art Therapy', 'Meditation', 'Yoga'];
      if (!validSpecializations.includes(specialization)) {
        return res.status(400).json({
          error: "Invalid specialization selection"
        });
      }
      updateData.specialization = specialization;
    }

    // Update user with population
    let updatedUser;
    if (populate) {
      updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { $set: updateData },
        { new: true, runValidators: true }
      )
      .select('-password')
      .populate(populate);
    } else {
      updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { $set: updateData },
        { new: true, runValidators: true }
      )
      .select('-password');
    }

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: "Settings updated successfully",
      user: updatedUser
    });

  } catch (error) {
    console.error('Settings update error:', error);
    res.status(500).json({
      error: "An error occurred while updating settings"
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { id: userId, type: role } = req.user; // Update to match middleware structure
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        error: "Both current and new password are required"
      });
    }

    if (!isValidPassword(newPassword)) {
      return res.status(400).json({
        error: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
      });
    }

    const { model: UserModel } = getUserModelAndPopulate(role);
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res.status(400).json({
        error: "New password must be different from current password"
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      message: "Password updated successfully"
    });

  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({
      error: "An error occurred while changing password"
    });
  }
};