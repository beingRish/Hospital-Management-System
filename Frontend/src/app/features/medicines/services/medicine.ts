import { Injectable, signal, WritableSignal } from '@angular/core';
import { Medicine } from '../models/medicine-model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  
  medicines: WritableSignal<Medicine[]> = signal<Medicine[]>([]);
  
  constructor(private httpClient: HttpClient) { }

  setMedicines(): void {
    this.getMedicineList().subscribe((medicines: Medicine[]) => {
      this.medicines.set(medicines);
    })
  }

  getMedicineList(): Observable<Medicine[]> {
    return this.httpClient.get<Medicine[]>(`/v3`)
  }
  
  addMedicine(medicine: Medicine): Observable<Medicine> {
    return this.httpClient.post<Medicine>(`/v3/insert`, medicine)
  }

  deleteMedicine(id: number): Observable<void> {
    return this.httpClient.delete<void>(`/v3/medicines/${id}`);
  }
  
}
