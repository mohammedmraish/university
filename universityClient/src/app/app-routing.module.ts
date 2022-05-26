import { TecherNavComponent } from './Teacher/techer-nav/techer-nav.component';
import { TeacherAuthGuard } from './Teacher/teacher-auth-guard.guard';
import { RemainingCoursesComponent } from './Student/remaining-courses/remaining-courses.component';
import { PlanCoursesComponent } from './Student/plan-courses/plan-courses.component';
import { AcademicResultsComponent } from './Student/academic-results/academic-results.component';
import { MidTermResultsComponent } from './Student/mid-term-results/mid-term-results.component';
import { CourseScheduleComponent } from './Student/course-schedule/course-schedule.component';
import { SelfRegistrationComponent } from './Student/self-registration/self-registration.component';
import { StudentNavComponent } from './Student/student-nav/student-nav.component';
import { HomeComponent } from './Student/home/home.component';
import { GeneralReportsComponent } from './Admin/reports/general-reports/general-reports.component';
import { SectionsListComponent } from './Admin/manage-sections/sections-list/sections-list.component';
import { CoursesListComponent } from './Admin/manage-Courses/courses-list/courses-list.component';
import { MajorsListComponent } from './Admin/faculties-majors/majors-list/majors-list.component';
import { AllTeachersComponent } from './Admin/manage-teachers/all-teachers/all-teachers.component';
import { AllStudentsComponent } from './Admin/manage-students/all-students/all-students.component';
import { AddSectionsComponent } from './Admin/manage-sections/manage-sections/manage-sections.component';
import { MajorsComponent } from './Admin/faculties-majors/add-major/majors.component';
import { FacultiesComponent } from './Admin/faculties-majors/add-faculty/faculties.component';
import { NotFoundComponent } from './_not-found/not-found.component';
import { AdminAuthGuard } from './Admin/admin-auth-guard.guard';
import { AdminNavComponent } from './Admin/admin-nav/admin-nav.component';
import { RegisterTeacherComponent } from './Admin/manage-teachers/register-teacher/register-teacher.component';
import { RegisterStudentComponent } from './Admin/manage-students/register-student/register-student.component';
import { LoginComponent } from './_login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './Admin/manage-Courses/add-course/course.component';
import { FacultiesListComponent } from './Admin/faculties-majors/faculties-list/faculties-list.component';
import { StudentAuthGuard } from './Student/student-auth-guard.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'admin',
    runGuardsAndResolvers: 'always',
    canActivate: [AdminAuthGuard],
    component: AdminNavComponent,
    children: [
      { path: '', component: GeneralReportsComponent },
      { path: 'registerStudent', component: RegisterStudentComponent },
      { path: 'allStudents', component: AllStudentsComponent },
      { path: 'registerTeacher', component: RegisterTeacherComponent },
      { path: 'allTeachers', component: AllTeachersComponent },

      { path: 'faculties', component: FacultiesComponent },
      { path: 'facultiesList', component: FacultiesListComponent },
      { path: 'majors', component: MajorsComponent },
      { path: 'majorsList', component: MajorsListComponent },
      { path: 'addCourse', component: CourseComponent },
      { path: 'coursesList', component: CoursesListComponent },
      { path: 'addSection', component: AddSectionsComponent },
      { path: 'sectionsList', component: SectionsListComponent },
      { path: 'generalReports', component: GeneralReportsComponent },
    ],
  },
  {
    path: 'student',
    runGuardsAndResolvers: 'always',
    canActivate: [StudentAuthGuard],
    component: StudentNavComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'selfRegistration', component: SelfRegistrationComponent },
      { path: 'remainingCourses', component: RemainingCoursesComponent },
      { path: 'courseSchedule', component: CourseScheduleComponent },
      { path: 'midTermResults', component: MidTermResultsComponent },
      { path: 'AcademicResults', component: AcademicResultsComponent },
      { path: 'PlanCourses', component: PlanCoursesComponent },
    ],
  },
  {
    path: 'teacher',
    runGuardsAndResolvers: 'always',
    canActivate: [TeacherAuthGuard],
    component: TecherNavComponent,
    children: [],
  },

  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
