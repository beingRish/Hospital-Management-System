import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../../../shared/shared-module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Medicine } from '../../models/medicine-model';
import { MedicineService } from '../../services/medicine';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medicine-form',
  imports: [SharedModule],
  templateUrl: './medicine-form.html',
  styleUrl: './medicine-form.scss'
})
export class MedicineForm {
  medicineForm: FormGroup;
  isEdit: boolean = false;
  medicine: Medicine | null = null;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { isEdit: true | false, medicine: Medicine | null },
    private dialogRef: MatDialogRef<MedicineForm>,
    private medicineService: MedicineService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.medicineForm = this.fb.group({
      drugName: ['', Validators.required],
      stock: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.isEdit = this.data.isEdit ?? false;
      this.medicine = this.data.medicine ?? null;
    }

    this.activatedRoute.queryParams.subscribe(params => {
      if (params['edit'] !== undefined) {
        this.isEdit = params['edit'] === 'true';
        this.loadPatient();
      }
    });
  }

  loadPatient() {
    this.medicine ? this.medicineForm.patchValue(this.medicine) : null;
  }

  saveMedicine() {
    if (this.isEdit && this.medicine?.id) {
      this.medicineService.updateMedicine(this.medicine.id, this.medicineForm.value).subscribe((response: Medicine) => {
        if (response) {
          this.medicineService.setMedicines();
          this.dialogRef.close(true);
        }
      });
    } else {
      this.medicineService.addMedicine(this.medicineForm.value).subscribe((response: Medicine) => {
        if (response) {
          this.medicineService.setMedicines();
          this.dialogRef.close(true);
        }
      });
    }
  }

  onSubmit() {
    this.saveMedicine();
  }
}
