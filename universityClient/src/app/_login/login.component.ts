import { ToastrService } from 'ngx-toastr';
import { LoginServiceService } from './login-service.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: LoginServiceService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  login(form: NgForm) {
    if (form.invalid) return;

    this.loginService
      .login({ username: form.value.username, password: form.value.password })
      .subscribe(
        (res) => {
          this.navigatToApp();
        },
        (error) => {
          this.toastr.error(error.error);
        }
      );
  }

  navigatToApp() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user.role == 'Admin') this.router.navigateByUrl('admin');
    else if (user.role == 'Student') this.router.navigateByUrl('student/home');
    else if (user.role == 'Teacher') this.router.navigateByUrl('teacher');
  }
}
