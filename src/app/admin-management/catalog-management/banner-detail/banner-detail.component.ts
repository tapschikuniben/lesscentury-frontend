import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Banner } from 'src/app/models/banner';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-banner-detail',
  templateUrl: './banner-detail.component.html',
  styleUrls: ['./banner-detail.component.css']
})
export class BannerDetailComponent implements OnInit {

  public banner: Banner;
  Banners: any = [];
  form: FormGroup;
  preview: string;
  percentDone: any = 0;

  constructor(
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public bannerdatainfo: any,
    private notifier: NotifierService,
    public dialogRef: MatDialogRef<BannerDetailComponent>,
    private fileUploadService: FileUploadService,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getBanner();
  }

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

  // get banner by Id
  getBanner() {
    const bannerId = this.bannerdatainfo.id
    console.log(this.bannerdatainfo)
    if (bannerId) {
      this.fileUploadService.getBannerById(bannerId).subscribe(returnedbanner => {
        this.banner = returnedbanner;
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

  }

  // update banner
  updateBanner(banner: Banner) {
    console.log('banner', banner)
  }

  close() {
    this.dialogRef.close();
  }

  getBannerNameErrorMessage() {
    return 'Enter banner name';
  }

}
