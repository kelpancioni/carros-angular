import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../services/users.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users!: User[]
  constructor(
    private usersService: UsersService,
  ) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.usersService.getUsers().subscribe((res: any) => {
      this.users = res
    })
  }
}
