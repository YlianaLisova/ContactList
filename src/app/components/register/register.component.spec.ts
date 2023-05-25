import {MockBuilder, MockInstance, MockRender, ngMocks} from "ng-mocks";
import {AppModule} from "../../app.module";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth-service";
import {Router} from "@angular/router";
import {RegisterComponent} from "./register.component";
import {of, throwError} from "rxjs";

describe('RegisterComponent', () => {
  beforeEach(MockInstance.remember);
  afterEach(MockInstance.restore);

  beforeEach(() => {
    return MockBuilder(RegisterComponent, AppModule)
      .mock(AuthService)
      .keep(ReactiveFormsModule)
      .mock(Router);
  })

  it('should create component', () => {
    expect(() => MockRender(RegisterComponent).point.componentInstance).not.toThrow();
  })

  it('should initialize formGroup with email, lastname, name, confirm password and password controls', () => {
    const fixture = MockRender(RegisterComponent);
    const component = fixture.point.componentInstance;
    expect(component.formGroup).toBeDefined();
    expect(component.formGroup.controls['name']).toBeDefined();
    expect(component.formGroup.controls['lastName']).toBeDefined();
    expect(component.formGroup.controls['email']).toBeDefined();
    expect(component.formGroup.controls['confirmPassword']).toBeDefined();
    expect(component.formGroup.controls['password']).toBeDefined();
  });

  it('should validate name pattern', () => {
    const fixture = MockRender(RegisterComponent);
    const component = fixture.point.componentInstance;
    const nameControl = component.formGroup.controls['name'];

    nameControl.setValue(null);

    expect(nameControl.valid).toBeFalsy();
    expect(nameControl.hasError('required')).toBeTruthy();

    nameControl.setValue('Uliana');

    expect(nameControl.valid).toBeTruthy();
    expect(nameControl.hasError('required')).toBeFalsy();
  });

  it('should validate lastName pattern', () => {
    const fixture = MockRender(RegisterComponent);
    const component = fixture.point.componentInstance;
    const lastNameControl = component.formGroup.controls['lastName'];

    lastNameControl.setValue(null);

    expect(lastNameControl.valid).toBeFalsy();
    expect(lastNameControl.hasError('required')).toBeTruthy();

    lastNameControl.setValue('Uliana');

    expect(lastNameControl.valid).toBeTruthy();
    expect(lastNameControl.hasError('required')).toBeFalsy();
  });

  it('should validate email pattern', () => {
    const fixture = MockRender(RegisterComponent);
    const component = fixture.point.componentInstance;
    const emailControl = component.formGroup.controls['email'];

    emailControl.setValue('invalid_email');

    expect(emailControl.valid).toBeFalsy();
    expect(emailControl.hasError('pattern')).toBeTruthy();

    emailControl.setValue('valid@example.com');

    expect(emailControl.valid).toBeTruthy();
    expect(emailControl.hasError('pattern')).toBeFalsy();
  });

  it('should validate password pattern', () => {
    const fixture = MockRender(RegisterComponent);
    const component = fixture.point.componentInstance;
    const passwordControl = component.formGroup.controls['password'];

    passwordControl.setValue('invalid_password');

    expect(passwordControl.valid).toBeFalsy();
    expect(passwordControl.hasError('pattern')).toBeTruthy();

    passwordControl.setValue('Something@16');

    expect(passwordControl.valid).toBeTruthy();
    expect(passwordControl.hasError('pattern')).toBeFalsy();
  });

  it('should validate confirmPassword pattern', () => {
    const fixture = MockRender(RegisterComponent);
    const component = fixture.point.componentInstance;
    const passwordControl = component.formGroup.controls['confirmPassword'];

    passwordControl.setValue(null);

    expect(passwordControl.valid).toBeFalsy();
    expect(passwordControl.hasError('required')).toBeTruthy();

    passwordControl.setValue('something');

    expect(passwordControl.valid).toBeTruthy();
    expect(passwordControl.hasError('required')).toBeFalsy();
  });

  it('should call authService.register and navigate to login on successful registration', () => {
    const fixture = MockRender(RegisterComponent);
    const component = fixture.point.componentInstance;
    const authService = ngMocks.get(AuthService);
    const router = ngMocks.get(Router);

    const authServiceSpy = jest.spyOn(authService, 'register').mockReturnValue(of(registrationDataForRegisterMethod));

    const routerNavigateSpy = jest.spyOn(router, 'navigate').mockImplementation(() => Promise.resolve(true));

    component.formGroup.setValue(registrationDataForForm);

    component.register();

    expect(authServiceSpy).toHaveBeenCalledWith(registrationDataForRegisterMethod);
    expect(routerNavigateSpy).toHaveBeenCalledWith(['login']);
  });

  it('should handle registration error and set userNameError', () => {
    const fixture = MockRender(RegisterComponent);
    const component = fixture.point.componentInstance;
    const authService = ngMocks.get(AuthService);
    const errorResponse = {
      error: {
        name: ['Username already exists']
      }
    };

    const authServiceSpy = jest.spyOn(authService, 'register').mockReturnValue(throwError(errorResponse));

    component.formGroup.setValue(registrationDataForForm);

    component.register();

    expect(authServiceSpy).toHaveBeenCalledWith(registrationDataForRegisterMethod);
    expect(component.userNameError).toBe('Username already exists');
  });

  it('should return null for matching passwords in _checkPasswords', () => {
    const fixture = MockRender(RegisterComponent);
    const component = fixture.point.componentInstance;
    const formGroup = new FormGroup({
      password: new FormControl('Valid#123'),
      confirmPassword: new FormControl('Valid#123')
    });

    const result = component._checkPasswords(formGroup);

    expect(result).toBeNull();
  });

  it('should return validation error for different passwords in _checkPasswords', () => {
    const fixture = MockRender(RegisterComponent);
    const component = fixture.point.componentInstance;
    const formGroup = new FormGroup({
      password: new FormControl('Valid#123'),
      confirmPassword: new FormControl('DifferentPassword')
    });

    const result = component._checkPasswords(formGroup);

    expect(result).toEqual({ notSame: 'Password and confirm password are different' });
  });

})

const registrationDataForForm = {
  name: 'test',
  lastName: 'test',
  email: 'test@example.com',
  password: 'Valid#123',
  confirmPassword: 'Valid#123'
};
const registrationDataForRegisterMethod = {
  name: 'test',
  lastName: 'test',
  email: 'test@example.com',
  password: 'Valid#123'
};
