const express = require('express');
const router = express.Router();

const investmentController = require('../controllers/investmentController');
const authMiddleware = require('../utils/authMiddleware');

router.post(
  '/',
  authMiddleware.protect,
  investmentController.createInvestment
);

router.get(
  '/my',
  authMiddleware.protect,
  investmentController.getMyInvestments
);

module.exports = router;


