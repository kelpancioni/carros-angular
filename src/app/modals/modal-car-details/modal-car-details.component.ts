import { Component, OnInit } from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {Car} from "../../model/car";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {CarsService} from "../../services/cars.service";
import {AddCarPhotoComponent} from "../add-car-photo/add-car-photo.component";
import {UploadService} from "../../services/upload.service";
import {map, switchMap} from "rxjs/operators";
import {of} from "rxjs";

@Component({
  selector: 'app-modal-car-details',
  templateUrl: './modal-car-details.component.html',
  styleUrls: ['./modal-car-details.component.css']
})
export class ModalCarDetailsComponent implements OnInit {


  car: any
  callbacks!: { success?: (arg: Car) => void, error?: (err: {}) => void };
  isAdmin: boolean = false
  form

  name: AbstractControl | null
  type: AbstractControl | null
  description: AbstractControl | null
  photo: AbstractControl | null


  constructor(
    private modalService: BsModalService,
    private bsModalRef: BsModalRef,
    private formBuilder: FormBuilder,
    private carsService: CarsService,
    private uploadService: UploadService
    ) {
    this.form = this.formBuilder.group({
      'name': ['', Validators.required],
      'type': ['', Validators.required],
      'description': [''],
      'photo': ['']
    })

    this.name = this.form.get('name')
    this.type = this.form.get('type')
    this.description = this.form.get('description')
    this.photo = this.form.get('photo')
  }

  ngOnInit(): void {
    if (this.car) {
      this.name?.setValue(this.car.nome)
      this.type?.setValue(this.car.tipo)
      this.description?.setValue(this.car.descricao)
      this.photo?.setValue(this.car.urlFoto)
    }
    if (!this.isAdmin) {
      this.form.disable()
    }
  }

  save() {
    let carUpdate = {
      ...this.car,
      nome: this.form.value.name || this.car.nome,
      descricao: this.form.value.description || this.car.descricao,
      tipo: this.form.value.type || this.car.tipo
    }
    this.carsService.editCar(carUpdate).subscribe(res => {
      this.car = res
      this.close()
    })
  }

  close() {
    if (this.callbacks && this.callbacks.success) {
      this.callbacks.success(this.car)
    }
    this.bsModalRef.hide()
  }

  openImgUpload() {
    const initialState = {
      carName: this.car.nome,
      callbacks: {
        success: (url: string) => {
          this.car.urlFoto = url
        }
      }
    }
    this.modalService.show(AddCarPhotoComponent, {initialState, class: 'modal-md'})
  }

}
