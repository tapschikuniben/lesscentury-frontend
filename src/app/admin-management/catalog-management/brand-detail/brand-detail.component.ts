import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Brand } from 'src/app/models/brand';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-brand-detail',
  templateUrl: './brand-detail.component.html',
  styleUrls: ['./brand-detail.component.css']
})
export class BrandDetailComponent implements OnInit {

  public brand: Brand;
  Brands: any = [];
  form: FormGroup;
  preview: string;
  percentDone: any = 0;

  constructor(
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public branddatainfo: any,
    private notifier: NotifierService,
    public dialogRef: MatDialogRef<BrandDetailComponent>,
    private fileUploadService: FileUploadService,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getBrand();
  }

  initializeForm() {
    // Reactive Form
    this.form = this.fb.group({
      brand_name: [''],
      avatar: [null],
      status: [''],
    })
  }

  // get brand by Id
  getBrand() {
    const brandId = this.branddatainfo.id
    console.log(this.branddatainfo)
    if (brandId) {
      this.fileUploadService.getBrandById(brandId).subscribe(returnedbrand => {
        this.brand = returnedbrand;
      })
    }
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
    this.fileUploadService.addBrand(
      this.form.value.brand_name,
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
          console.log('Brand successfully created!', event.body);
          this.percentDone = false;
          this.initializeForm();
          this.notifier.Notification("success", "Brand Successfully Created");
          this.dialogRef.close();
      }
    })
  }


  // update brand
  updateBrand(brand: Brand) {
    console.log('brand', brand)
  }

  close() {
    this.dialogRef.close();
  }

  getBrandNameErrorMessage() {
    return 'Enter brand name';
  }

}
