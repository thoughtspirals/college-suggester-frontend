import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

@Injectable({ providedIn: 'root' })
export class CollegeService {
  private apiUrl = 'http://127.0.0.1:8000/recommend';

  constructor(private http: HttpClient) {}

  getSuggestions(params: {
    rank: number;
    caste: string;
    gender: string;
    seat_type: string;
    special_reservation?: string;
    limit?: number;
  }): Observable<CollegeSuggestion[]> {
    let httpParams = new HttpParams()
      .set('rank', params.rank)
      .set('caste', params.caste)
      .set('gender', params.gender)
      .set('seat_type', params.seat_type);

    if (params.special_reservation) {
      httpParams = httpParams.set(
        'special_reservation',
        params.special_reservation
      );
    }

    if (params.limit) {
      httpParams = httpParams.set('limit', params.limit);
    }

    return this.http.get<CollegeSuggestion[]>(this.apiUrl, {
      params: httpParams,
    });
  }
}
