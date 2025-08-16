import { Component } from '@angular/core';
import { FilterPanelComponent } from '../../components/filter-panel/filter-panel.component';
import { CollegeTableComponent } from '../../components/colleges-table/colleges-table.component';
import { CollegeService, CollegeSuggestion } from '../../services/services/college.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-explore-page',
  standalone: true,
  imports: [FilterPanelComponent, CollegeTableComponent, CommonModule],
  templateUrl: './explore-colleges-page.component.html',
  styleUrls: ['./explore-colleges-page.component.scss'],
})
export class ExplorePageComponent {
  filteredColleges: CollegeSuggestion[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(private collegeService: CollegeService) {}

  fetchFilteredColleges(filters: any) {
    this.loading = true;
    this.error = null;

    // Use the proper CollegeService method with authentication
    this.collegeService.getCollegeDetails({
      rank: filters.rank,
      caste: filters.caste,
      gender: filters.gender,
      seat_type: filters.seat_type,
      special_reservation: filters.special_reservation,
      branch: filters.branch,
      college_name: filters.college_name,
      limit: filters.limit || 50
    }).subscribe({
      next: (data) => {
        this.filteredColleges = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch filtered colleges', err);
        // The error message from the service will now include 'Login required' for 401/403 errors
        this.error = err.message || 'Failed to fetch colleges';
        this.filteredColleges = [];
        this.loading = false;
      },
    });
  }
}
