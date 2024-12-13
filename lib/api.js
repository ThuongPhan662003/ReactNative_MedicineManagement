// lib/api.js

import axios from 'axios';
import apiConfig from './apiConfig';
import { getAuthToken } from './auth';

// Tạo instance axios
const client = axios.create({
  baseURL: apiConfig.API_BASE_URL,
});

// Interceptor để thêm token vào các request
client.interceptors.request.use(async (config) => {
  const token = await getAuthToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Hàm gọi API cho đăng nhập
const login = async (credentials) => {
  try {
    const response = await client.post(apiConfig.login, credentials);
    await saveAuthToken(response.data.token);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Các hàm gọi API khác
// ...

export { login };
