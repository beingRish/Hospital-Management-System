import { CommonModule } from '@angular/common';
import { Component, WritableSignal } from '@angular/core';
import { SharedModule } from '../../../../shared/shared-module';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AppointmentService } from '../../services/appointment';
import { AuthService } from '../../../../core/services/auth';
import { Appointment } from '../../models/appointment.model';

@Component({
  selector: 'app-appointment-detail',
  imports: [
    CommonModule,
    SharedModule,
    RouterLink,
  ],
  templateUrl: './appointment-detail.html',
  styleUrl: './appointment-detail.scss'
})
export class AppointmentDetail {
  userRole: 'ADMIN' | 'DOCTOR' | null = null;
  appointmentDetail!: WritableSignal<Appointment | null>;
  
  constructor(
    private route: ActivatedRoute, 
    private appointmentService: AppointmentService,
    private authService: AuthService,
  ) { }
  
  ngOnInit(): void {
    this.appointmentDetail = this.appointmentService.appointmentDetail;
    this.userRole = this.authService.getUserRole();
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.appointmentService.setAppointmentDetail(id);
    }
  }

}
