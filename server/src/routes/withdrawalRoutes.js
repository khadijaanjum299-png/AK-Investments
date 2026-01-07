const express = require('express');
const router = express.Router();

const {
  requestWithdrawal,
  updateWithdrawalStatus,
  getAllWithdrawals,
} = require('../controllers/withdrawalController');

const { protect, admin } = require('../utils/authMiddleware');

/*
=====================
 USER ROUTES
=====================
*/

// User requests a withdrawal
router.post('/', protect, requestWithdrawal);

/*
=====================
 ADMIN ROUTES
=====================
*/

// Admin gets all withdrawals
router.get('/', protect, admin, getAllWithdrawals);

// Admin approves or rejects a withdrawal
router.put('/:id', protect, admin, updateWithdrawalStatus);

module.exports = router;

