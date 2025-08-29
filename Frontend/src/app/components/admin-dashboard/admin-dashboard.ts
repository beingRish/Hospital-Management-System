import { Component, effect, WritableSignal } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient';
import { Nav } from '../nav/nav';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.scss'],
  imports: [CommonModule, Nav],
})
export class AdminDashboard {
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