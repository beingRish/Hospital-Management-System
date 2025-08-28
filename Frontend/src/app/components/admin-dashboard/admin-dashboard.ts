import { Component } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient';
import { Nav } from '../nav/nav';

@Component({
  selector: 'app-admin-dashboard',
  imports: [Nav],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss'
})
export class AdminDashboard {
  patients: Patient[] = [];

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients() {
    this.patientService.getPatientList().subscribe(patients => {
      debugger
      this.patients = patients;
    })
  }

}
