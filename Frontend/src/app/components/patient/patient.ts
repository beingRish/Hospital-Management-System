import { Component, effect, ViewChild, WritableSignal } from '@angular/core';
import { PatientService } from '../../services/patient';
import { Patient } from '../../models/patient.model';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared-module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddPatient } from '../add-patient/add-patient';

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
    'id', 'name', 'age', 'blood', 'prescription', 'dose', 'urgency', 'fees'
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
}