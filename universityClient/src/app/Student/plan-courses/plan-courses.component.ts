import { ReportsService } from './../_studentServices/reports.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plan-courses',
  templateUrl: './plan-courses.component.html',
  styleUrls: ['./plan-courses.component.css'],
})
export class PlanCoursesComponent implements OnInit {
  planCourses: any[] = [];
  remainingHours = 0;
  completedHours = 0;

  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {
    this.getPlanCourses();
  }

  getPlanCourses() {
    this.reportsService.getPlanCourses().subscribe((res) => {
      this.planCourses = res;
      this.calculatHours();
    });
  }

  calculatHours() {
    this.planCourses.forEach((course) => {
      if (course.courseStatus == '') {
        this.remainingHours += course.courseHours;
      } else {
        this.completedHours += course.courseHours;
      }
    });
  }
}
