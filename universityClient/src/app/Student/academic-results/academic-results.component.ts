import { toPublicName } from '@angular/compiler/src/i18n/serializers/xmb';
import { Component, OnInit } from '@angular/core';
import { option } from 'src/app/_models/option';
import { ReportsService } from '../_studentServices/reports.service';

@Component({
  selector: 'app-academic-results',
  templateUrl: './academic-results.component.html',
  styleUrls: ['./academic-results.component.css'],
})
export class AcademicResultsComponent implements OnInit {
  Allcourses: any[] = [];
  courses: any[] = [];
  years: any[] = [];
  semesters = [
    { id: 0, name: 'First' },
    { id: 1, name: 'Second' },
    { id: 2, name: 'Summer' },
  ];
  GPA = 0.0;
  totalHours = 0;
  year = '';
  semester = '';
  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {
    this.getcourses();
  }

  getcourses() {
    this.reportsService.getAcademacResults().subscribe((res) => {
      this.courses = this.Allcourses = res;
      this.calculateGPA();
      this.getYears();
    });
  }

  calculateGPA() {
    this.GPA = 0;
    this.totalHours = 0.0;
    this.courses.forEach((course) => {
      this.GPA += course.courseGrade * course.courseHours;
      this.totalHours += course.courseHours;
    });

    this.GPA = this.GPA / this.totalHours;
  }

  getYears() {
    let mySet = new Set();
    this.Allcourses.forEach((course) => {
      mySet.add(course.courseYear.substring(0, 4));
    });
    let index = 0;
    mySet.forEach((year) => {
      this.years.push(new option(index++, year));
      console.log(new option(index, year));
    });
  }

  onSelectSemesterChange(event) {
    if (event.target.value) {
      this.semester = this.semesters[event.target.value].name;
    } else {
      this.semester = '';
    }
    this.filterCourses();
  }

  onSelectYearChange(event) {
    if (event.target.value) {
      this.year = this.years[event.target.value].name;
    } else {
      this.year = '';
    }

    this.filterCourses();
  }

  filterCourses() {
    const matching = this.year + '/' + this.semester;
    function isMatch(element) {
      let el = element.courseYear;
      for (let t = 0; t < Math.min(el.length, matching.length); t++) {
        if (el[t] != matching[t]) return false;
      }
      return true;
    }

    if (matching[0] != '/') this.courses = this.Allcourses.filter(isMatch);
    else this.courses = this.Allcourses;
    this.calculateGPA();
  }
}
