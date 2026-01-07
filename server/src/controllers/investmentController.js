const Investment = require('../models/Investment');
const Plan = require('../models/plan');

// @desc Create new investment
const createInvestment = async (req, res) => {
  const { planId, amount } = req.body;

  const plan = await Plan.findById(planId);
  if (!plan) {
    return res.status(404).json({ message: 'Plan not found' });
  }

  const investment = await Investment.create({
    user: req.user._id,
    plan: plan._id,
    amount,
    dailyProfit: (amount * plan.dailyRate) / 100,
  });

  res.status(201).json({ message: 'Investment created successfully', investment });
};

// @desc Get logged in user's investments
const getMyInvestments = async (req, res) => {
  const investments = await Investment.find({ user: req.user._id }).populate('plan');
  res.json(investments);
};

module.exports = {
  createInvestment,
  getMyInvestments,
};

