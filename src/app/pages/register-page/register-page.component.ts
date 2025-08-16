import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService, RegisterRequest } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-register-page',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {
  full_name = '';
  email = '';
  phone = '';
  password = '';
  confirmPassword = '';
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  onRegister(): void {
    console.log('onRegister() called');
    console.log('Form values:', {
      full_name: this.full_name,
      email: this.email,
      phone: this.phone,
      password: this.password,
      confirmPassword: this.confirmPassword
    });
    
    // Reset messages
    this.errorMessage = '';
    this.successMessage = '';

    // Basic validation
    if (!this.full_name || !this.email || !this.password) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    if (this.password.length < 8) {
      this.errorMessage = 'Password must be at least 8 characters long.';
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    // Phone validation (optional but if provided should be valid)
    if (this.phone && this.phone.length < 10) {
      this.errorMessage = 'Phone number must be at least 10 digits.';
      return;
    }

    this.loading = true;
    
    const registerRequest: RegisterRequest = {
      full_name: this.full_name,
      email: this.email,
      password: this.password,
      phone: this.phone || undefined
    };

    this.authService.register(registerRequest).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.loading = false;
        
        // Show success toast
        this.toastService.showSuccess(
          'Registration Successful!', 
          'Your account has been created successfully. You will be redirected to login.',
          true,
          3000
        );
        
        // Navigate to login immediately
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (error) => {
        console.error('Registration error:', error);
        this.loading = false;
        
        // Show error toast
        this.toastService.showError(
          'Registration Failed',
          error.message || 'Registration failed. Please try again.'
        );
        
        this.errorMessage = error.message || 'Registration failed. Please try again.';
      }
    });
  }
}
