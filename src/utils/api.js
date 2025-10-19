import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'https://feron-fine-products-backend.onrender.com/api';

export const api = axios.create({ baseURL });

// Attach token if available
api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('ffp_token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {}
  return config;
});

// Basic error unwrapping
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.message || error.message || 'Request failed';
    return Promise.reject({ ...error, message });
  }
);
