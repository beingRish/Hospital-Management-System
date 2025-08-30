import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  patients: WritableSignal<Patient[]> = signal<Patient[]>([]);
  
  constructor(private httpClient: HttpClient) { }

  setPatients(): void {
    this.getPatientList().subscribe((patients: Patient[]) => {
      this.patients.set(patients);
    })
  }

  getPatientList(): Observable<Patient[]> {
    return this.httpClient.get<Patient[]>(`/v1`)
  }
  
  addPatient(patient: Patient): Observable<Patient> {
    return this.httpClient.post<Patient>(`/v1/insert`, patient)
  }

  deletePatient(id: number): Observable<void> {
    return this.httpClient.delete<void>(`/v1/patients/${id}`);
  }
}
