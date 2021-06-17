import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username: string = ''
  userPhoto: string = ''

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.isLoggedEmitter.subscribe(res => {
      if(!res) {
        this.router.navigate(['/'])
      }
    })
    this.username = this.authService.loggedUser.nome
    this.userPhoto = this.authService.loggedUser.urlFoto
  }

}
