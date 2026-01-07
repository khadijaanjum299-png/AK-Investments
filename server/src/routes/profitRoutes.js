const express = require('express');
const router = express.Router();
const calculateDailyProfit = require('../utils/profitCalculator');
const authMiddleware = require('../utils/authMiddleware');

// Wrap it inside an async route handler
router.post(
  '/calculate',
  authMiddleware.protect,
  authMiddleware.admin,
  async (req, res) => {
    await calculateDailyProfit(); // call your utility function
    res.json({ message: 'Daily profit applied successfully' });
  }
);

module.exports = router;




