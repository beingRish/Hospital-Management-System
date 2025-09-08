import { Component, effect, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Patient } from '../../models/patient.model';
import { PatientService } from '../../services/patient';
import { AuthService } from '../../../../core/services/auth';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared-module';

@Component({
  selector: 'app-patient-detail',
  imports: [
    CommonModule,
    SharedModule,
    RouterLink,
  ],
  templateUrl: './patient-detail.html',
  styleUrl: './patient-detail.scss'
})
export class PatientDetail { patient!: Patient;
  userRole: 'ADMIN' | 'DOCTOR' | null = null;
  patientDetail!: WritableSignal<Patient | null>;

  constructor(
    private route: ActivatedRoute, 
    private patientService: PatientService,
    private authService: AuthService,
  ) {
    effect(() => {
      this.patientDetail = this.patientService.patientDetail;
    })
  }

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.patientService.setPatientDetail(id);
    }
  }

}
