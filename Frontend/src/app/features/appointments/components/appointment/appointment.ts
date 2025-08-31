import { Component, effect, ViewChild, WritableSignal } from '@angular/core';
import { Appointment } from '../../models/appointment.model';
import { AddAppointment } from '../add-appointment/add-appointment';
import { SharedModule } from '../../../../shared/shared-module';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AppointmentService } from '../../services/appointment';
import { AuthService } from '../../../../core/services/auth';

@Component({
  selector: 'app-appointment',
  imports: [SharedModule],
  templateUrl: './appointment.html',
  styleUrl: './appointment.scss'
})
export class AppointmentComponent {
  displayedColumns: string[] = [
    'id', 'name', 'age', 'symtomps', 'number', 'actions'
  ];
  dataSource = new MatTableDataSource<Appointment>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  appointments!: WritableSignal<Appointment[]>;
  userRole: 'ADMIN' | 'DOCTOR' | null = null;

  constructor(
    private appointmentService: AppointmentService,
    private dialog: MatDialog,
    private authService: AuthService,
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
    this.userRole = this.authService.getUserRole();
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

  editAppointment(appointment: any) {
    // this.openUpdateAppointmentDialog(appointment); // if you already have update dialog
  }

  deleteAppointment(id: number) {
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
        this.appointmentService.deleteAppointment(id).subscribe(response => {
          console.log(response);
          this.appointmentService.setAppointments();
        });
        Swal.fire(
          'Deleted!',
          'The appointment has been deleted.',
          'success'
        );
      }
    });
  }
}
