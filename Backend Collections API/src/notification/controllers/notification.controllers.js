const Notification = require('../model/notification');

// Send a notification
exports.sendNotification = async (req, res) => {
  try {
    const { content, audience } = req.body;

    if (!content || !audience) {
      return res.status(400).json({ message: 'Content and audience are required' });
    }

    const notification = new Notification({ senderId: req.user.id, content, audience });
    await notification.save();

    res.status(201).json({ message: 'Notification sent successfully', notification });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all notifications
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ audience: { $in: [req.user.role] } });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
