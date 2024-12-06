const Program = require('../model/program');

// Add a new program
exports.addProgram = async (req, res) => {
  try {
    const { title, description, targetAudience, startDate, endDate } = req.body;

    if (!title || !description || !targetAudience || !startDate || !endDate) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const program = new Program({ title, description, targetAudience, startDate, endDate });
    await program.save();

    res.status(201).json({ message: 'Program created successfully', program });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all programs
exports.getPrograms = async (req, res) => {
  try {
    const programs = await Program.find({});
    res.json(programs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a program
exports.updateProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, targetAudience, startDate, endDate } = req.body;

    const program = await Program.findByIdAndUpdate(
      id,
      { title, description, targetAudience, startDate, endDate },
      { new: true }
    );

    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }

    res.status(200).json({ message: 'Program updated successfully', program });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a program
exports.deleteProgram = async (req, res) => {
  try {
    const { id } = req.params;

    const program = await Program.findByIdAndDelete(id);

    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }

    res.status(200).json({ message: 'Program deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
