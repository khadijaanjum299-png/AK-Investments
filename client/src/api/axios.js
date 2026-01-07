import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔐 Attach token automatically for every request
api.interceptors.request.use((config) => {
  // Try to get user/admin info from localStorage
  const userInfo = localStorage.getItem('userInfo'); // for normal user
  const adminInfo = localStorage.getItem('adminInfo'); // for admin

  let token = null;

  if (adminInfo) {
    token = JSON.parse(adminInfo).token; // admin token
  } else if (userInfo) {
    token = JSON.parse(userInfo).token; // regular user token
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;



