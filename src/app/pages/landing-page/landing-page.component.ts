import { Component } from '@angular/core';
import { HeroSectionComponent } from '../../components/landing-components/hero-section/hero-section.component';
import { FeaturesSectionComponent } from '../../components/landing-components/features-section/features-section.component';
import { InputFormSectionComponent } from '../../components/landing-components/input-form-section/input-form-section.component';
import { ResultsPreviewSectionComponent } from '../../components/landing-components/results-preview-section/results-preview-section.component';
import { CommonModule } from '@angular/common';

import {
  CollegeService,
  CollegeSuggestion,
} from '../../services/services/college.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    HeroSectionComponent,
    FeaturesSectionComponent,
    InputFormSectionComponent,
    ResultsPreviewSectionComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  suggestions: CollegeSuggestion[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(private collegeService: CollegeService) {}

  onFormSubmit(data: any): void {
    this.loading = true;
    this.error = null;

    this.collegeService.getSuggestions(data).subscribe({
      next: (res) => {
        this.suggestions = res;
        this.loading = false;
      },
      error: (err) => {
        // The error message from the service will now include 'Login required' for 401/403 errors
        this.error = err?.message || err?.error?.detail || 'Something went wrong';
        this.loading = false;
        this.suggestions = [];
      },
    });
  }
}
