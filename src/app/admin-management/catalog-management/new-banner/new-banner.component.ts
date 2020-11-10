import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { FileUploadService } from '../../../services/file-upload.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NotifierService } from 'src/app/services/notifier.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-new-banner',
  templateUrl: './new-banner.component.html',
  styleUrls: ['./new-banner.component.css']
})
export class NewBannerComponent implements OnInit {
  preview: string;
  form: FormGroup;
  percentDone: any = 0;
  banners = [];

  constructor(
    public fb: FormBuilder,
    public fileUploadService: FileUploadService,
    public dialogRef: MatDialogRef<NewBannerComponent>,
    private notifier: NotifierService,
  ) {

  }

  ngOnInit() {
    this.initializeForm();
  }

  /********************************** */

  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  /********************************** */

  initializeForm() {
    // Reactive Form
    this.form = this.fb.group({
      banner_name: [''],
      title: [''],
      product_name: [''],
      product_amount_from: [0],
      product_description: [''],
      avatar: [null],
      status: [''],
    })
  }

  // Image Preview
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      avatar: file
    });
    this.form.get('avatar').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  submitForm() {
    this.fileUploadService.addBanner(
      this.form.value.banner_name,
      this.form.value.title,
      this.form.value.product_name,
      this.form.value.product_amount_from,
      this.form.value.product_description,
      this.form.value.avatar,
      this.form.value.status,
    ).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.percentDone = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.percentDone}%`);
          break;
        case HttpEventType.Response:
          console.log('Banner successfully created!', event.body);
          this.percentDone = false;
          this.initializeForm();
          this.notifier.Notification("success", "Banner Successfully Created");
          this.dialogRef.close();
      }
    })
  }


  onCloseClick(): void {
    this.dialogRef.close();
  }


}

