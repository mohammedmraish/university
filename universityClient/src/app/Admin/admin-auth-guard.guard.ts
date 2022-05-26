import { ToastrService } from 'ngx-toastr';
import { LoginServiceService } from './../_login/login-service.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(private toastr: ToastrService, private router: Router) {}

  canActivate(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user != null) {
      if (user.role == 'Admin') return true;
    }

    this.toastr.error('you shall not to pass!');
    this.router.navigateByUrl('');

    return false;
  }
}
