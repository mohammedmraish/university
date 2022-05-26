import { FaculiesList } from './../../_adminModels/facultiesList';
import { FacultiesService } from './../../_adminServices/faculties.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faculties-list',
  templateUrl: './faculties-list.component.html',
  styleUrls: ['./faculties-list.component.css'],
})
export class FacultiesListComponent implements OnInit {
  faculties: any[];

  constructor(private facultiesService: FacultiesService) {}

  ngOnInit(): void {
    this.loadFaculties();
  }

  loadFaculties() {
    this.facultiesService.getFacultiesList().subscribe((res) => {
      this.faculties = res;
    });
  }

  onNewFacultyAdded(event) {
    console.log(event.facultyName);

    this.faculties.push(new FaculiesList(event.facultyName));
  }
}
