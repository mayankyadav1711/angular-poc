// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly storageKey = 'isAuthenticated';
  private isAuthenticated: boolean;

  constructor() {
    this.isAuthenticated = this.getAuthStateFromStorage();
  }

  private getAuthStateFromStorage(): boolean {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(this.storageKey) === 'true';
    }
    return false; // Default to false if localStorage is not available
  }

  private setAuthStateToStorage(value: boolean): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.storageKey, value.toString());
    }
  }

  login() {
    this.isAuthenticated = true;
    this.setAuthStateToStorage(true);
  }

  logout() {
    this.isAuthenticated = false;
    this.setAuthStateToStorage(false);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
