import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FacultiesService {
  private baseUrl = 'https://localhost:7139/api/';

  constructor(private http: HttpClient) {}

  addNewFaculty(faculty) {
    return this.http.post(this.baseUrl + 'faculty/addFaculty', faculty);
  }

  getFaculties() {
    return this.http.get<any[]>(this.baseUrl + 'faculty/getFaculties');
  }

  getFacultyTeachers(facultyId) {
    return this.http.get<any[]>(
      this.baseUrl + 'faculty/getFacultyTeachers/' + facultyId
    );
  }

  getFacultiesList() {
    return this.http.get<any[]>(this.baseUrl + 'faculty/getFacultiesList');
  }
}
