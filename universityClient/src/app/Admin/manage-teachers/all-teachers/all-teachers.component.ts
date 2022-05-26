import { Component, OnInit } from '@angular/core';
import { option } from 'src/app/_models/option';
import { Pagination } from 'src/app/_models/pagination';
import { FacultiesService } from '../../_adminServices/faculties.service';
import { TeachersService } from '../../_adminServices/teachers.service';

@Component({
  selector: 'app-all-teachers',
  templateUrl: './all-teachers.component.html',
  styleUrls: ['./all-teachers.component.css'],
})
export class AllTeachersComponent implements OnInit {
  Teachers: any[];
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 12;
  faculties: option[] = [];
  facultyId: number;

  constructor(
    private teacherService: TeachersService,
    private facultiesService: FacultiesService
  ) {}

  ngOnInit(): void {
    this.loadTeachers();
    this.getFaculties();
  }

  loadTeachers() {
    this.teacherService
      .getAllTeachers(this.pageNumber, this.pageSize, this.facultyId)
      .subscribe((res) => {
        console.log(res);
        this.Teachers = res.result;
        this.pagination = res.pagination;
      });
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadTeachers();
  }

  getFaculties() {
    this.facultiesService.getFaculties().subscribe((faculties) => {
      faculties.forEach((faculty) => {
        this.faculties.push(new option(faculty.facultyId, faculty.facultyName));
      });
    });
  }

  onSelectFacultyChange(event) {
    this.facultyId = event.target.value;
    this.loadTeachers();
  }
}
