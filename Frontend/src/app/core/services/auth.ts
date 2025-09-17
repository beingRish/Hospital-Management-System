import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Storage } from './storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) { }

  isLoggedIn(): boolean {
    const token = this.storage.getToken();
    return !!token;
  }

  getUserRole(): 'ADMIN' | 'DOCTOR' | null {
    return (this.storage.getRole() as 'ADMIN' | 'DOCTOR' | null);
  }

  login(username: string, password: string): Observable<boolean> {
    const body = {
      username: username,
      password: password
    };

    return this.http.post<{ token: string; role: 'ADMIN' | 'DOCTOR' }>('/auth/login', body).pipe(
      tap({
        next: (response) => {
          this.storage.setToken(response.token);
          this.storage.setRole(response.role);
        },
        error: (err) => {
          console.error('Login failed:', err);
        },
      }),
      map(() => true),
      catchError(() => of(false))
    );
  }

  register(username: string, password: string, role: string): Observable<boolean> {
    const body = {
      username: username,
      password: password,
      userType: role
    };

    return this.http.post('/users/register', body).pipe(
      tap({
        next: (response) => {
          debugger
          console.log('response:', response);
        },
        error: (err) => {
          debugger
          console.error('Registeration failed:', err);
        },
      }),
      map(() => true),
      catchError(() => of(false))
    );;
  }

  logout() {
    this.storage.clear();
  }
  
}
