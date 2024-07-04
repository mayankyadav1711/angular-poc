import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent {
  resetForm: FormGroup;
  showError = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.resetForm = this.fb.group({
      emailOrPhone: ['', [Validators.required, Validators.pattern(/^(\+?\d{1,4}[\s-])?((\d{10})|(\d{7,10})|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}))$/)]]
    });
  }

  onSubmit(): void {
    if (this.resetForm.valid) {
      // Proceed to send OTP or handle email/phone input
      console.log('Form submitted:', this.resetForm.value);
      this.router.navigate(['/verify-otp']);
      // Here you would typically call a service to handle the password reset
    } else {
      this.showError = true;
      this.errorMessage = 'Please enter a valid email or phone number.';
    }
  }
}