import {MockBuilder, MockInstance, ngMocks} from "ng-mocks";
import {AppModule} from "../app.module";
import {AuthService} from "../services/auth-service";
import {Router} from "@angular/router";
import {AuthGuard} from "./auth-guard";
import {of} from "rxjs";

describe('AuthGuard', () => {
  beforeEach(MockInstance.remember);
  afterEach(MockInstance.restore);

  beforeEach(() => {
    return MockBuilder(AuthGuard, AppModule)
      .mock(AuthService)
      .mock(Router);
  })

  it('should allow navigation if authService.isAuthorization returns true', (done) => {
    const authService = ngMocks.get(AuthService);
    const router = ngMocks.get(Router);
    const authGuard = ngMocks.get(AuthGuard);
    const navigateSpy = jest.spyOn(router, 'navigate');

    jest.spyOn(authService, 'isAuthorization').mockReturnValue(of(true));

    authGuard.canActivate().subscribe((result) => {
      expect(result).toBe(true);
      expect(navigateSpy).not.toHaveBeenCalled();
      done();
    });
  });

  it('should navigate to login if authService.isAuthorization returns false', (done) => {
    const authService = ngMocks.get(AuthService);
    const router = ngMocks.get(Router);
    const authGuard = ngMocks.get(AuthGuard);
    const navigateSpy = jest.spyOn(router, 'navigate');

    jest.spyOn(authService, 'isAuthorization').mockReturnValue(of(false));


    authGuard.canActivate().subscribe((result) => {
      expect(result).toBe(false);
      expect(navigateSpy).toHaveBeenCalledWith(['/login']);
      done();
    });
  });

})
