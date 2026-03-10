import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface ApiResponse<T> {
  Results: T[];
}

export interface Make {
  Make_ID: number;
  Make_Name: string;
}

export interface VehicleType {
  VehicleTypeId: number;
  VehicleTypeName: string;
}

export interface Model {
  Model_ID: number;
  Model_Name: string;
}

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
