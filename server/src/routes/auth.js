const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

router.get('/test', (req, res) => {
  res.send('Auth route working');
});

// Register new user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

module.exports = router;
