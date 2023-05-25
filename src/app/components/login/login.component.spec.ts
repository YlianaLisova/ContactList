import {MockBuilder, MockInstance, MockRender, ngMocks} from "ng-mocks";
import {LoginComponent} from "./login.component";
import {AppModule} from "../../app.module";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth-service";
import {Router} from "@angular/router";
import {of} from "rxjs";

describe('LoginComponent', () => {
  beforeEach(MockInstance.remember);
  afterEach(MockInstance.restore);

  beforeEach(() => {
    return MockBuilder(LoginComponent, AppModule)
      .keep(ReactiveFormsModule)
      .mock(AuthService)
      .mock(Router);
  })

  it('should create component', () => {
    expect(() => MockRender(LoginComponent).point.componentInstance).not.toThrow();
  })

  it('should initialize formGroup with email and password controls', () => {
    const fixture = MockRender(LoginComponent);
    const component = fixture.point.componentInstance;
    expect(component.formGroup).toBeDefined();
    expect(component.formGroup.controls['email']).toBeDefined();
    expect(component.formGroup.controls['password']).toBeDefined();
  });

  it('should validate email pattern', () => {
    const fixture = MockRender(LoginComponent);
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
    const fixture = MockRender(LoginComponent);
    const component = fixture.point.componentInstance;
    const passwordControl = component.formGroup.controls['password'];

    passwordControl.setValue('invalid_password');

    expect(passwordControl.valid).toBeFalsy();
    expect(passwordControl.hasError('pattern')).toBeTruthy();

    passwordControl.setValue('User@162');

    expect(passwordControl.valid).toBeTruthy();
    expect(passwordControl.hasError('pattern')).toBeFalsy();
  });

  it('should call authService.login, setToken, and navigate to contacts on successful login', () => {
    const fixture = MockRender(LoginComponent);
    const component = fixture.point.componentInstance;
    const authService = ngMocks.get(AuthService);
    const router = ngMocks.get(Router);
    const loginData = {
      email: 'test@example.com',
      password: 'Valid#123'
    };
    const authToken = {
      access_token: 'string',
      refresh_token: 'string'
    };

    const authServiceSpy = jest.spyOn(authService, 'login').mockReturnValue(of(authToken));

    const setTokenSpy = jest.spyOn(authService, 'setToken');

    const routerNavigateSpy = jest.spyOn(router, 'navigate').mockImplementation(() => Promise.resolve(true));

    component.formGroup.setValue(loginData);

    component.login();

    expect(authServiceSpy).toHaveBeenCalledWith(loginData);
    expect(setTokenSpy).toHaveBeenCalledWith(authToken);
    expect(routerNavigateSpy).toHaveBeenCalledWith(['contacts']);
  });
})
