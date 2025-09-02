import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Appointment } from '../../models/appointment.model';
import { AppointmentService } from '../../services/appointment';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from '../../../../shared/shared-module';

@Component({
  selector: 'app-appointment-form',
  imports: [SharedModule],
  templateUrl: './appointment-form.html',
  styleUrl: './appointment-form.scss'
})
export class AppointmentForm {
  appointmentForm: FormGroup;isEdit: boolean = false;
  appointment: Appointment | null = null;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { isEdit: true | false, appointment: Appointment | null },
    private dialogRef: MatDialogRef<AppointmentForm>,
    private appointmentService: AppointmentService,
    private route: ActivatedRoute,
  ) {
    this.appointmentForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      symtomps: ['', Validators.required],
      number: ['', Validators.required],
    });
  }
  
  ngOnInit(): void {
    if (this.data) {
      this.isEdit = this.data.isEdit ?? false;
      this.appointment = this.data.appointment ?? null;
    }

    this.route.queryParams.subscribe(params => {
      if (params['edit'] !== undefined) {
        this.isEdit = params['edit'] === 'true';
        this.loadAppointment();
      }
    });
  }

  loadAppointment() {
    this.appointment ? this.appointmentForm.patchValue(this.appointment) : null;
  }
  
  saveAppointment() {
    if (this.isEdit && this.appointment?.id) {
      this.appointmentService.updateAppointment(this.appointment.id, this.appointmentForm.value).subscribe((response: Appointment) => {
        if(response) {
          this.appointmentService.setAppointments();
          this.dialogRef.close(true);
        }
      });
    } else {
      this.appointmentService.addAppointment(this.appointmentForm.value).subscribe((response: Appointment) => {
        this.appointmentService.setAppointments();
        this.dialogRef.close(true);
      });
    }
  }
  
  onSubmit() {
    this.saveAppointment();
  }
}
