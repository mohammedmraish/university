import { StudentsParams } from './../_adminModels/studentsParams';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { PaginatedResult } from 'src/app/_models/pagination';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private baseUrl = 'https://localhost:7139/api/';
  paginatedResult: PaginatedResult<any[]> = new PaginatedResult<any[]>();

  constructor(private http: HttpClient) {}

  registerStudent(model) {
    return this.http.post(this.baseUrl + 'students/register', model);
  }

  getAllStudents(studentsparams: StudentsParams) {
    let params = this.getParams(studentsparams);

    return this.http
      .get<any[]>(this.baseUrl + 'students/getStudents', {
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

  private getParams(params: StudentsParams) {
    let par = new HttpParams();

    if (params.pageNumber != null && params.pageSize != null) {
      par = par.append('pageSize', params.pageSize.toString());
      par = par.append('pageNumber', params.pageNumber.toString());
    }
    if (params.facultyId)
      par = par.append('facultyId', params.facultyId.toString());
    if (params.majorId) par = par.append('majorId', params.majorId.toString());
    if (params.name) par = par.append('name', params.name.toString());

    return par;
  }
}
