import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Brand } from 'src/app/models/brand';
import { NotifierService } from 'src/app/services/notifier.service';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-detail',
  templateUrl: './brand-detail.component.html',
  styleUrls: ['./brand-detail.component.css']
})
export class BrandDetailComponent implements OnInit {

  public brand: Brand;

  constructor(
    @Inject(MAT_DIALOG_DATA) public branddatainfo: any,
    private brandService: BrandService,
    private notifier: NotifierService,
    public dialogRef: MatDialogRef<BrandDetailComponent>,
  ) { }

  ngOnInit(): void {
    this.initializeBrand();
    this.getBrand();
  }

  initializeBrand(): void {
    this.brand = {
      _id: '',
      brand_name: '',
      status: 'active',
    }
  }

  // get brand by Id
  getBrand() {
    const brandId = this.branddatainfo.id
    if (brandId) {
      this.brandService.getBrandById(brandId).subscribe(returnedbrand => {
        this.brand = returnedbrand;
      })
    }
  }

  // update brand
  updateBrand(currentbrand: Brand): void {
    {
      this.brandService.updateBrand(currentbrand).subscribe(updatedbrand => {
        this.brand = updatedbrand;
        if (updatedbrand) {
          this.notifier.Notification("success", "successfully updated.");
          this.getBrand();
        } else {
          this.notifier.Notification("warning", "failed to update.");
        }
      })
    }
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  getBrandNameErrorMessage() {
    return 'Enter brand name';
  }

}
