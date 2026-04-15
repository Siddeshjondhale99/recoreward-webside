import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://eco-backend-jfn4.onrender.com'; // Use environment variable with fallback

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

export const authService = {
  login: (email, password) => api.post('/login', new URLSearchParams({ username: email, password })),
  register: (userData) => api.post('/signup', userData),
  getProfile: () => api.get('/user/profile'),
};

export const userService = {
  getHistory: () => api.get('/user/history'),
};

export const rewardService = {
  getRewards: () => api.get('/rewards'),
  redeem: (rewardId) => api.post(`/redeem/${rewardId}`),
  getVouchers: () => api.get('/user/vouchers'),
};

export const adminService = {
  getDashboard: () => api.get('/admin/dashboard'),
  getAnalytics: () => api.get('/admin/analytics'),
};
