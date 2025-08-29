import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Patient } from '../models/patient';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private  baseUrl: string = "http://localhost:8080/api/v1";
  patients: WritableSignal<Patient[]> = signal<Patient[]>([]);
  
  constructor(private httpClient: HttpClient) { }

  setPatients(): void {
    this.getPatientList().subscribe((patients: Patient[]) => {
      this.patients.set(patients);
    })
  }

  getPatientList(): Observable<Patient[]> {
    return this.httpClient.get<Patient[]>(`${this.baseUrl}`)
  }
}
