import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SelfRegistrationService {
  private baseUrl = 'https://localhost:7139/api/';

  constructor(private http: HttpClient) {}

  getSchedule() {
    return this.http.get<any[]>(this.baseUrl + 'selfRegistration/schedule');
  }

  getStudentCourses() {
    return this.http.get(this.baseUrl + 'selfRegistration/studentCourses');
  }

  getCourseSections(courseName) {
    return this.http.get(
      this.baseUrl + 'selfRegistration/courseSections/' + courseName
    );
  }

  addCourseSection(sectionId) {
    return this.http.post(
      this.baseUrl + 'selfRegistration/addCourse/' + sectionId,
      {}
    );
  }

  deleteCourse(sectionId) {
    return this.http.delete(
      this.baseUrl + 'selfRegistration/deleteCourse/' + sectionId
    );
  }
}
