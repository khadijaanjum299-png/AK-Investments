const mongoose = require('mongoose');

const investmentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // link to user
    },
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Plan', // link to plan
    },
    amount: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    daysCompleted: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Investment = mongoose.model('Investment', investmentSchema);
module.exports = Investment;
