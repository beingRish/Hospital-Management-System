import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  getUserRole(): 'ADMIN' | 'DOCTOR' | null {
    return (localStorage.getItem('role') as 'ADMIN' | 'DOCTOR' | null);
  }

  login(username: string, password: string): Observable<boolean> {
    const body = {
      username: username,
      password: password
    };

    return this.http.post<{ token: string; role: 'ADMIN' | 'DOCTOR' }>('/auth/login', body).pipe(
      tap({
        next: (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
        },
        error: (err) => {
          console.error('Login failed:', err);
        },
      }),
      map(() => true),
      catchError(() => of(false))
    );
  }

  logout() {
    localStorage.clear();
  }
  
}
