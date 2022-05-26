import { option } from '../../../_models/option';
import { CourseService } from '../../_adminServices/course.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FacultiesService } from '../../_adminServices/faculties.service';
import { MajorsService } from '../../_adminServices/majors.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit {
  registerForm: FormGroup;
  faculties: option[] = [];
  facultyMajors: option[] = [];
  numberOfHours: option[] = [];
  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private toastrService: ToastrService,
    private facultiesService: FacultiesService,
    private majorsService: MajorsService
  ) {}

  ngOnInit(): void {
    this.numberOfHours.push(new option('1', '1 hour'));
    this.numberOfHours.push(new option('2', '2 hour'));
    this.numberOfHours.push(new option('3', '3 hour'));
    this.numberOfHours.push(new option('4', '4 hour'));

    this.intitializeForm();
    this.getFaculties();
  }

  intitializeForm() {
    this.registerForm = this.fb.group({
      courseName: ['', Validators.required],
      numberOfHours: ['', Validators.required],
      majorId: ['', Validators.required],
    });
  }

  AddCourse() {
    this.courseService.addCourse(this.registerForm.value).subscribe(
      (res) => {
        this.toastrService.success(
          'the course ' +
            this.registerForm.value.courseName +
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

  onSelectFacultyChange(event) {
    if (event.target.value) this.getFacultyMajors(event.target.value);
    else {
      this.facultyMajors = [];
      this.registerForm.controls['majorId'].setValue(null);
    }
  }

  getFacultyMajors(facultyId) {
    this.majorsService
      .getFacultyMajors(facultyId)
      .subscribe((facultyMajors) => {
        facultyMajors.forEach((major) => {
          this.facultyMajors.push(new option(major.majorId, major.majorName));
        });
      });
  }
  //end componnet
}
