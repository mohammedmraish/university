import { FacultiesService } from '../../_adminServices/faculties.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-faculties',
  templateUrl: './faculties.component.html',
  styleUrls: ['./faculties.component.css'],
})
export class FacultiesComponent implements OnInit {
  @Output() OnfacultyAdd: EventEmitter<string> = new EventEmitter<string>();
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private facultiesService: FacultiesService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.intitializeForm();
  }

  intitializeForm() {
    this.registerForm = this.fb.group({
      facultyName: ['', Validators.required],
    });
  }

  register() {
    this.facultiesService.addNewFaculty(this.registerForm.value).subscribe(
      (res) => {
        this.toastrService.success(
          'the faculty ' +
            this.registerForm.value.facultyName +
            ' added successfully'
        );

        this.OnfacultyAdd.emit(this.registerForm.value);
      },
      (error) => {
        this.toastrService.error(error.error);
      }
    );
  }
}
