import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../common-components/pagination/pagination.component';

@Component({
  selector: 'app-college-table',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './colleges-table.component.html',
  styleUrls: ['./colleges-table.component.scss'],
})
export class CollegeTableComponent implements OnChanges {
  @Input() colleges: any[] = [];

  paginatedColleges: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['colleges']) {
      this.currentPage = 1;
      this.updatePaginatedColleges();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.colleges.length / this.itemsPerPage);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePaginatedColleges();
  }

  private updatePaginatedColleges() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedColleges = this.colleges.slice(start, end);
  }
}
