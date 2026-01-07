const Withdrawal = require('../models/withdrawal');
const User = require('../models/user');
const Transaction = require('../models/Transaction');


// ============================
// USER REQUEST WITHDRAWAL
// ============================
const requestWithdrawal = async (req, res) => {
  const { amount } = req.body;

  if (req.user.balance < amount) {
    return res.status(400).json({ message: 'Insufficient balance' });
  }

  const withdrawal = await Withdrawal.create({
    user: req.user._id,
    amount,
    status: 'pending',
  });

  // ✅ LOG TRANSACTION (PENDING)
  await Transaction.create({
    user: req.user._id,
    type: 'withdrawal',
    amount,
    status: 'pending',
  });

  res.status(201).json(withdrawal);
};


// ============================
// ADMIN APPROVE / REJECT
// ============================
const updateWithdrawalStatus = async (req, res) => {
  const withdrawal = await Withdrawal.findById(req.params.id).populate('user');

  if (!withdrawal) {
    return res.status(404).json({ message: 'Withdrawal not found' });
  }

  if (withdrawal.status !== 'pending') {
    return res.status(400).json({ message: 'Already processed' });
  }

  // Find related transaction
  const transaction = await Transaction.findOne({
    user: withdrawal.user._id,
    type: 'withdrawal',
    amount: withdrawal.amount,
    status: 'pending',
  });

  if (req.body.status === 'approved') {
    withdrawal.user.balance -= withdrawal.amount;
    await withdrawal.user.save();

    transaction.status = 'completed';
    await transaction.save();
  }

  if (req.body.status === 'rejected') {
    transaction.status = 'rejected';
    await transaction.save();
  }

  withdrawal.status = req.body.status;
  await withdrawal.save();

  res.json(withdrawal);
};


// ============================
// ADMIN VIEW ALL WITHDRAWALS
// ============================
const getAllWithdrawals = async (req, res) => {
  const withdrawals = await Withdrawal.find().populate('user');
  res.json(withdrawals);
};

module.exports = {
  requestWithdrawal,
  updateWithdrawalStatus,
  getAllWithdrawals,
};


