import { HomeService } from './../_studentServices/homeService.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  studentData;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getUserData().subscribe((res) => {
      this.studentData = res;
      console.log(this.studentData);
    });
  }
}
