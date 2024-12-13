// types.ts
export interface ApiError {
  message: string; // Thông báo lỗi
  status: number | null; // Mã trạng thái HTTP, null nếu không có
}

export interface ApiResponse<T> {
  data: T | null; // Dữ liệu trả về từ API
  error: ApiError | null; // Thông tin về lỗi, null nếu không có lỗi
}
// type.ts
export interface Patient {
  id: number;
  full_name: string;
  date_of_birth: Date;
  email:string;
  gender:boolean;
  address:string;
  phone_number:string;
  registration_date:Date;
  id_card:string;
  employee:number
}
export interface Prescription {
  id: string;
  patient_id: string;
  medication_name: string;
  dosage: string;
  instructions: string;
  patient?: Patient; // Thêm thông tin bệnh nhân nếu cần (tuỳ chọn)
}