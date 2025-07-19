import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Import Router
import { CollegeSuggestion } from '../../../services/services/college.service';

@Component({
  selector: 'app-results-preview-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results-preview-section.component.html',
  styleUrls: ['./results-preview-section.component.scss'],
})
export class ResultsPreviewSectionComponent {
  @Input() suggestions: CollegeSuggestion[] = [];

  currentPage: number = 1;
  rowsPerPage: number = 10;

  constructor(private router: Router) {} //  Inject Router

  get totalPages(): number {
    return Math.ceil(this.suggestions.length / this.rowsPerPage);
  }

  get paginatedSuggestions(): CollegeSuggestion[] {
    const start = (this.currentPage - 1) * this.rowsPerPage;
    return this.suggestions.slice(start, start + this.rowsPerPage);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  prevPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  goToExplore(): void {
    this.router.navigate(['/explore']); //  Navigate to /explore
  }
}
