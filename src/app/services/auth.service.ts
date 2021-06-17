import { Injectable, EventEmitter } from '@angular/core';
import {User} from "../model/user";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";
import { environment as env } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private baseUrl = env.baseUrl
  isLoggedEmitter = new EventEmitter<boolean>()
  showNavbarEmitter = new EventEmitter()
  isLoggedin = false
  loggedUser!: User

  login(user: User) {
    return this.http.post<User>(this.baseUrl + 'login', user).pipe(tap(res => {
      if (res && res.token) {
        this.isLoggedin = true
        this.isLoggedEmitter.emit(true)
        this.loggedUser = new User(res)
        this.showNavbarEmitter.emit((this.loggedUser))
      } else {
        this.isLoggedin = false
        this.isLoggedEmitter.emit(false)
        this.showNavbarEmitter.emit(false)
      }
    }))
  }

  logout() {
    this.isLoggedin = false
    this.isLoggedEmitter.emit(false)
    this.showNavbarEmitter.emit(false)
  }
}
