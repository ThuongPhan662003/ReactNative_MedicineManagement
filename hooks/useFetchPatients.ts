import { useState, useEffect } from "react";
import { ApiResponse, ApiError } from "@/constants/types";  // Import các interface từ file types.ts
// import Constants from 'expo-constants';
// import { API_URL } from '@env';
// const API_URL = Constants.extra?.API_URL;

// console.log("API URL:", API_URL);

interface Patient {
  id: number;
  name: string;
  age: number;
  diagnosis: string;
}

export function useFetchPatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null); // Thay đổi kiểu lỗi thành ApiError
  
  // Hàm fetchPatients được cập nhật trả về ApiResponse
  const fetchPatients = async (): Promise<ApiResponse<Patient[]>> => {
    setLoading(true);
    setError(null); // Reset lỗi mỗi lần gọi lại
    try {
      const response = await fetch("http://192.168.1.79:5000/patients");

      if (!response.ok) {
        const errorResponse: ApiError = {
          message: `HTTP error! status: ${response.status}`,
          status: response.status,
        };
        setError(errorResponse);
        return { data: null, error: errorResponse }; // Trả về ApiResponse có lỗi
      }

      const data: Patient[] = await response.json();
      setPatients(data);
      return { data, error: null }; // Trả về ApiResponse thành công với dữ liệu
    } catch (error: any) {
      const errorResponse: ApiError = {
        message: error.message || "Unknown error",
        status: null, // Không có mã trạng thái HTTP khi lỗi xảy ra trong quá trình fetch
      };
      setError(errorResponse);
      return { data: null, error: errorResponse }; // Trả về ApiResponse có lỗi
    } finally {
      setLoading(false);
    }
  };

  // Hook gọi fetchPatients mỗi khi component được render
  useEffect(() => {
    fetchPatients(); // Gọi API khi component mount
  }, []);

  return { patients, loading, error, refetch: fetchPatients }; // Trả về dữ liệu, loading, lỗi và refetch
}
