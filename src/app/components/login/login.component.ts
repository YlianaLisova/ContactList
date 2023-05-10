import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public passwordHidden = true;
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: [null],
      password: [null]
    })
  }

  login(): void {
    this.authService.login(this.formGroup.getRawValue()).subscribe(value => {
      this.authService.setToken(value);
      this.router.navigate(['contacts']).then();
    })
  }

}
