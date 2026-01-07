// Import the model (your file is lowercase, keep it that way)
const UserModel = require('../models/user');

// @desc    Get logged-in user profile
// @route   GET /api/user/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    // Use a DIFFERENT variable name for the instance from the DB
    const userData = await UserModel.findById(req.user._id);

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      _id: userData._id,
      name: userData.name,
      email: userData.email,
      balance: userData.balance,
      role: userData.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserProfile };
