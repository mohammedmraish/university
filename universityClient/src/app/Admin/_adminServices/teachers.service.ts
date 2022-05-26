import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { PaginatedResult } from 'src/app/_models/pagination';

@Injectable({
  providedIn: 'root',
})
export class TeachersService {
  private baseUrl = 'https://localhost:7139/api/';
  paginatedResult: PaginatedResult<any[]> = new PaginatedResult<any[]>();

  constructor(private http: HttpClient) {}

  registerTeacher(model) {
    return this.http.post(this.baseUrl + 'teachers/register', model);
  }

  getAllTeachers(page?: number, itemsPerPage?: number, facultyId?: number) {
    let params = this.getPaginationHeaders(page, itemsPerPage, facultyId);

    return this.http
      .get<any[]>(this.baseUrl + 'teachers/getTeachers', {
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
    facultyId?: number
  ) {
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }
    if (facultyId != null)
      params = params.append('facultyId', facultyId.toString());

    return params;
  }
}
