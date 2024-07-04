// src/app/login/login.component.ts

import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { countries } from '../countries';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  countries = countries;
  showError = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {
    this.loginForm = this.fb.group({
      country: ['', Validators.required],
      emailOrPhone: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(\+?\d{1,4}[\s-])?((\d{10})|(\d{7,10})|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}))$/
          ),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  isDropdownOpen = false;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectCountry(countryName: string): void {
    this.loginForm.get('country')?.setValue(countryName);
    this.isDropdownOpen = false;
  }

  getSelectedFlag(): string {
    const selectedCountry = this.countries.find(
      (country) => country.name === this.loginForm.get('country')?.value
    );
    return selectedCountry ? selectedCountry.flag : '';
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      // Simulating a login API call
      console.log('Logging Data:', this.loginForm.value);
      setTimeout(() => {
        this.authService.login();
        this.toastService.showToast('Login successful');
        this.router.navigate(['/dashboard']);
      }, 1000);
    } else {
      this.showError = true;
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }
}
