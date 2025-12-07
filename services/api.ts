import axios from 'axios';

// In production, this would be an environment variable
const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const endpoints = {
  auth: {
    login: '/auth/login/',
    refresh: '/auth/refresh/',
    signup: '/auth/signup/',
  },
  products: {
    list: '/products/',
    detail: (slug: string) => `/products/${slug}/`,
    vault: '/vault/',
  },
  payments: {
    stkPush: '/payments/mpesa/stk/',
  },
  events: {
    list: '/events/',
  }
};

export default api;