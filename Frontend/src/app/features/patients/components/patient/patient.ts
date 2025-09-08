import { Component, effect, ViewChild, WritableSignal } from '@angular/core';
import { PatientService } from '../../services/patient';
import { Patient } from '../../models/patient.model';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared-module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AuthService } from '../../../../core/services/auth';
import { SnackbarService } from '../../../../core/services/snackbar';
import { PatientForm } from '../patient-form/patient-form';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.html',
  styleUrls: ['./patient.scss'],
  imports: [
    CommonModule,
    SharedModule,
    RouterLink,
  ],
})
export class PatientComponent {
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<Patient>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  patients!: WritableSignal<Patient[]>;
  userRole: 'ADMIN' | 'DOCTOR' | null = null;

  constructor(
    private patientService: PatientService,
    private dialog: MatDialog,
    private authService: AuthService,
    private snackbar: SnackbarService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    effect(() => {
      this.patients = this.patientService.patients;
      this.dataSource.data = this.patients();
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.patientService.setPatients();
    this.setColumns();
  }

  setColumns() {
    if (this.userRole === 'ADMIN') {
      this.displayedColumns = ['id', 'name', 'age', 'urgency', 'fees', 'actions'];
    } else if (this.userRole === 'DOCTOR') {
      this.displayedColumns = ['id', 'name', 'age', 'blood', 'prescription', 'dose', 'urgency', 'fees', 'actions'];
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  trackByPatientId(index: number, patient: Patient): number {
    return patient.id;
  }

  openPatientFormDialog(isEdit: boolean, patient?: Patient) {
    this.addQueryParams(isEdit, patient)
    const dialogRef = this.dialog.open(PatientForm, {
      width: '600px',
      data: {
        isEdit: isEdit,
        patient: patient || null,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.clearQueryParams();
      if (result) {
        this.snackbar.success(
          isEdit ? 'Patient updated! ✨' : 'Patient added! 🎉'
        );
      }
    });
  }

  addQueryParams(isEdit: boolean, patient?: Patient) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        edit: isEdit,
        id: patient ? patient.id : null
      },
      queryParamsHandling: 'merge',
    });
  }

  clearQueryParams() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {},
    });
  }

  deletePatient(id: number) {
    this.OpenConfirmationDialog(id);
  }

  viewPatientDetail(id: number) {
    const role = this.userRole?.toLowerCase();
    this.router.navigate([`/${role}/patients`, id]);
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
        this.patientService.deletePatient(id).subscribe(response => {
          console.log(response);
          this.patientService.setPatients();
        });
        Swal.fire(
          'Deleted!',
          'The patient has been deleted.',
          'success'
        );
      }
    });
  }
}