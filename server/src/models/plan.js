const mongoose = require('mongoose');

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    minAmount: {
      type: Number,
      required: true,
    },
    dailyProfitPercent: {
      type: Number,
      required: true,
    },
    durationDays: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Plan', planSchema);
