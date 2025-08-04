import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private router: Router) {} // Inject Router
  isAuthenticated = false; // Simulates whether user is logged in

  onLogin(): void {
    console.log('Navigating to /login');
    this.router.navigate(['/login']);
  }

  onLogout() {
    this.isAuthenticated = false;
    console.log('User logged out');
  }
}
