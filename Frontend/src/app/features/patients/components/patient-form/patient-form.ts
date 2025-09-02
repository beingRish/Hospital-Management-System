import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../../../shared/shared-module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Patient } from '../../models/patient.model';
import { PatientService } from '../../services/patient';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient-form',
  imports: [SharedModule],
  templateUrl: './patient-form.html',
  styleUrl: './patient-form.scss'
})
export class PatientForm {
  patientForm: FormGroup;
  isEdit: boolean = false;
  patient: Patient | null = null;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { isEdit: true | false, patient: Patient | null },
    private dialogRef: MatDialogRef<PatientForm>,
    private patientService: PatientService,
    private activatedRoute: ActivatedRoute,
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

  ngOnInit(): void {
    if (this.data) {
      this.isEdit = this.data.isEdit ?? false;
      this.patient = this.data.patient ?? null;
    }

    this.activatedRoute.queryParams.subscribe(params => {
      if (params['edit'] !== undefined) {
        this.isEdit = params['edit'] === 'true';
        this.loadPatient();
      }
    });
  }

  loadPatient() {
    this.patient ? this.patientForm.patchValue(this.patient) : null;
  }

  savePatient() {
    if (this.isEdit && this.patient?.id) {
      this.patientService.updatePatient(this.patient.id, this.patientForm.value).subscribe((response: Patient) => {
        if(response) {
          this.patientService.setPatients();
          this.dialogRef.close(true);
        }
      });
    } else {
      this.patientService.addPatient(this.patientForm.value).subscribe((response: Patient) => {
        if(response) {
          this.patientService.setPatients();
          this.dialogRef.close(true);
        }
      });
    }
  }

  onSubmit() {
    if (this.patientForm.valid) {
      this.savePatient();
    }
  }

}
