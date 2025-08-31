import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  getUserRole(): 'ADMIN' | 'DOCTOR' | null {
    return (localStorage.getItem('role') as 'ADMIN' | 'DOCTOR' | null);
  }

  login(username: string, password: string): Observable<boolean> {
    // Dummy logic for example:
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('token', 'mock-token');
      localStorage.setItem('role', 'ADMIN');
      return of(true);
    } else if (username === 'doctor' && password === 'doctor') {
      localStorage.setItem('token', 'mock-token');
      localStorage.setItem('role', 'DOCTOR');
      return of(true);
    }
    return of(false);
  }

  logout() {
    localStorage.clear();
  }
  
}
