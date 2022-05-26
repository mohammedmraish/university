import { FacultiesService } from './../../_adminServices/faculties.service';
import { MajorsService } from './../../_adminServices/majors.service';
import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/_models/pagination';
import { option } from 'src/app/_models/option';

@Component({
  selector: 'app-majors-list',
  templateUrl: './majors-list.component.html',
  styleUrls: ['./majors-list.component.css'],
})
export class MajorsListComponent implements OnInit {
  majors: any[];
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 10;
  faculties: option[] = [];
  facultyId: number;

  constructor(
    private majorsService: MajorsService,
    private facultiesService: FacultiesService
  ) {}

  ngOnInit(): void {
    this.loadMajors();
    this.getFaculties();
  }

  loadMajors() {
    this.majorsService
      .getmajorsList(this.pageNumber, this.pageSize, this.facultyId)
      .subscribe((res) => {
        this.majors = res.result;
        this.pagination = res.pagination;
      });
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadMajors();
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
    this.loadMajors();
  }
}
