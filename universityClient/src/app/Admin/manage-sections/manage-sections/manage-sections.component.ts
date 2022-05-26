import { SectionsParams } from './../../_adminModels/sectionsParams';
import { SectionsService } from '../../_adminServices/sections.service';
import { CourseService } from '../../_adminServices/course.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FacultiesService } from '../../_adminServices/faculties.service';
import { MajorsService } from '../../_adminServices/majors.service';
import { option } from 'src/app/_models/option';
import { SectionsListComponent } from '../sections-list/sections-list.component';

@Component({
  selector: 'app-sections',
  templateUrl: './manage-sections.component.html',
  styleUrls: ['./manage-sections.component.css'],
})
export class AddSectionsComponent implements OnInit {
  registerForm: FormGroup;
  faculties: option[] = [];
  facultyMajors: option[] = [];
  majorCourses: option[] = [];
  facultyTeachers: option[] = [];
  semesters: option[] = [];
  days: option[] = [];
  timeSlots: option[] = [];
  classRooms: option[] = [];
  @ViewChild(SectionsListComponent) sectionsList: SectionsListComponent;
  sectionParams = new SectionsParams();
  facultyId: number;
  majorId: number;

  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private courseService: CourseService,
    private facultiesService: FacultiesService,
    private majorsService: MajorsService,
    private sectionsService: SectionsService
  ) {}

  ngOnInit(): void {
    this.semesters.push(new option('First', 'First'));
    this.semesters.push(new option('Second', 'Second'));
    this.semesters.push(new option('Summer', 'Summer'));
    this.days.push(new option('sunday', 'sunday'));
    this.days.push(new option('monday', 'monday'));
    this.days.push(new option('tuesday', 'tuesday'));
    this.days.push(new option('wednesday', 'wednesday'));
    this.days.push(new option('thursday', 'thursday'));
    this.classRooms.push(new option('1', '1'));
    this.classRooms.push(new option('2', '2'));
    this.classRooms.push(new option('3', '3'));

    this.getFaculties();
    this.intitializeForm();
  }

  getFaculties() {
    this.facultiesService.getFaculties().subscribe((faculties) => {
      faculties.forEach((faculty) => {
        this.faculties.push(new option(faculty.facultyId, faculty.facultyName));
      });
    });
  }

  intitializeForm() {
    this.registerForm = this.fb.group({
      courseId: ['', Validators.required],
      teacherId: ['', Validators.required],
      timeSlotId: ['', Validators.required],
      semester: ['', Validators.required],
      classroomId: ['', Validators.required],
    });
  }

  onSelectFacultyChange(event) {
    this.facultyId = event.target.value;
    if (this.facultyId) {
      this.facultiesService
        .getFacultyTeachers(this.facultyId)
        .subscribe((facultyTeachers) => {
          this.facultyTeachers = [];
          facultyTeachers.forEach((teacher) => {
            this.facultyTeachers.push(
              new option(teacher.teacherId, teacher.teacherName)
            );
          });
        });
      this.majorsService
        .getFacultyMajors(this.facultyId)
        .subscribe((facultyMajors) => {
          this.facultyMajors = [];
          facultyMajors.forEach((major) => {
            this.facultyMajors.push(new option(major.majorId, major.majorName));
          });
        });
    } else {
      this.facultyMajors = [];
      this.majorCourses = [];
      this.facultyTeachers = [];
      this.registerForm.controls['courseId'].setValue(null);
      this.registerForm.controls['teacherId'].setValue(null);
    }
  }

  onSelectMajorChange(event) {
    this.majorId = event.target.value;
    if (this.majorId) {
      this.courseService
        .getMajorCourses(this.majorId)
        .subscribe((majorCourses) => {
          this.majorCourses = [];
          majorCourses.forEach((course) => {
            this.majorCourses.push(
              new option(course.courseId, course.courseName)
            );
          });
        });
    } else {
      this.majorCourses = [];
      this.registerForm.controls['courseId'].setValue(null);
    }
  }

  onDaySelectChange(event) {
    const day = event.target.value;
    if (day) {
      this.sectionsService.getTimeSlots(day).subscribe((timeSlots) => {
        timeSlots.forEach((time) => {
          this.timeSlots.push(new option(time.timeSlotId, time.timeStartEnd));
        });
      });
    } else {
      this.timeSlots = [];
      this.registerForm.controls['timeSlotId'].setValue(null);
    }
  }

  onSubmit() {
    console.log(this.registerForm.value);
    this.sectionsService.addSection(this.registerForm.value).subscribe(
      (res) => {
        this.toastrService.success('the section added successfully');
        this.sectionsList.loadSections();
      },
      (error) => {
        this.toastrService.error(error.error);
      }
    );
  }

  onFilterClick() {
    this.sectionParams.CourseId = this.registerForm.controls['courseId'].value;
    this.sectionParams.TeacherId =
      this.registerForm.controls['teacherId'].value;
    this.sectionParams.FacultyId = this.facultyId;
    this.sectionParams.MajorId = this.majorId;
    this.sectionsList.applyFilter(this.sectionParams);
  }
  onFilterCleare() {
    this.sectionParams = new SectionsParams();
    this.sectionsList.applyFilter(this.sectionParams);
    this.registerForm.reset();
    this.facultyMajors = [];
    this.majorCourses = [];
    this.facultyTeachers = [];
    this.timeSlots = [];
    this.facultyId = null;
    this.majorId = null;
  }
  //end componnet
}
