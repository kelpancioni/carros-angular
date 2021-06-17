import {Injectable, OnInit} from '@angular/core';
import { environment as env } from "../../environments/environment";
import {AuthService} from "./auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../model/user";
import {of} from "rxjs";
import {Car} from "../model/car";
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class CarsService implements OnInit{

  baseUrl = env.baseUrl
  user: User

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private httpService: HttpService
  ) {
    this.user = new User(this.authService.loggedUser)
  }

  ngOnInit() {

  }

  getCars(){
    if (this.user?.token) {
      let headers = this.httpService.getAuthHeader(this.user?.token)
      return this.http.get(this.baseUrl + 'carros', {headers})
    }
    return of('Error: User not logged in.')
  }

  editCar(car: Car) {
    if (car && car.id) {
      let headers = this.httpService.getAuthHeader(this.user?.token)
      return this.http.post(this.baseUrl + 'carros', car, {headers})
    }
    return of('Error: Try again later.')
  }

}
