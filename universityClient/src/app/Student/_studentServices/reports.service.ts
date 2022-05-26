import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private baseUrl = 'https://localhost:7139/api/';

  constructor(private http: HttpClient) {}

  getSchedule() {
    return this.http.get<any[]>(this.baseUrl + 'reports/schedule');
  }

  getPlanCourses() {
    return this.http.get<any[]>(this.baseUrl + 'reports/planCourses');
  }

  getAcademacResults() {
    return this.http.get<any[]>(this.baseUrl + 'reports/academicResults');
  }

  getRemainingCourses() {
    return this.http.get<any[]>(this.baseUrl + 'reports/remainingCourses');
  }
}
