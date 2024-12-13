import { Constants } from 'expo-constants';
// services/patientService.ts
import apiRequest from '@/utils/api'
import {Prescription,Patient}  from "@/constants/types";
export async function createPatient(full_name: string, employee: number, date_of_birth: Date,email:string,gender:boolean,address:string,phone_number:string,registration_date:Date,id_card:string): Promise<any> {
  return await apiRequest("/patients", "POST", { full_name, date_of_birth, gender,id_card,phone_number,address,email,registration_date,employee });
}
// services/patientService.ts

export async function getAllPatients(): Promise<any> {
    console.log("danh sách")
  return await apiRequest("/prescriptions/patients", "GET");
}
// services/patientService.ts

// export async function getPatientById(patientId: string): Promise<any> {
//   return await apiRequest(`/prescriptions/patients/${patientId}`, "GET");
// }
// services/patientService.ts

// type UpdatePatientData = Partial<Patient>;

// export async function updatePatientByField(
//   patientId: string, 
//   updatedData: Partial<UpdatePatientData>
// ): Promise<Patient> {
//   try {
//     const url = `/prescriptions/patients/${patientId}`; // API endpoint
//     const method = "PUT"; // HTTP method for update
    
//     // Call apiRequest with the endpoint, method, and updated data
//     const result = await apiRequest(url, method, updatedData);
    
//     // Return the result which should be the updated patient data
//     return result as Patient;
//   } catch (error) {
//     console.error("Error updating patient:", error);
//     throw error; // Propagate the error to be handled by the caller
//   }
// }




// export async function updatePatient(patientId: string, updatedData: UpdatePatientData): Promise<any> {
//   return await apiRequest(`/prescriptions/patients/${patientId}`, "PUT", updatedData);
// }
// services/patientService.ts

// export async function deletePatient(patientId: string): Promise<any> {
//   return await apiRequest(`/prescriptions/patients/${patientId}`, "DELETE");
// }


// --------------------------------
//func prescription
//------------------------------
export async function createPrescription(name: string, age: number, diagnosis: string): Promise<any> {
  return await apiRequest("/prescriptions", "POST", { name, age, diagnosis });
}
// services/patientService.ts

export async function getAllPrescriptions(): Promise<any> {
    console.log("danh sách")
  return await apiRequest("/prescriptions/prescriptions", "GET");
}
// services/patientService.ts

export async function getPrescriptionById(prescriptionId: string): Promise<any> {
  return await apiRequest(`/prescriptions/prescriptions/${prescriptionId}`, "GET");
}
// services/patientService.ts



// export async function updatePrescription(prescriptionId: string, updatedData: UpdatePatientData): Promise<any> {
//   return await apiRequest(`/prescriptions/prescriptions/${prescriptionId}`, "PUT", updatedData);
// }
// services/patientService.ts

export async function deletePrescription(prescriptionId: string): Promise<any> {
  return await apiRequest(`/prescriptions/prescriptions/${prescriptionId}`, "DELETE");
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

export const addPatient = async (patientData: Record<string, any>) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/prescriptions/patients`, patientData);
    return response.data;
  } catch (error) {
    console.error('Error adding patient:', error);
    throw error;
  }
};

export const updatePatientByField = async (id: string, updatedData: Record<string, any>) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/prescriptions/patients/${id}/`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating patient with id ${id}:`, error);
    throw error;
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
