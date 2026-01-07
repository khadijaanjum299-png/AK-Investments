const Plan = require('../models/plan');

// CREATE PLAN
const createPlan = async (req, res) => {
  const { name,  minAmount, durationDays, dailyProfitPercent } = req.body;

  const plan = await Plan.create({
    name,
    minAmount,
    durationDays,
    dailyProfitPercent,
  });

  res.status(201).json(plan);
};

// UPDATE PLAN
const updatePlan = async (req, res) => {
  const plan = await Plan.findById(req.params.id);
  if (!plan) {
    return res.status(404).json({ message: 'Plan not found' });
  }

  plan.name = req.body.name || plan.name;
  plan.durationDays = req.body.durationDays || plan.durationDays;
  plan.dailyProfitPercent =
    req.body.dailyProfitPercent || plan.dailyProfitPercent;

  await plan.save();
  res.json(plan);
};

// DELETE PLAN
const deletePlan = async (req, res) => {
  const plan = await Plan.findById(req.params.id);
  if (!plan) {
    return res.status(404).json({ message: 'Plan not found' });
  }

  await plan.deleteOne();
  res.json({ message: 'Plan deleted successfully' });
};

// GET ALL PLANS (ADMIN)
const getAllPlans = async (req, res) => {
  const plans = await Plan.find();
  res.json(plans);
};

module.exports = {
  createPlan,
  updatePlan,
  deletePlan,
  getAllPlans,
};
