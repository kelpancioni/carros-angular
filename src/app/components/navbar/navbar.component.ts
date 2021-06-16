import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedUser: User

  constructor(private authService: AuthService) {
    this.loggedUser = this.authService.loggedUser
    console.log(this.loggedUser)
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout()
  }

}
