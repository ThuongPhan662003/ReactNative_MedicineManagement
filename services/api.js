
import axios from 'axios';
import apiConfig from './apiConfig';
import { saveAuthToken, saveUserId, getAuthToken } from './auth'; // Import các hàm lưu thông tin người dùng

// Tạo instance axios
const client = axios.create({
    baseURL: apiConfig.API_BASE_URL,
});

// Interceptor để thêm token vào request
client.interceptors.request.use(async (config) => {
    const token = await getAuthToken(); // Sử dụng getAuthToken thay vì saveAuthToken
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);

});

// Hàm gọi API cho đăng nhập
export const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/accounts/accounts/login/`, {
        username,
        password,
      });
      return response.data; // Trả về dữ liệu từ API (token, thông tin người dùng, ...)
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

export default { login };

