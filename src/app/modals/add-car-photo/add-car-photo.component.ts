import { Component, OnInit } from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {Car} from "../../model/car";
import {map} from "rxjs/operators";
import {UploadService} from "../../services/upload.service";

@Component({
  selector: 'app-add-car-photo',
  templateUrl: './add-car-photo.component.html',
  styleUrls: ['./add-car-photo.component.css']
})
export class AddCarPhotoComponent implements OnInit {

  base64: string = ''
  url: string = ''
  carName: string = ''
  callbacks!: { success?: (url: string) => void, error?: (err: {}) => void };

  constructor(
    private bsModalRef: BsModalRef,
    private uploadService: UploadService
  ) { }

  ngOnInit(): void {
  }

  setBase64(base64: string) {
    this.base64 = base64
  }

  confirm() {
    let photoToUpload
    if (this.base64.includes('base64')) {
      photoToUpload = {
        base64: this.base64.split(',')[1],
        mimeType: this.base64.split(':')[1].split(';')[0],
        fileName: this.carName
      }
      this.uploadService.uploadPhoto(photoToUpload).subscribe((res: any) => {
        if (this.callbacks && this.callbacks.success && res?.url) {
          this.callbacks.success(res.url)
        }
        this.close()
      })
    }
  }

  close() {
    this.bsModalRef.hide()
  }
}
