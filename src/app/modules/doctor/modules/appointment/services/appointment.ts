import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../../../shared/services/api-service';
import { ApiEndpoints } from '../../../../../shared/constants/api-endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Appointment {
  private api = inject(ApiService);

   getAllAppointment(): Observable<any> {
      return this.api.get(ApiEndpoints.APPOINTMENT.GET);
    }

    saveAppointment(data: any): Observable<any> {
      return this.api.post(ApiEndpoints.APPOINTMENT.POST, data);
    }

  getDoctor(): Observable<any> {
      return this.api.get(ApiEndpoints.DOCTOR.GET);
    }

    getDoctorFee(doctorId: any): Observable<any> {
      const url = `${ApiEndpoints.DOCTOR.GETFee}${doctorId}`;
      return this.api.get(url);
    }

    getPatientByNameOrPhone(term : string): Observable<any> {
      const url = `${ApiEndpoints.PATIENT.GET_BY_NAME_OR_PHONE}?role=patient&name=${term}`;
      return this.api.get(url);
    }
}
