import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable, tap} from 'rxjs';
import {AuthService} from "../services/auth-service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private readonly router: Router, private readonly authService: AuthService) {
  }

  public canActivate(): Observable<boolean> {
    return this.authService.isAuthorization().pipe(tap((value) => {
      console.log(value)
      !value && this.router.navigate(['/login'])
    }));
  }
}
