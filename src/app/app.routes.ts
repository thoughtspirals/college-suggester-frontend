import { Routes } from '@angular/router';
import { ExplorePageComponent } from './pages/explore-colleges-page/explore-colleges-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'explore', component: ExplorePageComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
];
