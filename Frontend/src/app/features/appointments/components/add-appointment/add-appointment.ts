import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared-module';
import { Appointment } from '../../models/appointment.model';
import { AppointmentService } from '../../services/appointment';

@Component({
  selector: 'app-add-appointment',
  imports: [SharedModule],
  templateUrl: './add-appointment.html',
  styleUrl: './add-appointment.scss'
})
export class AddAppointment {
  appointmentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddAppointment>,
    private appointmentService: AppointmentService,
  ) {
    this.appointmentForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      symtomps: ['', Validators.required],
      number: ['', Validators.required],
    });
  }

  saveAppointment() {
    this.appointmentService.addAppointment(this.appointmentForm.value).subscribe((response: Appointment) => {
      console.log(response);
    });
  }
  
  onSubmit() {
    this.saveAppointment();
    this.dialogRef.close(true);
  }
}
