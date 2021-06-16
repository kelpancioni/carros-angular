import { Injectable, EventEmitter } from '@angular/core';
import {User} from "../model/user";
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'https://carros-springboot.herokuapp.com/api/v2/'
  isLoggedEmitter = new EventEmitter<boolean>()
  showNavbarEmitter = new EventEmitter()
  isLoggedin = false
  loggedUser!: User

  login(user: User) {
    return this.http.post<User>(this.baseUrl + 'login', user).pipe(tap((res)=> {
      if (res && res.token) {
        this.isLoggedin = true
        this.isLoggedEmitter.emit(true)
        this.loggedUser = new User(res)
        this.showNavbarEmitter.emit((this.loggedUser && this.loggedUser.isAdmin()))
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

  isLogged() {
    return this.isLoggedEmitter.subscribe(res => res)
  }
}
