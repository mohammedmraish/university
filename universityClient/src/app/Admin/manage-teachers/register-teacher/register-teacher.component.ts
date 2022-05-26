import { TeachersService } from '../../_adminServices/teachers.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { option } from 'src/app/_models/option';
import { FacultiesService } from '../../_adminServices/faculties.service';

@Component({
  selector: 'app-register-teacher',
  templateUrl: './register-teacher.component.html',
  styleUrls: ['./register-teacher.component.css'],
})
export class RegisterTeacherComponent implements OnInit {
  registerForm: FormGroup;
  faculties: option[] = [];
  facultyId: number;
  constructor(
    private fb: FormBuilder,
    private teachersService: TeachersService,
    private toastrService: ToastrService,
    private facultiesService: FacultiesService
  ) {}

  ngOnInit(): void {
    this.intitializeForm();
    this.getFaculties();
  }

  intitializeForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],

      fullName: ['', Validators.required],
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
    console.log(this.registerForm.value);

    this.teachersService.registerTeacher(this.registerForm.value).subscribe(
      (res) => {
        this.toastrService.success(
          'the teacher ' +
            this.registerForm.value.fullName +
            'added successfully'
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
  //end componnet
}
