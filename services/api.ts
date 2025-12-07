
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

export interface ProductFilters {
  type?: string;
  origin?: string;
  min_price?: number;
  max_price?: number;
  q?: string;
}

export const endpoints = {
  auth: {
    login: '/auth/login/',
    refresh: '/auth/refresh/',
    signup: '/auth/signup/',
  },
  products: {
    list: (filters: ProductFilters = {}) => {
      const params = new URLSearchParams();
      if (filters.q) params.append('q', filters.q);
      if (filters.type) params.append('type', filters.type);
      if (filters.origin) params.append('origin', filters.origin);
      if (filters.min_price) params.append('price_min', filters.min_price.toString());
      if (filters.max_price) params.append('price_max', filters.max_price.toString());
      return `/products/?${params.toString()}`;
    },
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
