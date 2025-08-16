import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../auth.service';

export interface CollegeSuggestion {
  college: string;
  branch: string;
  category: string;
  rank: number;
  percent: number;
  gender: string;
  level: string;
  year: number;
  stage: string;
}

export interface CollegeStatistics {
  total_colleges: number;
  total_branches: number;
  colleges_in_rank_range: number;
  branches_available: number;
}

export interface SuggestionRequest {
  rank: number;
  caste: string;
  gender: string;
  seat_type: string;
  special_reservation?: string;
}

@Injectable({ providedIn: 'root' })
export class CollegeService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    return this.authService.getAuthHeaders();
  }

  private handleError(error: any) {
    console.error('College service error:', error);
    let errorMessage = 'An unknown error occurred';
    
    // Handle specific error cases
    if (error.status === 401 || error.status === 403) {
      errorMessage = 'Login required';
    } else if (error.error?.detail) {
      errorMessage = error.error.detail;
    } else if (error.message) {
      errorMessage = error.message;
    }

    return throwError(() => new Error(errorMessage));
  }

  // Get college recommendations (requires authentication)
  getSuggestions(params: {
    rank: number;
    caste: string;
    gender: string;
    seat_type: string;
    special_reservation?: string | null;
    limit?: number;
  }): Observable<CollegeSuggestion[]> {
    let httpParams = new HttpParams()
      .set('rank', params.rank.toString())
      .set('caste', params.caste)
      .set('gender', params.gender)
      .set('seat_type', params.seat_type);

    if (params.special_reservation !== undefined) {
      httpParams = httpParams.set('special_reservation', params.special_reservation || '');
    }

    if (params.limit) {
      httpParams = httpParams.set('limit', params.limit.toString());
    }

    return this.http.get<CollegeSuggestion[]>(`${this.apiUrl}/api/v1/recommend`, {
      params: httpParams,
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Get detailed college information (requires authentication)
  getCollegeDetails(params: {
    rank: number;
    caste: string;
    gender: string;
    seat_type: string;
    special_reservation?: string | null;
    college_name?: string;
    branch?: string;
    limit?: number;
  }): Observable<CollegeSuggestion[]> {
    let httpParams = new HttpParams()
      .set('rank', params.rank.toString())
      .set('caste', params.caste)
      .set('gender', params.gender)
      .set('seat_type', params.seat_type);

    if (params.special_reservation !== undefined) {
      httpParams = httpParams.set('special_reservation', params.special_reservation || '');
    }
    if (params.college_name) {
      httpParams = httpParams.set('college_name', params.college_name);
    }
    if (params.branch) {
      httpParams = httpParams.set('branch', params.branch);
    }
    if (params.limit) {
      httpParams = httpParams.set('limit', params.limit.toString());
    }

    return this.http.get<CollegeSuggestion[]>(`${this.apiUrl}/api/v1/college-details`, {
      params: httpParams,
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Get college statistics (requires authentication)
  getCollegeStatistics(params: {
    rank: number;
    caste: string;
    gender: string;
    seat_type: string;
  }): Observable<CollegeStatistics> {
    const httpParams = new HttpParams()
      .set('rank', params.rank.toString())
      .set('caste', params.caste)
      .set('gender', params.gender)
      .set('seat_type', params.seat_type);

    return this.http.get<CollegeStatistics>(`${this.apiUrl}/api/v1/college-statistics`, {
      params: httpParams,
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  // POST method for college suggestions (requires authentication)
  suggestColleges(request: SuggestionRequest): Observable<CollegeSuggestion[]> {
    return this.http.post<CollegeSuggestion[]>(`${this.apiUrl}/api/v1/suggest-colleges`, request, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Get available regions (public endpoint)
  getAvailableRegions(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/api/v1/available-regions`).pipe(
      catchError(this.handleError)
    );
  }

  // Get available branches (public endpoint)
  getAvailableBranches(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/api/v1/available-branches`).pipe(
      catchError(this.handleError)
    );
  }

  // Get branch mappings for debugging (requires authentication)
  getBranchMappings(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/v1/branch-mappings`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Get available regions (requires authentication)
  getAvailableRegionsAuth(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/api/v1/available-regions`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Get available branches (requires authentication)
  getAvailableBranchesAuth(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/api/v1/available-branches`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }
}
