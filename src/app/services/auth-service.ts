import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/User";
import {Observable} from "rxjs";
import {urls} from "../constants/urls";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private accessTokenKey = 'access';
  private refreshTokenKey = 'refresh';

  constructor(private readonly router: Router, private readonly http: HttpClient) {
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(urls.auth, user)
  }
}
