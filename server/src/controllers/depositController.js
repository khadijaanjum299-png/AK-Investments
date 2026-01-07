const Deposit = require('../models/deposit');
const User = require('../models/user');
const Transaction = require('../models/Transaction');

/**
 * USER: Request Deposit
 */
const requestDeposit = async (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Invalid deposit amount' });
  }

  const deposit = await Deposit.create({
    user: req.user._id,
    amount,
  });

  // create transaction (pending)
  await Transaction.create({
    user: req.user._id,
    type: 'deposit',
    amount,
    status: 'pending',
  });

  res.status(201).json(deposit);
};

/**
 * ADMIN: Approve / Reject Deposit
 */
const updateDepositStatus = async (req, res) => {
  const deposit = await Deposit.findById(req.params.id).populate('user');

  if (!deposit) {
    return res.status(404).json({ message: 'Deposit not found' });
  }

  if (deposit.status !== 'pending') {
    return res.status(400).json({ message: 'Deposit already processed' });
  }

  // Find transaction by deposit ID (link deposit & transaction directly)
  const transaction = await Transaction.findOne({
    user: deposit.user._id,
    type: 'deposit',
    status: 'pending',
    amount: deposit.amount
  });

  if (!transaction) {
    return res.status(404).json({ message: 'Transaction not found for this deposit' });
  }

  if (req.body.status === 'approved') {
    deposit.user.balance += deposit.amount;
    await deposit.user.save();

    deposit.status = 'approved';
    transaction.status = 'completed';
  } else if (req.body.status === 'rejected') {
    deposit.status = 'rejected';
    transaction.status = 'rejected';
  } else {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  await deposit.save();
  await transaction.save();

  res.json(deposit);
};


/**
 * ADMIN: Get All Deposits
 */
const getAllDeposits = async (req, res) => {
  const deposits = await Deposit.find().populate('user');
  res.json(deposits);
};

module.exports = {
  requestDeposit,
  updateDepositStatus,
  getAllDeposits,
};
