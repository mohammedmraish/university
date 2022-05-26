import { FacultiesService } from '../../_adminServices/faculties.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MajorsService } from '../../_adminServices/majors.service';
import { option } from 'src/app/_models/option';

@Component({
  selector: 'app-majors',
  templateUrl: './majors.component.html',
  styleUrls: ['./majors.component.css'],
})
export class MajorsComponent implements OnInit {
  registerForm: FormGroup;
  faculties: option[] = [];

  constructor(
    private fb: FormBuilder,
    private majorsService: MajorsService,
    private toastrService: ToastrService,
    private facultiesService: FacultiesService
  ) {}

  ngOnInit(): void {
    this.intitializeForm();
    this.getFaculties();
  }

  intitializeForm() {
    this.registerForm = this.fb.group({
      majorName: ['', Validators.required],
      facultyId: ['', Validators.required],
    });
  }

  addMajor() {
    this.majorsService.addNewFaculty(this.registerForm.value).subscribe(
      (res) => {
        this.toastrService.success(
          'the major ' +
            this.registerForm.value.majorName +
            ' added successfully'
        );
      },
      (error) => {
        this.toastrService.error(error.error);
      }
    );
  }

  getFaculties() {
    this.facultiesService.getFaculties().subscribe((faculties) => {
      faculties.forEach((faculty) => {
        this.faculties.push(new option(faculty.facultyId, faculty.facultyName));
      });
    });
  }
}
