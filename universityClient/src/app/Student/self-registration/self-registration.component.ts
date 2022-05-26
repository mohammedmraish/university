import { ToastrService } from 'ngx-toastr';
import { SelfRegistrationService } from './../_studentServices/selfRegisration.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { style } from '@angular/animations';

@Component({
  selector: 'app-self-registration',
  templateUrl: './self-registration.component.html',
  styleUrls: ['./self-registration.component.css'],
})
export class SelfRegistrationComponent implements OnInit {
  schedule: any[] = [];
  coursesList;
  courseSections;

  constructor(
    private selfRegisterService: SelfRegistrationService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getRegisteredSchedule();
    this.getCoursesList();
  }

  getRegisteredSchedule() {
    this.selfRegisterService.getSchedule().subscribe((res) => {
      this.schedule = res;
    });
  }

  getCoursesList() {
    this.selfRegisterService.getStudentCourses().subscribe((res) => {
      this.coursesList = res;
    });
  }

  getCourseSections(courseName) {
    this.selfRegisterService.getCourseSections(courseName).subscribe((res) => {
      this.courseSections = res;
      console.log(res);
    });
  }

  addCourseSection(sectionId) {
    this.selfRegisterService.addCourseSection(sectionId).subscribe(
      (res) => {
        this.toastr.success('Added successfully');
        this.getRegisteredSchedule();
      },
      (error) => {
        this.toastr.error(error.error);
      }
    );
  }

  deleteCourseSection(sectionId) {
    this.selfRegisterService.deleteCourse(sectionId).subscribe((res) => {
      this.schedule.forEach((s, index) => {
        if (s.id == sectionId) this.schedule.splice(index, 1);
      });
    });
  }
}
