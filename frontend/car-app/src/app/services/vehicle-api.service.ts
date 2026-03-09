import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  getMakes(): Observable<ApiResponse<Make>> {
    return this.http.get<ApiResponse<Make>>(`${this.baseUrl}/makes`);
  }

  getVehicleTypes(makeId: number): Observable<ApiResponse<VehicleType>> {
    return this.http.get<ApiResponse<VehicleType>>(`${this.baseUrl}/makes/${makeId}/types`);
  }

  getModels(makeId: number, year: number): Observable<ApiResponse<Model>> {
    const params = new HttpParams()
      .set('makeId', makeId)
      .set('year', year);

    return this.http.get<ApiResponse<Model>>(`${this.baseUrl}/models`, { params });
  }
}
