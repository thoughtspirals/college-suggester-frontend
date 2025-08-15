import { Routes } from '@angular/router';
import { ExplorePageComponent } from './pages/explore-colleges-page/explore-colleges-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { authGuard, guestGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { 
    path: 'explore', 
    component: ExplorePageComponent,
    canActivate: [authGuard] // Require authentication to explore colleges
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [authGuard] // Require authentication to access profile
  },
  { path: 'about-us', component: AboutUsComponent },
  { 
    path: 'login', 
    component: LoginPageComponent,
    canActivate: [guestGuard] // Only allow access if not logged in
  },
  { 
    path: 'register', 
    component: RegisterPageComponent,
    canActivate: [guestGuard] // Only allow access if not logged in
  },
  { path: '**', redirectTo: '' } // Wildcard route for 404 cases
];
