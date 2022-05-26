import { ReportsService } from '../_studentServices/reports.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-schedule',
  templateUrl: './course-schedule.component.html',
  styleUrls: ['./course-schedule.component.css'],
})
export class CourseScheduleComponent implements OnInit {
  years: any[] = [];
  schedule: any[] = [];

  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {
    this.getCourseSchedule();
  }

  getCourseSchedule() {
    this.reportsService.getSchedule().subscribe((res) => {
      this.schedule = res;
    });
  }
}
