// utils/api.ts
import axios from 'axios';
const SERVER_URL = "http://192.168.1.6:8000/api"; // Thay bằng URL server Python của bạn
async function apiRequest(endpoint: string, method: string = "GET", body: object | null = null): Promise<any> {
  try {
    console.log("api request");
    const response = await fetch(`${SERVER_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
    });
    console.log("dang vô",`${SERVER_URL}${endpoint}`);

    if (!response.ok) {
      console.log("dang xử lý");
      const errorMessage = await response.text(); // Đọc message lỗi từ response (nếu có)
      throw new Error(`Error: ${response.statusText} - ${errorMessage}`);
    }

    const data = await response.json(); // Đọc body JSON một lần duy nhất
    console.log("Response data:", data);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("API Request Error:", error.message);
      throw error; // Ném lại lỗi để xử lý ở nơi gọi
    } else {
      console.error("Unknown error occurred");
      throw new Error("Unknown error occurred");
    }
  }
}
export default apiRequest;
