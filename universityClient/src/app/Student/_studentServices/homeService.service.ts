import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private baseUrl = 'https://localhost:7139/api/';
  private userId = JSON.parse(localStorage.getItem('user')).userId;

  constructor(private http: HttpClient) {}

  getUserData() {
    return this.http.get(this.baseUrl + 'home/getStudentData/' + this.userId);
  }
}
