import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user";
import {environment as env} from "../../environments/environment";
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl = env.baseUrl
  user: User

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private httpService: HttpService
  ) {
    this.user = new User(this.authService.loggedUser)
  }

  getUsers() {
    const headers = this.httpService.getAuthHeader(this.user?.token)
    return this.http.get(this.baseUrl + 'users', {headers})
  }
}
