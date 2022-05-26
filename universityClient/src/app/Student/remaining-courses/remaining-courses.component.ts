import { ReportsService } from './../_studentServices/reports.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-remaining-courses',
  templateUrl: './remaining-courses.component.html',
  styleUrls: ['./remaining-courses.component.css'],
})
export class RemainingCoursesComponent implements OnInit {
  remainingCourses: any[] = [];
  remainingHours = 0;

  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {
    this.getRemainingCourses();
  }

  getRemainingCourses() {
    this.reportsService.getRemainingCourses().subscribe((res) => {
      this.remainingCourses = res;
      this.calculateHourse();
    });
  }

  calculateHourse() {
    this.remainingCourses.forEach((element) => {
      this.remainingHours += element.courseHours;
    });
  }
}
