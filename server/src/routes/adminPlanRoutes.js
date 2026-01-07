const express = require('express');
const router = express.Router();

const {
  createPlan,
  updatePlan,
  deletePlan,
  getAllPlans,
} = require('../controllers/adminPlanController');

const { protect, admin } = require('../utils/authMiddleware');

// ADMIN ONLY ROUTES
router.post('/', protect, admin, createPlan);
router.get('/', protect, admin, getAllPlans);
router.put('/:id', protect, admin, updatePlan);
router.delete('/:id', protect, admin, deletePlan);

module.exports = router;
