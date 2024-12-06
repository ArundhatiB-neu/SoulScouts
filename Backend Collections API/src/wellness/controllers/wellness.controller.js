const WellnessEntry = require('../model/wellness');

exports.addEntry = async (req, res) => {
  try {
    const { mood, stressLevel, note } = req.body;

    if (!mood || !stressLevel || !note) {
      return res.status(400).json({ message: 'Mood and stress level are required' });
    }

    const entry = new WellnessEntry({ userId: req.user.id, mood, stressLevel, note });
    await entry.save();
    res.status(201).json({ message: 'Entry added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEntries = async (req, res) => {
  try {
    const entries = await WellnessEntry.find({ userId: req.user.id });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { mood, stressLevel, note } = req.body;

    if (!mood || !stressLevel || !note) {
      return res.status(400).json({ message: 'Mood, stress level, and note are required' });
    }

    const entry = await WellnessEntry.findOneAndUpdate(
      { _id: id, userId: req.user.id }, // Ensure the entry belongs to the logged-in user
      { mood, stressLevel, note },
      { new: true } // Return the updated document
    );

    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    res.status(200).json({ message: 'Entry updated successfully', entry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEntry = async (req, res) => {
  try {
    const { id } = req.params;

    const entry = await WellnessEntry.findOneAndDelete({
      _id: id,
      userId: req.user.id, // Ensure the entry belongs to the logged-in user
    });

    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    res.status(200).json({ message: 'Entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
