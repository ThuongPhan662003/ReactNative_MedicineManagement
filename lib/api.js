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
const login = async (credentials) => {
    try {
        const response = await client.post(apiConfig.login, credentials);
        
        await saveAuthToken(response.data.token);
        await saveUserId(response.data.employee_id); 
        
        return response.data; // Trả về toàn bộ dữ liệu từ API nếu cần
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export default { login };
