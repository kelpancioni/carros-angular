import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

  getAuthHeader(token: string) {
    let headers = new HttpHeaders()
    return headers.append('Authorization', 'Bearer ' + token)
  }
}
