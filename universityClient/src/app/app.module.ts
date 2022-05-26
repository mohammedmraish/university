import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Pagination } from './_models/pagination';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './_login/login.component';
import { RegisterStudentComponent } from './Admin/manage-students/register-student/register-student.component';
import { RegisterTeacherComponent } from './Admin/manage-teachers/register-teacher/register-teacher.component';
import { AdminNavComponent } from './Admin/admin-nav/admin-nav.component';
import { NotFoundComponent } from './_not-found/not-found.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { FacultiesComponent } from './Admin/faculties-majors/add-faculty/faculties.component';
import { MajorsComponent } from './Admin/faculties-majors/add-major/majors.component';
import { AddSectionsComponent } from './Admin/manage-sections/manage-sections/manage-sections.component';
import { CourseComponent } from './Admin/manage-Courses/add-course/course.component';
import { SelectInputComponent } from './_forms/select-input/select-input.component';
import { FormControlSelectInputComponent } from './_forms/form-control-select-input/form-control-select-input.component';
import { AllStudentsComponent } from './Admin/manage-students/all-students/all-students.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AllTeachersComponent } from './Admin/manage-teachers/all-teachers/all-teachers.component';
import { FacultiesListComponent } from './Admin/faculties-majors/faculties-list/faculties-list.component';
import { MajorsListComponent } from './Admin/faculties-majors/majors-list/majors-list.component';
import { CoursesListComponent } from './Admin/manage-Courses/courses-list/courses-list.component';
import { SectionsListComponent } from './Admin/manage-sections/sections-list/sections-list.component';
import { GeneralReportsComponent } from './Admin/reports/general-reports/general-reports.component';
import { HomeComponent } from './Student/home/home.component';
import { StudentNavComponent } from './Student/student-nav/student-nav.component';
import { SelfRegistrationComponent } from './Student/self-registration/self-registration.component';
import { CourseScheduleComponent } from './Student/course-schedule/course-schedule.component';
import { MidTermResultsComponent } from './Student/mid-term-results/mid-term-results.component';
import { AcademicResultsComponent } from './Student/academic-results/academic-results.component';
import { PlanCoursesComponent } from './Student/plan-courses/plan-courses.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RemainingCoursesComponent } from './Student/remaining-courses/remaining-courses.component';
import { TecherNavComponent } from './Teacher/techer-nav/techer-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterStudentComponent,
    RegisterTeacherComponent,
    AdminNavComponent,
    NotFoundComponent,
    TextInputComponent,
    FacultiesComponent,
    MajorsComponent,
    AddSectionsComponent,
    CourseComponent,
    SelectInputComponent,
    FormControlSelectInputComponent,
    AllStudentsComponent,
    AllTeachersComponent,
    FacultiesListComponent,
    MajorsListComponent,
    CoursesListComponent,
    SectionsListComponent,
    GeneralReportsComponent,
    HomeComponent,
    StudentNavComponent,
    SelfRegistrationComponent,
    CourseScheduleComponent,
    MidTermResultsComponent,
    AcademicResultsComponent,
    PlanCoursesComponent,
    RemainingCoursesComponent,
    TecherNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BsDropdownModule.forRoot(),
    PaginationModule,
    ModalModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
