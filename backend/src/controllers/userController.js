const Employee = require('../models/Employee');
const Coach = require('../models/Coach');
const HR = require('../models/HR');

exports.getUserProfile = async (req, res) => {
    try {
      const { id, type } = req.user;
      
      if (!id || !type) {
        return res.status(400).json({ 
          error: 'Missing user information in token',
          details: { user: req.user }
        });
      }

      let user;
      
      switch(type.toLowerCase()) {
        case 'employee':
        case 'coach':
          const UserModel = type.toLowerCase() === 'employee' ? Employee : Coach;
          user = await UserModel.findById(id)
            .select('-password')
            .populate('company', 'name domain');
          break;
        case 'hr':
          user = await HR.findById(id).select('-password');
          // Format HR data to match the structure expected by frontend
          if (user) {
            user = user.toObject();
            user.company = {
              name: user.companyName,
              domain: user.domain
            };
            // Remove the flat fields to match the structure
            delete user.companyName;
            delete user.domain;
          }
          break;
        default:
          return res.status(400).json({ 
            error: 'Invalid type',
            details: { providedType: type }
          });
      }

      if (!user) {
        return res.status(404).json({ 
          error: 'User not found',
          details: { id, type }
        });
      }

      res.status(200).json({ user });
    } catch (error) {
      console.error('Get user profile error:', error);
      res.status(500).json({ 
        error: 'Error fetching user profile',
        details: error.message
      });
    }
};