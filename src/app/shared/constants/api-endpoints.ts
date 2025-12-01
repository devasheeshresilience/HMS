import { environment } from "../../../environment/environment.delvelopment";


const API_BASE_URL=environment.baseUrl
 
export const ApiEndpoints = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/Auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh-token`,
  },
  APPOINTMENT : 
  {
    GET:`${API_BASE_URL}/AppointmentAPI/Get`,
    POST:`${API_BASE_URL}/AppointmentAPI/POST`
  },
  PATIENT: {
    GET: (page: number, pageSize: number, search: string) =>
      `${API_BASE_URL}/SelectAPI/getUserList?role=patient&page=${page}&pageSize=${pageSize}&search=${search}`,
    GET_BY_NAME_OR_PHONE: `${API_BASE_URL}/SelectAPI/getUserListbyTerm`
  },
  USER: {
    GET_ROLE_ID: (roleName: string) =>
      `${API_BASE_URL}/ApplicationUserAPI/getRoleId?roleName=${roleName}`,

    CREATE: `${API_BASE_URL}/ApplicationUserAPI/CreateUser`
  },
  MEDICINE: {
    GET: `${API_BASE_URL}/MedicineAPI/getMedicineAsPerHospitalId`,

    GET_MEDICINE_TYPE: `${API_BASE_URL}/MedicineAPI/getMedicineType`,

    POST: `${API_BASE_URL}/MedicineAPI/Post`

  },
  LABTEST: {
    GET: `${API_BASE_URL}/LabTest/Get`
  },

  DOCTOR :
  {
    GET:`${API_BASE_URL}/SelectAPI/getUserList?role=doctor`,
    GETFee : `${API_BASE_URL}/DoctorAPI/getDoctorFee?DoctorId=`,
    GetPatientAsPerDoctor : `https://www.api.medipilot360.com/api/DoctorAPI/getPatientAsPerDoctorId?page=1&pageSize=100`,
    GetDoctorById:`${API_BASE_URL}/DoctorAPI/getDoctorsById?id=`
  },
  DASHBOARD :
  {
    GETDASHBOARDDATA:`${API_BASE_URL}/DashboardAPI/todayappointments`,
  }
 
};