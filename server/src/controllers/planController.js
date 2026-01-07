const Plan = require('../models/plan');

// @desc    Get all investment plans
// @route   GET /api/plans
// @access  Public
const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new investment plan
// @route   POST /api/plans
// @access  Admin
const createPlan = async (req, res) => {
  try {
    const { name, minAmount, dailyProfitPercent, durationDays } = req.body;

    const plan = await Plan.create({
      name,
      minAmount,
      dailyProfitPercent,
      durationDays,
    });

    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPlans , createPlan };
