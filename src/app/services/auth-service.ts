import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/User";
import {Observable, tap} from "rxjs";
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

  login(user: User) {
    return this.http.post<Token>(urls.auth, user)
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
    localStorage.setItem(this.accessTokenKey, token.access)
    localStorage.setItem(this.refreshTokenKey, token.refresh)
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

  isAuthorization(): boolean {
    return !!localStorage.getItem(this.accessTokenKey)
  }


}
