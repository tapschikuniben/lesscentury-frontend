// import { Component, EventEmitter, OnInit } from '@angular/core';
// import { MatDialogRef } from '@angular/material/dialog';
// import { Brand } from 'src/app/models/brand';
// import { NotifierService } from 'src/app/services/notifier.service';
// import { BrandService } from 'src/app/services/brand.service';

// @Component({
//   selector: 'app-new-brand',
//   templateUrl: './new-brand.component.html',
//   styleUrls: ['./new-brand.component.css']
// })
// export class NewBrandComponent implements OnInit {

//   public brand: Brand;
//   public onBrandCreation = new EventEmitter();
//   public selected_sku_status: boolean = true;

//   constructor(
//     private brandService: BrandService,
//     private notifier: NotifierService,
//     public dialogRef: MatDialogRef<NewBrandComponent>,
//   ) { }

//   ngOnInit(): void {
//     // initialising brands
//     this.initializeBrand();
//   }

//   initializeBrand(): void {
//     this.brand = {
//       _id: '',
//       brand_name: '',
//       status: 'active',
//     }
//   }

//   addBrand(brand: Brand): void {
//     this.brandService.addBrand(brand).subscribe(createdbrand => {
//       if (createdbrand) {
//         this.onBrandCreation.emit(createdbrand);
//         this.notifier.Notification("success", "brand successfully saved.");
//         this.initializeBrand();
//       }
//     })
//   }

//   onCloseClick(): void {
//     this.dialogRef.close();
//   }

//   getBrandNameErrorMessage() {
//     return 'Enter brand name';
//   }

// }










import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { FileUploadService } from '../../../services/file-upload.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-new-brand',
  templateUrl: './new-brand.component.html',
  styleUrls: ['./new-brand.component.css']
})
export class NewBrandComponent implements OnInit {
  preview: string;
  form: FormGroup;
  percentDone: any = 0;
  brands = [];

  constructor(
    public fb: FormBuilder,
    public fileUploadService: FileUploadService,
    public dialogRef: MatDialogRef<NewBrandComponent>,
    private notifier: NotifierService,
  ) {

  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    // Reactive Form
    this.form = this.fb.group({
      brand_name: [''],
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


  onCloseClick(): void {
    this.dialogRef.close();
  }


}

