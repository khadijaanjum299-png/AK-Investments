const express = require('express');
const router = express.Router();
const { getMyTransactions } = require('../controllers/transactionController');
const { protect } = require('../utils/authMiddleware');

// USER transaction history
router.get('/my', protect, getMyTransactions);

module.exports = router;
