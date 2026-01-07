const User = require('../models/user');
const Plan = require('../models/plan');
const Investment = require('../models/Investment');
const Withdrawal = require('../models/withdrawal');

// @desc    Get Admin Dashboard statistics
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getAdminDashboard = async (req, res) => {
  try {
    // Total users
    const totalUsers = await User.countDocuments();

    // Total admins
    const totalAdmins = await User.countDocuments({ role: 'admin' });

    // Total plans
    const totalPlans = await Plan.countDocuments();

    // Total investments
    const totalInvestments = await Investment.countDocuments();

    // Total active investments
    const activeInvestments = await Investment.countDocuments({ isActive: true });

    // Total pending withdrawals
    const pendingWithdrawals = await Withdrawal.countDocuments({ status: 'pending' });

    // Total approved withdrawals
    const approvedWithdrawals = await Withdrawal.countDocuments({ status: 'approved' });

    // Total rejected withdrawals
    const rejectedWithdrawals = await Withdrawal.countDocuments({ status: 'rejected' });

    // Optional: total balance in system
    const users = await User.find();
    const totalBalance = users.reduce((acc, user) => acc + user.balance, 0);

    res.json({
      totalUsers,
      totalAdmins,
      totalPlans,
      totalInvestments,
      activeInvestments,
      pendingWithdrawals,
      approvedWithdrawals,
      rejectedWithdrawals,
      totalBalance,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getAdminDashboard };
