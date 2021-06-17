import { Injectable } from '@angular/core';
import  {environment as env } from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {User} from "../model/user";
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private baseUrl = env.baseUrl
  user

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private httpService: HttpService
  ) {
    this.user = new User(this.authService.loggedUser)
  }

  uploadPhoto(data: {base64: string, mimeType: string, fileName: string}) {
    const headers = this.httpService.getAuthHeader(this.user?.token)
    return this.http.post(this.baseUrl + 'upload', {...data}, {headers})
  }

}
