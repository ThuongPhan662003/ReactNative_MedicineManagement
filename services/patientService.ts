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

export async function getPatientById(patientId: string): Promise<any> {
  return await apiRequest(`/prescriptions/patients/${patientId}`, "GET");
}
// services/patientService.ts


type UpdatePatientData = Partial<Patient>;
export async function updatePatientByField(
  patientId: string, 
  updatedData: Partial<UpdatePatientData>
): Promise<Patient> {
  return await apiRequest(`/prescriptions/patients/${patientId}`, "PUT", updatedData);
}




// export async function updatePatient(patientId: string, updatedData: UpdatePatientData): Promise<any> {
//   return await apiRequest(`/prescriptions/patients/${patientId}`, "PUT", updatedData);
// }
// services/patientService.ts

export async function deletePatient(patientId: string): Promise<any> {
  return await apiRequest(`/prescriptions/patients/${patientId}`, "DELETE");
}


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



export async function updatePrescription(prescriptionId: string, updatedData: UpdatePatientData): Promise<any> {
  return await apiRequest(`/prescriptions/prescriptions/${prescriptionId}`, "PUT", updatedData);
}
// services/patientService.ts

export async function deletePrescription(prescriptionId: string): Promise<any> {
  return await apiRequest(`/prescriptions/prescriptions/${prescriptionId}`, "DELETE");
}
