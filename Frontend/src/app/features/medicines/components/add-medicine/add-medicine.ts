import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared-module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MedicineService } from '../../services/medicine';
import { Medicine } from '../../models/medicine-model';

@Component({
  selector: 'app-add-medicine',
  imports: [SharedModule],
  templateUrl: './add-medicine.html',
  styleUrl: './add-medicine.scss'
})
export class AddMedicine {
  medicineForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddMedicine>,
    private stock: MedicineService,
  ) {
    this.medicineForm = this.fb.group({
      drugName: ['', Validators.required],
      stock: ['', Validators.required],
    });
  }

  saveMedicine() {
    this.stock.addMedicine(this.medicineForm.value).subscribe((response: Medicine) => {
      console.log(response);
    });
  }
  
  onSubmit() {
    this.saveMedicine();
    this.dialogRef.close(true);
  }
}
