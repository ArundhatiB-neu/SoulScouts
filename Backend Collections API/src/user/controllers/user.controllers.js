require('dotenv').config();
const User = require('../model/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, email, password, role, isAnonymous } = req.body;

    if ( !username || !email || !password || !role || !isAnonymous ) {
      res.status(400).json({ message: 'All fields are required' });
    }
    
    const newUser = new User({ username, email, password, role, isAnonymous });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if ( !email || !password ) {
      return res.status(400).json({ message: 'All fields are required' })
    }
    

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '5h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
    if (!token) {
      return res.status(400).json({ message: 'No token provided' });
    }

    res.status(200).json({ message: 'Logout successful, token invalidated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUserPreference = async (req, res) => {
  try {
    const { id } = req.params;
    const { isAnonymous, notificationPreferences } = req.body;

    // Check if the fields to update are provided
    if (isAnonymous === undefined && !notificationPreferences) {
      return res.status(400).json({ message: 'No valid fields provided to update' });
    }

    const updates = {};
    if (isAnonymous !== undefined) updates.isAnonymous = isAnonymous;
    if (notificationPreferences) updates.notificationPreferences = notificationPreferences;

    const user = await User.findByIdAndUpdate(
      id,
      { ...updates, updatedAt: new Date() }, // Ensure updatedAt is set
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id, '-password'); // Exclude the password field
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
