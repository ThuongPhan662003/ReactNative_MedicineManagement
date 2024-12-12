// utils/api.ts
const SERVER_URL = "http://192.168.1.18:5000"; // Thay bằng URL server Python của bạn

async function apiRequest(endpoint: string, method: string = "GET", body: object | null = null): Promise<any> {
  try {
    const response = await fetch(`${SERVER_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    // Kiểm tra kiểu của 'error' và xử lý an toàn
    if (error instanceof Error) {
      console.error("API Request Error:", error.message);
      throw error; // Ném lại lỗi để xử lý ở nơi gọi
    } else {
      console.error("Unknown error occurred");
      throw new Error("Unknown error occurred");
    }
  }
}
