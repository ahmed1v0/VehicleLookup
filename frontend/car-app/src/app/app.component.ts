import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Make,
  Model,
  VehicleApiService,
  VehicleType
} from './services/vehicle-api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  makes: Make[] = [];
  vehicleTypes: VehicleType[] = [];
  models: Model[] = [];

  selectedMakeId?: number;
  selectedYear = new Date().getFullYear();

  loading = false;
  errorMessage = '';

  constructor(private readonly vehicleApiService: VehicleApiService) {
    this.loadMakes();
  }

  onMakeChange(): void {
    this.models = [];

    if (!this.selectedMakeId) {
      this.vehicleTypes = [];
      return;
    }

    this.setLoadingState();
    this.vehicleApiService.getVehicleTypes(this.selectedMakeId).subscribe({
      next: (response) => {
        this.vehicleTypes = response.Results;
        this.loading = false;
      },
      error: () => this.handleError('Failed to load vehicle types.')
    });
  }

  searchModels(): void {
    if (!this.selectedMakeId || !this.selectedYear) {
      return;
    }

    this.setLoadingState();
    this.vehicleApiService.getModels(this.selectedMakeId, this.selectedYear).subscribe({
      next: (response) => {
        this.models = response.Results;
        this.loading = false;
      },
      error: () => this.handleError('Failed to load models for the selected criteria.')
    });
  }

  private loadMakes(): void {
    this.setLoadingState();
    this.vehicleApiService.getMakes().subscribe({
      next: (response) => {
        this.makes = response.Results;
        this.loading = false;
      },
      error: () => this.handleError('Failed to load vehicle makes.')
    });
  }

  private setLoadingState(): void {
    this.loading = true;
    this.errorMessage = '';
  }

  private handleError(message: string): void {
    this.errorMessage = message;
    this.loading = false;
  }
}
