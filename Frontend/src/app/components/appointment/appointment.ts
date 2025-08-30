import { Component, effect, ViewChild, WritableSignal } from '@angular/core';
import { Appointment } from '../../models/appointment.model';
import { AppointmentService } from '../../services/appointment';
import { AddAppointment } from '../add-appointment/add-appointment';
import { SharedModule } from '../../shared/shared-module';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-appointment',
  imports: [SharedModule],
  templateUrl: './appointment.html',
  styleUrl: './appointment.scss'
})
export class AppointmentComponent {
  displayedColumns: string[] = [
    'id', 'name', 'age', 'symtomps', 'number'
  ];
  dataSource = new MatTableDataSource<Appointment>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  appointments!: WritableSignal<Appointment[]>;

  constructor(
    private appointmentService: AppointmentService,
    private dialog: MatDialog,
  ) {
    effect(() => {
      this.appointments = this.appointmentService.appointments;
      this.dataSource.data = this.appointments();
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.appointmentService.setAppointments();
  }

  trackByAppointmentId(index: number, appointment: Appointment): number {
    return appointment.id;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openAddAppointmentDialog() {
    const dialogRef = this.dialog.open(AddAppointment, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Appointment added!');
        this.appointmentService.setAppointments();
      }
    });
  }

}
