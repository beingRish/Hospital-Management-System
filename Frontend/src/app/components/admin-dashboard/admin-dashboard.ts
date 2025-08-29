import { Component, effect, WritableSignal } from '@angular/core';
import { PatientService } from '../../services/patient';
import { Patient } from '../../models/patient.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.scss'],
  imports: [CommonModule],
})
export class AdminDashboardComponent {
  patients!: WritableSignal<Patient[]>;

  constructor(private patientService: PatientService) {
    effect(() => {
      this.patients = this.patientService.patients;
    })
  }

  ngOnInit(): void {
    this.patientService.setPatients();
  }

  trackByPatientId(index: number, patient: Patient): number {
    return patient.id;
  }
}