import { SectionsParams } from './../_adminModels/sectionsParams';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { PaginatedResult } from 'src/app/_models/pagination';

@Injectable({
  providedIn: 'root',
})
export class SectionsService {
  private baseUrl = 'https://localhost:7139/api/';
  paginatedResult: PaginatedResult<any[]> = new PaginatedResult<any[]>();

  constructor(private http: HttpClient) {}

  addSection(section) {
    return this.http.post(this.baseUrl + 'Sections/AddSection', section);
  }

  getSectionsList(sectionsparams: SectionsParams) {
    let params = this.getParams(sectionsparams);

    return this.http
      .get<any[]>(this.baseUrl + 'sections/getSectionsList', {
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

  getTimeSlots(day: string) {
    return this.http.get<any[]>(this.baseUrl + 'sections/getTimeSlots/' + day);
  }

  private getParams(params: SectionsParams) {
    let par = new HttpParams();
    if (params.pageNumber != null && params.pageSize != null) {
      par = par.append('pageNumber', params.pageNumber.toString());
      par = par.append('pageSize', params.pageSize.toString());
    }
    if (params.CourseId)
      par = par.append('courseId', params.CourseId.toString());
    if (params.MajorId) par = par.append('majorId', params.MajorId.toString());
    if (params.FacultyId)
      par = par.append('facultyId', params.FacultyId.toString());
    if (params.TeacherId)
      par = par.append('teacherId', params.TeacherId.toString());

    return par;
  }
}
