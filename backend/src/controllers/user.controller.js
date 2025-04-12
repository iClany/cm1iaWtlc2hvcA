const User = require('../models/user.model');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      isVerified: user.is_verified
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const success = await User.updateProfile(req.user.id, { name, email });
    
    if (success) {
      res.json({ message: 'Profile updated successfully' });
    } else {
      res.status(400).json({ message: 'Failed to update profile' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile' });
  }
}; 