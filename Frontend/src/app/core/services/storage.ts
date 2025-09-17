import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Storage {
  // Save item
  setItem(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

  // Get item
  getItem(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  // Remove item
  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  // Clear all session storage
  clear(): void {
    sessionStorage.clear();
  }

  // Set token
  setToken(token: string): void {
    this.setItem('token', token);
  }

  // Get token
  getToken(): string | null {
    return this.getItem('token');
  }

  // Set role
  setRole(role: string): void {
    this.setItem('role', role);
  }

  // Get role
  getRole(): string | null {
    return this.getItem('role');
  }
}
