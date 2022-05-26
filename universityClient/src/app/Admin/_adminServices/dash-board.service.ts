import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashBoardService {
  private baseUrl = 'https://localhost:7139/api/';

  constructor(private http: HttpClient) {}

  getCardNumbersData() {
    return this.http.get<any[]>(this.baseUrl + 'dashBoard/getCardNumbers');
  }

  getFacultiesStudents() {
    return this.http.get<any[]>(
      this.baseUrl + 'dashBoard/getFacultiesStudents'
    );
  }
}
