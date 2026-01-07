// Import packages
const express = require('express');
const mongoose = require('mongoose'); // <--- You MUST have this
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); // Load .env file

const app = express();
app.use(cors());
app.use(express.json());

const planRoutes = require('./routes/planRoutes');
app.use('/api/plans', planRoutes);


app.use('/api/auth', (req, res, next) => {
  console.log('API AUTH ROUTE HIT');
  next();
});

app.get('/test', (req, res) => {
  res.send('Server is working');
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const userRoutes = require('./routes/user');
app.use('/api/user' , userRoutes);

const investmentRoutes = require('./routes/investmentRoutes');
app.use('/api/investments', investmentRoutes);

const profitRoutes = require('./routes/profitRoutes');
app.use('/api/profit', profitRoutes);

app.use('/api/admin/plans', require('./routes/adminPlanRoutes'));

const withdrawalRoutes = require('./routes/withdrawalRoutes');
app.use('/api/withdrawals', withdrawalRoutes);

const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);

const transactionRoutes = require('./routes/transactionRoutes');
app.use('/api/transactions', transactionRoutes);

app.use('/api/deposits', require('./routes/depositRoutes'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.log(err));

const cron = require('node-cron');
const calculateDailyProfit = require('./utils/profitCalculator');

// Schedule the job to run every day at midnight (server time)
cron.schedule('0 0 * * *', async () => {
  console.log('Running daily profit calculation...');
  try {
    await calculateDailyProfit();
    console.log('Daily profits added successfully.');
  } catch (err) {
    console.error('Error calculating daily profits:', err);
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


