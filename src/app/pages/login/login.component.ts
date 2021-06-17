import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {map, switchMap, tap} from "rxjs/operators";
import {User} from "../../model/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  password: AbstractControl | null;
  username: AbstractControl | null;
  form

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.form = this.formBuilder.group({
      'password': ['', Validators.required],
      'username': ['', Validators.required]
    })

    this.username = this.form.get('username');
    this.password = this.form.get('password');
  }

  ngOnInit(): void {
    if (this.authService.isLoggedin) {
      this.router.navigate(['home'])
    }
    this.authService.isLoggedEmitter.subscribe(res => {
      if (res) {
        this.router.navigate(['home'])
      }
    })
  }

  signIn() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe(res => {
        const user = new User(res)
        if (user.isUser()) {
          this.router.navigate(['cars'])
        }
      })
    }
  }

}
