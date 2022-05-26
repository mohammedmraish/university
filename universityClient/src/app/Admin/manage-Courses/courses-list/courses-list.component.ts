import { MajorsService } from './../../_adminServices/majors.service';
import { FacultiesService } from './../../_adminServices/faculties.service';
import { CourseService } from './../../_adminServices/course.service';
import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/_models/pagination';
import { option } from 'src/app/_models/option';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
})
export class CoursesListComponent implements OnInit {
  courses: any[];
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 10;
  faculties: option[] = [];
  facultyMajors: option[] = [];
  majorId: number;

  constructor(
    private courseService: CourseService,
    private facultiesService: FacultiesService,
    private majorsService: MajorsService
  ) {}

  ngOnInit(): void {
    this.loadCoursesList();
    this.getFaculties();
  }

  loadCoursesList() {
    this.courseService
      .getCoursesList(this.pageNumber, this.pageSize, this.majorId)
      .subscribe((res) => {
        this.courses = res.result;
        this.pagination = res.pagination;
      });
  }

  getFaculties() {
    this.facultiesService.getFaculties().subscribe((faculties) => {
      faculties.forEach((faculty) => {
        this.faculties.push(new option(faculty.facultyId, faculty.facultyName));
      });
    });
  }

  onSelectFacultyChange(event) {
    if (event.target.value) this.getFacultyMajors(event.target.value);
    else {
      this.facultyMajors = [];
    }
    this.majorId = null;
    this.loadCoursesList();
  }

  getFacultyMajors(facultyId) {
    this.majorsService
      .getFacultyMajors(facultyId)
      .subscribe((facultyMajors) => {
        this.facultyMajors = [];
        facultyMajors.forEach((major) => {
          this.facultyMajors.push(new option(major.majorId, major.majorName));
        });
      });
  }

  onSelectMajorChange(event) {
    this.majorId = event.target.value;
    this.loadCoursesList();
  }
}
