const CoachFeedback = require('../model/coachFeedback');

// Add feedback
exports.addFeedback = async (req, res) => {
  try {
    const { programId, feedback } = req.body;

    if (!programId || !feedback) {
      return res.status(400).json({ message: 'Program ID and feedback are required' });
    }

    const coachFeedback = new CoachFeedback({ coachId: req.user.id, programId, feedback });
    await coachFeedback.save();

    res.status(201).json({ message: 'Feedback submitted successfully', coachFeedback });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get feedback for a program
exports.getFeedback = async (req, res) => {
  try {
    const feedbacks = await CoachFeedback.find({}).populate('programId').populate('coachId');
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
