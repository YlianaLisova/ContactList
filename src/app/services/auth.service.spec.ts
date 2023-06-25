import {AuthService} from './auth-service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/User';
import {of} from 'rxjs';
import {urls} from '../constants/urls';
import {Token} from "../models/Token";
import {MockBuilder, MockInstance} from "ng-mocks";
import {AppModule} from "../app.module";

describe('AuthService', () => {
  beforeEach(MockInstance.remember);
  afterEach(MockInstance.restore);

  let authService: AuthService;
  let routerMock: Router;
  let httpMock: HttpClient;


  beforeEach(() => {
    routerMock = {} as Router;
    httpMock = {} as HttpClient;

    authService = new AuthService(routerMock, httpMock);
    return MockBuilder(AuthService, AppModule)
      .mock(Router)
      .mock(HttpClient)
  });

  it('should register a user successfully', () => {

    httpMock.post = jest.fn().mockReturnValue(of(user));

    authService.register(user).subscribe((result: any) => {
      expect(result).toEqual(user);
    });

    expect(httpMock.post).toHaveBeenCalledWith(urls.user, user);
  });

  it('should login a user and return a token', () => {
    const token: Token = {access_token: 'testAccessToken', refresh_token: 'testRefreshToken'};

    httpMock.post = jest.fn().mockReturnValue(of(token));

    authService.login(user).subscribe((result) => {
      expect(result).toEqual(token);
    });

    expect(httpMock.post).toHaveBeenCalledWith(`${urls.auth}/login`, user);
  });

  it('should set the token correctly', () => {
    const tokens: Token = {access_token: 'testAccessToken', refresh_token: 'testRefreshToken'};
    jest.spyOn(Storage.prototype, 'setItem');
    authService.setToken(tokens);

    expect(localStorage.setItem).toHaveBeenNthCalledWith(1, authService['accessTokenKey'], tokens.access_token);
    expect(localStorage.setItem).toHaveBeenNthCalledWith(2, authService['refreshTokenKey'], tokens.refresh_token);
  });

  it('should set the access and refresh tokens in localStorage', () => {
    const token: Token = {access_token: 'testAccessToken', refresh_token: 'testRefreshToken'};

    authService.setToken(token);

    expect(localStorage.getItem(authService['accessTokenKey'])).toBe(token.access_token);
    expect(localStorage.getItem(authService['refreshTokenKey'])).toBe(token.refresh_token);
  });

  it('should get the access token correctly', () => {
    const access_token = 'testAccessToken';
    Storage.prototype.getItem = jest.fn();
    jest.spyOn(localStorage, 'getItem').mockReturnValue(access_token);

    const result = authService.getAccessToken();

    expect(localStorage.getItem).toHaveBeenCalledWith(authService['accessTokenKey']);
    expect(result).toBe(access_token);
  });

  it('should get the refresh token correctly', () => {
    const refresh_token = 'testRefreshToken';
    Storage.prototype.getItem = jest.fn();
    jest.spyOn(localStorage, 'getItem').mockReturnValue(refresh_token);

    const result = authService.getRefreshToken();

    expect(localStorage.getItem).toHaveBeenCalledWith(authService['refreshTokenKey']);
    expect(result).toBe(refresh_token);
  });

  it('should remove access and refresh tokens from localStorage', () => {
    Storage.prototype.removeItem = jest.fn();
    const removeItemSpy = jest.spyOn(localStorage, 'removeItem');

    authService.deleteToken();

    expect(removeItemSpy).toHaveBeenCalledTimes(2);
    expect(removeItemSpy).toHaveBeenCalledWith('access');
    expect(removeItemSpy).toHaveBeenCalledWith('refresh');
  });
});
const user: User = {name: 'testUser', lastName: 'test', email: 'test@gmail.com', password: 'testPassword'};
