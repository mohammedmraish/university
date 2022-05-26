import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { PaginatedResult } from 'src/app/_models/pagination';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private baseUrl = 'https://localhost:7139/api/';
  paginatedResult: PaginatedResult<any[]> = new PaginatedResult<any[]>();

  constructor(private http: HttpClient) {}

  addCourse(course) {
    return this.http.post(this.baseUrl + 'courses/addCourse', course);
  }

  getMajorCourses(majorId) {
    return this.http.get<any[]>(
      this.baseUrl + 'courses/majorCourses/' + majorId
    );
  }

  getCoursesList(page?: number, itemsPerPage?: number, facultyId?: number) {
    let params = this.getPaginationHeaders(page, itemsPerPage, facultyId);
    return this.http
      .get<any[]>(this.baseUrl + 'courses/getCoursesList', {
        observe: 'response',
        params,
      })
      .pipe(
        map((res) => {
          this.paginatedResult.result = res.body;
          if (res.headers.get('Pagination') != null) {
            this.paginatedResult.pagination = JSON.parse(
              res.headers.get('Pagination')
            );
          }
          return this.paginatedResult;
        })
      );
  }

  private getPaginationHeaders(
    page?: number,
    itemsPerPage?: number,
    majorId?: number
  ) {
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }
    if (majorId != null) params = params.append('majorId', majorId.toString());

    return params;
  }
}
