import { Component, Inject, OnInit } from '@angular/core';
import { UploadFilesService } from '../../../services/upload-product-files.service';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductFile } from 'src/app/models/productfile';


@Component({
  selector: 'app-upload-product-image',
  templateUrl: './upload-product-image.component.html',
  styleUrls: ['./upload-product-image.component.css']
})
export class UploadProductImageComponent implements OnInit {

  fileArr = [];
  imgArr = [];
  fileObj = [];
  form: FormGroup;
  msg: string;
  progress: number = 0;
  productfile: ProductFile;

  constructor(
    public fb: FormBuilder,
    private sanitizer: DomSanitizer,
    public uploadFileService: UploadFilesService,
    @Inject(MAT_DIALOG_DATA) public productdatainfo: any,
  ) {
  }

  ngOnInit(): void {
    this.initializeProductFile();
    this.initialiseForm();
  }

  initialiseForm() {
    this.form = this.fb.group({
      avatar: [null],
      created_by: this.productfile.created_by,
      modified_by: this.productfile.modified_by,
      product_id: this.productfile.product_id
    })
  };

  initializeProductFile() {
    this.productfile = {
      _id: '',
      created_by: '',
      modified_by: '',
      product_id: this.productdatainfo.id
    }
  }

  upload(e) {
    const fileListAsArray = Array.from(e);
    fileListAsArray.forEach((item, i) => {
      const file = (e as HTMLInputElement);
      const url = URL.createObjectURL(file[i]);
      this.imgArr.push(url);
      this.fileArr.push({ item, url: url });
    })

    this.fileArr.forEach((item) => {
      this.fileObj.push(item.item)
    })

    // Set files form control
    this.form.patchValue({
      avatar: this.fileObj
    })

    this.form.get('avatar').updateValueAndValidity()

    // Upload to server
    this.uploadFileService.addFiles(this.form.value.avatar, this.productfile)
      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round(event.loaded / event.total * 100);
            console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:
            console.log('File uploaded successfully!', event.body);
            setTimeout(() => {
              this.progress = 0;
              this.fileArr = [];
              this.fileObj = [];
              this.msg = "File uploaded successfully!"
            }, 3000);
        }
      })
  }

  // Clean Url for showing image preview
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }


}







