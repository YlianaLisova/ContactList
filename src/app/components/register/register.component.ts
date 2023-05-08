import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public passwordHidden = true;
  formGroup: FormGroup;
  userNameError: string;

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]]
    }, {validators: this._checkPasswords})
  }

  register(): void {
    const rawValue = this.formGroup.getRawValue();
    delete rawValue.confirmPassword;
    this.authService.register(rawValue).subscribe(
      {
        next: () => this.router.navigate(['login']),
        error: error => this.userNameError = error.error.name[0]
      }
    )
  }

  _checkPasswords(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password?.value === confirmPassword?.value ? null : {notSame: 'Passwords are different'}
  }

}
