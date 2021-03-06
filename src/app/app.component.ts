import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'carros-angular';

  showNav = false
  showSidebar = false

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.showNavbarEmitter.subscribe(res => {
      if (res) {
        this.showNav = res;
        this.showSidebar = res.isAdmin();
      } else {
        this.showNav = res;
        this.showSidebar = res;
      }
    })
  }
}
