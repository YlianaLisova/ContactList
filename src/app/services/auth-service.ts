import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/User";
import {Observable, of, tap} from "rxjs";
import {urls} from "../constants/urls";
import {Token} from "../models/Token";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private accessTokenKey = 'access';
  private refreshTokenKey = 'refresh';

  constructor(private readonly router: Router, private readonly http: HttpClient) {
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(urls.user, user)
  }

  logout(): void {
    const access_token = localStorage.getItem('access')
    this.http.post(`${urls.auth}/logout`, access_token)
    this.router.navigate(['/login']).then((resolve) => {
      if (resolve) {
        localStorage.removeItem('access');
      }
    });
  }

  login(user: User) {
    return this.http.post<Token>(`${urls.auth}/login`, user)
  }

  refresh(): Observable<Token> {
    const refresh = this.getRefreshToken();
    return this.http.post<Token>(`${urls.auth}/refresh`, {refresh}).pipe(
      tap((tokens: Token)=>{
        this.setToken(tokens)
      })
    )
  }

  setToken(token: Token): void {
    localStorage.setItem(this.accessTokenKey, token.access_token)
    localStorage.setItem(this.refreshTokenKey, token.refresh_token)
  }

  getAccessToken(): string {
    return localStorage.getItem(this.accessTokenKey) as string;
  }
  getRefreshToken(): string {
    return localStorage.getItem(this.refreshTokenKey) as string;
  }

  deleteToken(): void {
    localStorage.removeItem(this.accessTokenKey)
    localStorage.removeItem(this.refreshTokenKey)
  }

  isAuthorization(): Observable<boolean> {
    return of(!!localStorage.getItem(this.accessTokenKey))
  }


}
