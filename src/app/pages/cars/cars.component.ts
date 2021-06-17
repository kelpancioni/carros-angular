import { Component, OnInit } from '@angular/core';
import {CarsService} from "../../services/cars.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {MenuItem} from 'primeng/api';
import {Car} from "../../model/car";
import {BsModalService} from "ngx-bootstrap/modal";
import {ModalCarDetailsComponent} from "../../modals/modal-car-details/modal-car-details.component";


@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  constructor(
    private carsService: CarsService,
    private authService: AuthService,
    private router: Router,
    private modalService: BsModalService
  ) { }

  cars: any
  isAdmin: boolean = false

  items!: MenuItem[]
  home: any

  ngOnInit(): void {
    this.authService.isLoggedEmitter.subscribe(res => {
      if(!res) {
        this.router.navigate(['/'])
      }
    })
    this.isAdmin = this.authService.loggedUser.isAdmin()
    this.getCars()
    this.items = [
      {label: 'Carros'}
    ]
    this.home = {label: 'Home', routerLink: '/home'}
  }

  getCars() {
    this.carsService.getCars().subscribe(res => {
      this.cars = res
    }, error => console.log(error))
  }

  carDetails(car: Car) {
    const initialState = {
      car,
      isAdmin: this.isAdmin,
      callbacks: {
        success: () => {
          this.getCars()
        }
      }
    }
    this.modalService.show(ModalCarDetailsComponent, {initialState, class: 'modal-lg'})
  }
}
