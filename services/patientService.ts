import { Constants } from 'expo-constants';
// services/patientService.ts
import apiRequest from '@/utils/api'
import {Prescription,Patient}  from "@/constants/types";
export async function createPatient(full_name: string, employee: number, date_of_birth: Date,email:string,gender:boolean,address:string,phone_number:string,registration_date:Date,id_card:string): Promise<any> {
  return await apiRequest("/patients", "POST", { full_name, date_of_birth, gender,id_card,phone_number,address,email,registration_date,employee });
}


//////////////////////////////////////////////////////////////
import axios from 'axios';

// Địa chỉ API cơ bản
const API_BASE_URL = 'http://192.168.1.6:8000/api';

export const getPatients = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/prescriptions/patients/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
};

export const getPatientById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/prescriptions/patients/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching patient with id ${id}:`, error);
    throw error;
  }
};
export const searchPatients = async (queryParams: Record<string, any>) => {
  try {
    // Gửi yêu cầu GET với các tham số tìm kiếm
    const response = await axios.get(`${API_BASE_URL}/prescriptions/patients/`, {
      params: queryParams,  // Các tham số tìm kiếm (e.g. name, email)
    });

    // Trả về kết quả tìm kiếm
    return response.data;
  } catch (error) {
    console.error('Error searching patients:', error);
    
    // Ném lỗi để xử lý ở nơi gọi hàm
    throw error;
  }
};
export const addPatient = async (patientData: Record<string, any>) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/prescriptions/patients/`, patientData);
    return response.data;
  } catch (error) {
    console.error('Error adding patient:', error);
    throw error;
  }
};

export const updatePatientByField = async (
  id: string,
  updatedData: Record<string, any>
) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/prescriptions/patients/${id}/`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating patient with id ${id}:`, error);

    // Kiểm tra nếu lỗi là từ Axios
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || // Thông báo lỗi cụ thể từ API
        error.response?.data || // Toàn bộ dữ liệu lỗi nếu không có trường `message`
        error.message || // Lỗi mặc định của Axios
        "An unknown error occurred.";
      throw new Error(errorMessage);
    }

    // Xử lý lỗi không phải của Axios
    throw new Error(
      error instanceof Error
        ? error.message
        : "An unexpected error occurred."
    );
  }
};



export const deletePatient = async (id: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/prescriptions/patients/${id}/`);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error(`Error deleting patient with id ${id}:`, error);
    throw error;
  }
};
