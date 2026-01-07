const express = require('express');
const router = express.Router();

const {
  requestDeposit,
  updateDepositStatus,
  getAllDeposits,
} = require('../controllers/depositController');

const { protect, admin } = require('../utils/authMiddleware');

// USER
router.post('/', protect, requestDeposit);

// ADMIN
router.get('/', protect, admin, getAllDeposits);
router.put('/:id', protect, admin, updateDepositStatus);

module.exports = router;
