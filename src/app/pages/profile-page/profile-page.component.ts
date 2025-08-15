import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService, UserResponse, PasswordChangeRequest } from '../../services/auth.service';
import { UserService, UserUpdate } from '../../services/user.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  currentUser: UserResponse | null = null;
  profileForm: FormGroup;
  passwordForm: FormGroup;
  
  loading = false;
  updating = false;
  changingPassword = false;
  
  message = '';
  error = '';
  passwordMessage = '';
  passwordError = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.profileForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      full_name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['']
    });

    this.passwordForm = this.fb.group({
      current_password: ['', [Validators.required]],
      new_password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('new_password');
    const confirmPassword = form.get('confirm_password');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else if (confirmPassword?.hasError('passwordMismatch')) {
      confirmPassword.setErrors(null);
    }
    
    return null;
  }

  loadUserProfile(): void {
    this.loading = true;
    this.error = '';

    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.profileForm.patchValue({
          email: user.email,
          full_name: user.full_name,
          phone: user.phone || ''
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to load user profile:', error);
        this.error = error.message || 'Failed to load profile';
        this.loading = false;
      }
    });
  }

  onUpdateProfile(): void {
    if (this.profileForm.valid && this.currentUser) {
      this.updating = true;
      this.message = '';
      this.error = '';

      const updateData: UserUpdate = {
        email: this.profileForm.value.email,
        full_name: this.profileForm.value.full_name,
        phone: this.profileForm.value.phone || undefined
      };

      this.userService.updateUser(this.currentUser.id, updateData).subscribe({
        next: (updatedUser) => {
          this.currentUser = updatedUser;
          this.message = 'Profile updated successfully!';
          this.updating = false;

          // Clear message after 3 seconds
          setTimeout(() => this.message = '', 3000);
        },
        error: (error) => {
          console.error('Failed to update profile:', error);
          this.error = error.message || 'Failed to update profile';
          this.updating = false;
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.profileForm.controls).forEach(key => {
        this.profileForm.get(key)?.markAsTouched();
      });
    }
  }

  onChangePassword(): void {
    if (this.passwordForm.valid) {
      this.changingPassword = true;
      this.passwordMessage = '';
      this.passwordError = '';

      const passwordChangeRequest: PasswordChangeRequest = {
        current_password: this.passwordForm.value.current_password,
        new_password: this.passwordForm.value.new_password
      };

      this.authService.changePassword(passwordChangeRequest).subscribe({
        next: (response) => {
          this.passwordMessage = 'Password changed successfully!';
          this.passwordForm.reset();
          this.changingPassword = false;

          // Clear message after 3 seconds
          setTimeout(() => this.passwordMessage = '', 3000);
        },
        error: (error) => {
          console.error('Failed to change password:', error);
          this.passwordError = error.message || 'Failed to change password';
          this.changingPassword = false;
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.passwordForm.controls).forEach(key => {
        this.passwordForm.get(key)?.markAsTouched();
      });
    }
  }

  // Getters for template
  get email() { return this.profileForm.get('email'); }
  get full_name() { return this.profileForm.get('full_name'); }
  get phone() { return this.profileForm.get('phone'); }

  get current_password() { return this.passwordForm.get('current_password'); }
  get new_password() { return this.passwordForm.get('new_password'); }
  get confirm_password() { return this.passwordForm.get('confirm_password'); }
}
