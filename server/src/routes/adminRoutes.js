const express = require('express');
const router = express.Router();
const { getAdminDashboard } = require('../controllers/adminController');
const { protect, admin } = require('../utils/authMiddleware');

// Dashboard endpoint
router.get('/dashboard', protect, admin, getAdminDashboard);

module.exports = router;
