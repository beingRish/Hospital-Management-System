import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  appointments: WritableSignal<Appointment[]> = signal<Appointment[]>([]);
  
  constructor(private httpClient: HttpClient) { }

  setAppointments(): void {
    this.getAllAppointments().subscribe((appointments: Appointment[]) => {
      this.appointments.set(appointments);
    })
  }

  getAllAppointments(): Observable<Appointment[]> {
    return this.httpClient.get<Appointment[]>(`/v2`);
  }

  addAppointment(appointment: Appointment): Observable<Appointment> {
    return this.httpClient.post<Appointment>(`/v2/insert`, appointment);
  }

  deleteAppointment(id: number): Observable<void> {
    return this.httpClient.delete<void>(`/v2/appointments/${id}`);
  }
  
  updateAppointment(id: number, appointment: Appointment): Observable<Appointment> {
    return this.httpClient.put<Appointment>(`/v2/appointments/${id}`, appointment);
  }
  
}
