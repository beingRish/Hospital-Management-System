import { Component, effect, WritableSignal } from '@angular/core';
import { Appointment } from '../../models/appointment.model';
import { AppointmentService } from '../../services/appointment';

@Component({
  selector: 'app-appointment',
  imports: [],
  templateUrl: './appointment.html',
  styleUrl: './appointment.scss'
})
export class AppointmentComponent {
  appointments!: WritableSignal<Appointment[]>;

  constructor(private appointmentService: AppointmentService) {
    effect(() => {
      this.appointments = this.appointmentService.appointments;
    })
  }

  ngOnInit(): void {
    this.appointmentService.setAppointments();
  }

  trackByAppointmentId(index: number, appointment: Appointment): number {
    return appointment.id;
  }

}
