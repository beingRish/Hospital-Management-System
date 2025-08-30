import { Component, effect, WritableSignal } from '@angular/core';
import { Appointment } from '../../models/appointment.model';
import { AppointmentService } from '../../services/appointment';
import { AddAppointment } from '../add-appointment/add-appointment';
import { SharedModule } from '../../shared/shared-module';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-appointment',
  imports: [SharedModule],
  templateUrl: './appointment.html',
  styleUrl: './appointment.scss'
})
export class AppointmentComponent {
  appointments!: WritableSignal<Appointment[]>;

  constructor(
    private appointmentService: AppointmentService,
    private dialog: MatDialog,
  ) {
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

  openAddAppointmentDialog() {
    const dialogRef = this.dialog.open(AddAppointment, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Appointment added!');
      }
    });
  }

}
