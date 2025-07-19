import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {
  name = '';
  email = '';
  phone = '';
  password = '';
  confirmPassword = '';

  constructor(private router: Router) {}

  onRegister(): void {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Simulate success
    console.log('User registered:', {
      name: this.name,
      email: this.email,
      password: this.password,
      phone: this.phone,
    });

    this.router.navigate(['/login']);
  }
}
