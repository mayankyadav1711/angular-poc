import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verifyotp',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './verifyotp.component.html',
  styleUrls: ['./verifyotp.component.css']
})
export class VerifyotpComponent {
  otpForm: FormGroup;
  showError = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });
  }

  onSubmit(): void {
    if (this.otpForm.valid) {
      // Proceed to verify OTP
      console.log('OTP submitted:', this.otpForm.value);
    this.router.navigate(['/reset-password']);
    } else {
      this.showError = true;
      this.errorMessage = 'Please enter a valid 6-digit OTP.';
    }
  }
}