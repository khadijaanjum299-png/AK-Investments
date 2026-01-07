const express = require('express');
const router = express.Router();

const planController = require('../controllers/planController');
const authMiddleware = require('../utils/authMiddleware');

router.get('/', planController.getPlans);

router.post(
  '/',
  authMiddleware.protect,
  authMiddleware.admin,
  planController.createPlan
);

module.exports = router;


