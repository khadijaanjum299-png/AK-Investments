import api from './axios';

// Fetch the logged-in user's transactions
export const fetchMyTransactions = async () => {
  try {
    const { data } = await api.get('/transactions/my'); // Make sure this route exists in backend
    return data; // Array of transaction objects
  } catch (err) {
    console.error('Error fetching transactions:', err.response?.data || err);
    return [];
  }
};

