import { Component, effect, ViewChild, WritableSignal } from '@angular/core';
import { MedicineService } from '../../services/medicine';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../core/services/auth';
import { SnackbarService } from '../../../../core/services/snackbar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Medicine } from '../../models/medicine-model';
import Swal from 'sweetalert2';
import { AddMedicine } from '../add-medicine/add-medicine';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared-module';

@Component({
  selector: 'app-medicine',
  imports: [
    CommonModule,
    SharedModule,
  ],
  templateUrl: './medicine.html',
  styleUrl: './medicine.scss'
})
export class MedicineComponent {
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<Medicine>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  medicines!: WritableSignal<Medicine[]>;
  userRole: 'ADMIN' | 'DOCTOR' | null = null;

  constructor(
    private medicineService: MedicineService,
    private dialog: MatDialog,
    private authService: AuthService,
    private snackbar: SnackbarService,
  ) {
    effect(() => {
      this.medicines = this.medicineService.medicines;
      this.dataSource.data = this.medicines();
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.medicineService.setMedicines();
    this.setColumns();
  }

  setColumns() {
    this.displayedColumns = ['id', 'drugName', 'stock', 'actions'];
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  trackByMedicineId(index: number, medicine: Medicine): number {
    return medicine.id;
  }

  openAddMedicineDialog() {
    const dialogRef = this.dialog.open(AddMedicine, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.medicineService.setMedicines();
        this.snackbar.success('Medicine added! 🎉');

      }
    });
  }

  editMedicine(medicine: Medicine) {
    // this.openUpdateMedicineDialog(medicine); // if you already have update dialog
  }

  deleteMedicine(id: number) {
    this.OpenConfirmationDialog(id);
  }

  OpenConfirmationDialog(id: number) {
    Swal.fire({
      title: '⚠️ Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicineService.deleteMedicine(id).subscribe(response => {
          this.medicineService.setMedicines();
        });
        Swal.fire(
          'Deleted!',
          'The medicine has been deleted.',
          'success'
        );
      }
    });
  }
}