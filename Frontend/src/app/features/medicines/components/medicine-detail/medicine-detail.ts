import { CommonModule } from '@angular/common';
import { Component, WritableSignal } from '@angular/core';
import { SharedModule } from '../../../../shared/shared-module';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Medicine } from '../../models/medicine-model';
import { MedicineService } from '../../services/medicine';
import { AuthService } from '../../../../core/services/auth';

@Component({
  selector: 'app-medicine-detail',
  imports: [
    CommonModule,
    SharedModule,
    RouterLink,
  ],
  templateUrl: './medicine-detail.html',
  styleUrl: './medicine-detail.scss'
})
export class MedicineDetail {
  userRole: 'ADMIN' | 'DOCTOR' | null = null;
  medicineDetail!: WritableSignal<Medicine | null>;
  
  constructor(
    private route: ActivatedRoute, 
    private medicineService: MedicineService,
    private authService: AuthService,
  ) { }
  
  ngOnInit(): void {
    this.medicineDetail = this.medicineService.medicineDetail;
    this.userRole = this.authService.getUserRole();
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.medicineService.setMedicineDetail(id);
    }
  }

}
