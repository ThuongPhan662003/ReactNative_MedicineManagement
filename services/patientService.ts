// services/patientService.ts

interface Patient {
id:number;
  name: string;
  age: number;
  diagnosis: string;
}

export async function createPatient(name: string, age: number, diagnosis: string): Promise<any> {
  return await apiRequest("/patients", "POST", { name, age, diagnosis });
}
// services/patientService.ts

export async function getAllPatients(): Promise<any> {
    console.log("danh sách")
  return await apiRequest("/patients", "GET");
}
// services/patientService.ts

export async function getPatientById(patientId: string): Promise<any> {
  return await apiRequest(`/patients/${patientId}`, "GET");
}
// services/patientService.ts

interface UpdatePatientData {
  name?: string;
  age?: number;
  diagnosis?: string;
}

export async function updatePatient(patientId: string, updatedData: UpdatePatientData): Promise<any> {
  return await apiRequest(`/patients/${patientId}`, "PUT", updatedData);
}
// services/patientService.ts

export async function deletePatient(patientId: string): Promise<any> {
  return await apiRequest(`/patients/${patientId}`, "DELETE");
}
