import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../../../shared/services/api-service';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../../../../../shared/constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class PrescriptionService {
  private api = inject(ApiService);

   getPatientAsPerDoctor(page: number, pageSize: number, search: string) {
  return this.api.get(
    `${ApiEndpoints.DOCTOR.GetPatientAsPerDoctor}`
  );
}

}
