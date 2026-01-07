import api from './axios';

// Get logged-in user profile
export const getUserProfile = () => api.get('/user/profile');

// Request withdrawal
export const requestWithdrawal = (amount) =>
  api.post('/withdrawals', { amount });

// Create deposit
export const createDeposit = (amount) =>
  api.post('/deposits', { amount });

// Get transaction history
export const getTransactions = () =>
  api.get('/transactions/my');

