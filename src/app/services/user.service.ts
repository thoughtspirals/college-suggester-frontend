import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService, UserResponse } from './auth.service';

export interface UserUpdate {
  email?: string;
  phone?: string;
  full_name?: string;
  is_active?: boolean;
  is_verified?: boolean;
}

export interface RoleResponse {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
  permissions: string[];
}

export interface RoleCreate {
  name: string;
  description: string;
}

export interface PermissionResponse {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export interface UserRoleAssignment {
  user_id: number;
  role_id: number;
}

export interface RolePermissionAssignment {
  role_id: number;
  permission_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private handleError(error: any) {
    console.error('User service error:', error);
    let errorMessage = 'An unknown error occurred';
    
    if (error.error?.detail) {
      errorMessage = error.error.detail;
    } else if (error.message) {
      errorMessage = error.message;
    }

    return throwError(() => new Error(errorMessage));
  }

  // User Management
  getUsers(skip: number = 0, limit: number = 100, activeOnly: boolean = true): Observable<UserResponse[]> {
    const params = new HttpParams()
      .set('skip', skip.toString())
      .set('limit', limit.toString())
      .set('active_only', activeOnly.toString());

    return this.http.get<UserResponse[]>(`${this.apiUrl}/users`, {
      params,
      headers: this.authService.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  getUser(userId: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/users/${userId}`, {
      headers: this.authService.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(userId: number, userUpdate: UserUpdate): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${this.apiUrl}/users/${userId}`, userUpdate, {
      headers: this.authService.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`, {
      headers: this.authService.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Admin - Role Management
  getRoles(skip: number = 0, limit: number = 100, activeOnly: boolean = true): Observable<RoleResponse[]> {
    const params = new HttpParams()
      .set('skip', skip.toString())
      .set('limit', limit.toString())
      .set('active_only', activeOnly.toString());

    return this.http.get<RoleResponse[]>(`${this.apiUrl}/admin/roles`, {
      params,
      headers: this.authService.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  createRole(role: RoleCreate): Observable<RoleResponse> {
    return this.http.post<RoleResponse>(`${this.apiUrl}/admin/roles`, role, {
      headers: this.authService.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Admin - Permission Management
  getPermissions(skip: number = 0, limit: number = 100): Observable<PermissionResponse[]> {
    const params = new HttpParams()
      .set('skip', skip.toString())
      .set('limit', limit.toString());

    return this.http.get<PermissionResponse[]>(`${this.apiUrl}/admin/permissions`, {
      params,
      headers: this.authService.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Admin - Assignments
  assignRoleToUser(assignment: UserRoleAssignment): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/assign-role`, assignment, {
      headers: this.authService.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  assignPermissionToRole(assignment: RolePermissionAssignment): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin/assign-permission`, assignment, {
      headers: this.authService.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  getUserPermissions(userId: number): Observable<{user_id: number, permissions: string[]}> {
    return this.http.get<{user_id: number, permissions: string[]}>(`${this.apiUrl}/admin/user/${userId}/permissions`, {
      headers: this.authService.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }
}
