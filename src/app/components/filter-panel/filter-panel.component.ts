import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, NgSelectModule],
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss'],
})
export class FilterPanelComponent implements OnInit {
  @Output() filtersChanged = new EventEmitter<any>();

  form = {
    rank: null,
    caste: '',
    gender: '',
    seat_type: '',
    special_reservation: '',
    branch: '',
  };

  branches: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadBranches();
  }

  loadBranches(): void {
    this.http
      .get<string[]>('http://127.0.0.1:8000/api/v1/available-branches')
      .subscribe({
        next: (data) => {
          console.log('Branches data:', data); // Debug log
          this.branches = data;
        },
        error: (err) => console.error('Failed to load branches', err),
      });
  }

  applyFilters(f: NgForm) {
    if (f.invalid) return;
    this.filtersChanged.emit(this.form);
  }
}
