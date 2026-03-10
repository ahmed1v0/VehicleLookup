import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Model } from '../types/Model';
import { VehicleType } from '../types/VehicleType';
import { Make } from '../types/Make';
import { ApiResponse } from '../types/ApiResponse';

@Injectable({ providedIn: 'root' })
export class VehicleApiService {
  private readonly baseUrl = `${environment.apiBaseUrl}/vehicles`;

  constructor(private readonly http: HttpClient) {}

  getMakes() {
    return this.http.get<ApiResponse<Make>>(`${this.baseUrl}/makes`);
  }

  getVehicleTypes(makeId: number) {
    return this.http.get<ApiResponse<VehicleType>>(`${this.baseUrl}/makes/${makeId}/types`);
  }

  getModels(makeId: number, year: number) {
    const params = new HttpParams()
      .set('makeId', makeId)
      .set('year', year);

    return this.http.get<ApiResponse<Model>>(`${this.baseUrl}/models`, { params });
  }
}
