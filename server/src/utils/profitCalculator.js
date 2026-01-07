const Transaction = require('../models/Transaction');
const Investment = require('../models/Investment');
const User = require('../models/user');
const Plan = require('../models/plan');

const calculateDailyProfit = async () => {
  const investments = await Investment.find({ isActive: true })
    .populate('plan user');

  for (let inv of investments) {
    const plan = inv.plan;

    // Stop investment if duration completed
    if (inv.daysCompleted >= plan.durationDays) {
      inv.isActive = false;
      await inv.save();
      continue;
    }

    // Calculate daily profit
    const dailyProfit = (inv.amount * plan.dailyProfitPercent) / 100;

    // Add profit to user balance
    const user = inv.user;
    user.balance += dailyProfit;

    // 🔹 LOG TRANSACTION (THIS IS THE IMPORTANT PART)
    await Transaction.create({
      user: user._id,
      type: 'profit',
      amount: dailyProfit,
      status: 'completed',
    });

    // Update investment days
    inv.daysCompleted += 1;

    // Save changes
    await user.save();
    await inv.save();
  }

  console.log('Daily profit calculated successfully');
};

module.exports = calculateDailyProfit;

