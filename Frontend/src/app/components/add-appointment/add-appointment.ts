import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AppointmentService } from '../../services/appointment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedModule } from '../../shared/shared-module';

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

  onSubmit() {
    if (this.appointmentForm.valid) {
      console.log(this.appointmentForm.value);
      
      // ToDo: Handle form submission, e.g., save the appointment
    }
  }
}
