const SupportRequest = require('../model/support');

// Add a new support request
exports.addSupportRequest = async (req, res) => {
    try {
      const { message } = req.body;
  
      if (!message) {
        return res.status(400).json({ message: 'Message is required' });
      }
  
      const supportRequest = new SupportRequest({ userId: req.user.id, message });
      await supportRequest.save();
  
      res.status(201).json({ message: 'Support request submitted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  // Get all support requests (for coaches)
  exports.getSupportRequests = async (req, res) => {
    try {
      const requests = await SupportRequest.find({}).populate('userId', '-password');
      res.json(requests);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Resolve a support request
exports.resolveSupportRequest = async (req, res) => {
    try {
      const { id } = req.params;
      const { response } = req.body;
  
      const request = await SupportRequest.findByIdAndUpdate(
        id,
        { 
            isResolved: true, 
            response, 
            resolvedAt: new Date() 
        },
        { 
            new: true 
        }
      );
  
      if (!request) {
        return res.status(404).json({ message: 'Support request not found' });
      }
  
      res.status(200).json({ message: 'Support request resolved', request });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };