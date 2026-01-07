const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authMiddleware = require('../utils/authMiddleware');

router.get(
  '/profile',
  authMiddleware.protect,
  userController.getUserProfile
);

module.exports = router;


