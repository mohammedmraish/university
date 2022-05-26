import { StudentsParams } from './../../_adminModels/studentsParams';
import { StudentsService } from '../../_adminServices/students.service';
import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/_models/pagination';
import { option } from 'src/app/_models/option';
import { FacultiesService } from '../../_adminServices/faculties.service';
import { MajorsService } from '../../_adminServices/majors.service';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css'],
})
export class AllStudentsComponent implements OnInit {
  students: any[];
  pagination: Pagination;
  params: StudentsParams = new StudentsParams();
  faculties: option[] = [];
  facultyMajors: option[] = [];
  searchBtn = 'Search';

  constructor(
    private studentsService: StudentsService,
    private facultiesService: FacultiesService,
    private majorsService: MajorsService
  ) {}

  ngOnInit(): void {
    this.loadStudents();
    this.getFaculties();
  }

  loadStudents() {
    this.studentsService.getAllStudents(this.params).subscribe((res) => {
      this.students = res.result;
      this.pagination = res.pagination;
    });
  }

  pageChanged(event: any) {
    this.params.pageNumber = event.page;
    this.loadStudents();
  }

  getFaculties() {
    this.facultiesService.getFaculties().subscribe((faculties) => {
      faculties.forEach((faculty) => {
        this.faculties.push(new option(faculty.facultyId, faculty.facultyName));
      });
    });
  }

  onSelectFacultyChange(event) {
    if (event.target.value) {
      this.getFacultyMajors(event.target.value);
    } else {
      this.facultyMajors = [];
    }
    this.params.majorId = null;
    this.params.facultyId = event.target.value;
    this.loadStudents();
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
    this.params.majorId = event.target.value;
    this.loadStudents();
  }

  onSearchSubmit() {
    if (this.searchBtn == 'Search') {
      this.loadStudents();
      this.searchBtn = 'Clear';
    } else {
      this.params.name = null;
      this.searchBtn = 'Search';
      this.loadStudents();
    }
  }
}
