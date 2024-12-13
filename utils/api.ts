// utils/api.ts
import axios from 'axios';
const SERVER_URL = "http://192.168.1.6:8000/api"; // Thay bằng URL server Python của bạn
// apiRequest function that performs the HTTP request
async function apiRequest(
  url: string, 
  method: string, 
  data?: any
): Promise<any> {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    return response.json(); // Parse and return the response body as JSON
  } catch (error) {
    console.error("API request error:", error);
    throw error; // Propagate the error to be handled by the caller
  }
}

export default apiRequest;
