import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PatientService } from '../../services/patient';
import { Patient } from '../../models/patient.model';
import { SharedModule } from '../../../../shared/shared-module';

@Component({
  selector: 'app-add-patient',
  imports: [SharedModule],
  templateUrl: './add-patient.html',
  styleUrl: './add-patient.scss'
})
export class AddPatient {
  patientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddPatient>,
    private patientService: PatientService,
  ) {
    this.patientForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      blood: ['', Validators.required],
      prescription: ['', Validators.required],
      dose: ['', Validators.required],
      urgency: ['', Validators.required],
      fees: ['', Validators.required],
    });
  }

  savePatient() {
    this.patientService.addPatient(this.patientForm.value).subscribe((response: Patient) => {
      console.log(response);
    });
  }
  
  onSubmit() {
    this.savePatient();
    this.dialogRef.close(true);
  }

}
