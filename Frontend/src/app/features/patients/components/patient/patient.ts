import { Component, effect, ViewChild, WritableSignal } from '@angular/core';
import { PatientService } from '../../services/patient';
import { Patient } from '../../models/patient.model';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared-module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddPatient } from '../add-patient/add-patient';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.html',
  styleUrls: ['./patient.scss'],
  imports: [
    CommonModule,
    SharedModule,
  ],
})
export class PatientComponent {
  displayedColumns: string[] = [
    'id', 'name', 'age', 'blood', 'prescription', 'dose', 'urgency', 'fees', 'actions'
  ];
  dataSource = new MatTableDataSource<Patient>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  patients!: WritableSignal<Patient[]>;

  constructor(
    private patientService: PatientService,
    private dialog: MatDialog,
  )
   {
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
    this.patientService.setPatients();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  trackByPatientId(index: number, patient: Patient): number {
    return patient.id;
  }

  openAddPatientDialog() {
    const dialogRef = this.dialog.open(AddPatient, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Patient added!');
        this.patientService.setPatients();
      }
    });
  }
  
    editPatient(patient: Patient) {
      // this.openUpdatePatientDialog(patient); // if you already have update dialog
    }
  
    deletePatient(id: number) {
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