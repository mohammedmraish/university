import { MajorsService } from '../../_adminServices/majors.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacultiesService } from '../../_adminServices/faculties.service';
import { option } from 'src/app/_models/option';
import { StudentsService } from '../../_adminServices/students.service';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.css'],
})
export class RegisterStudentComponent implements OnInit {
  registerForm: FormGroup;
  faculties: option[] = [];
  facultyMajors: option[] = [];

  constructor(
    private fb: FormBuilder,
    private studentsService: StudentsService,
    private toastrService: ToastrService,
    private facultiesService: FacultiesService,
    private majorsService: MajorsService
  ) {}

  ngOnInit(): void {
    this.intitializeForm();
    this.getFaculties();
  }

  intitializeForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      gender: ['', Validators.required],
      city: ['', Validators.required],
      phoneNumber: ['', Validators.required],

      fullName: ['', Validators.required],
      majorId: ['', Validators.required],
      facultyId: ['', Validators.required],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  register() {
    // console.log(this.registerForm.value);

    this.studentsService.registerStudent(this.registerForm.value).subscribe(
      (res) => {
        this.toastrService.success(
          'the student ' +
            this.registerForm.value.fullName +
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
        this.facultyMajors = [];
        facultyMajors.forEach((major) => {
          this.facultyMajors.push(new option(major.majorId, major.majorName));
        });
      });
  }
  //end componnet
}
