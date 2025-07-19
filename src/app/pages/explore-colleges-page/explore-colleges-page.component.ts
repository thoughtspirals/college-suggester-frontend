import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FilterPanelComponent } from '../../components/filter-panel/filter-panel.component';
import { CollegeTableComponent } from '../../components/colleges-table/colleges-table.component';

@Component({
  selector: 'app-explore-page',
  standalone: true,
  imports: [FilterPanelComponent, CollegeTableComponent],
  templateUrl: './explore-colleges-page.component.html',
  styleUrls: ['./explore-colleges-page.component.scss'],
})
export class ExplorePageComponent {
  filteredColleges: any[] = [];

  constructor(private http: HttpClient) {}

  fetchFilteredColleges(filters: any) {
    const url = 'http://127.0.0.1:8000/college-details';

    let params = new HttpParams()
      .set('rank', filters.rank)
      .set('caste', filters.caste)
      .set('gender', filters.gender)
      .set('seat_type', filters.seat_type);

    if (filters.special_reservation) {
      params = params.set('special_reservation', filters.special_reservation);
    }

    if (filters.branch) {
      params = params.set('branch', filters.branch);
    }

    if (filters.college_name) {
      params = params.set('college_name', filters.college_name);
    }

    this.http.get<any[]>(url, { params }).subscribe({
      next: (data) => {
        this.filteredColleges = data;
      },
      error: (err) => {
        console.error('Failed to fetch filtered colleges', err);
        this.filteredColleges = [];
      },
    });
  }
}
