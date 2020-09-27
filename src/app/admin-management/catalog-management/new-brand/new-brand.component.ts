import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Brand } from 'src/app/models/brand';
import { NotifierService } from 'src/app/services/notifier.service';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-new-brand',
  templateUrl: './new-brand.component.html',
  styleUrls: ['./new-brand.component.css']
})
export class NewBrandComponent implements OnInit {

  public brand: Brand;
  public onBrandCreation = new EventEmitter();
  public selected_sku_status: boolean = true;

  constructor(
    private brandService: BrandService,
    private notifier: NotifierService,
    public dialogRef: MatDialogRef<NewBrandComponent>,
  ) { }

  ngOnInit(): void {
    // initialising brands
    this.initializeBrand();
  }

  initializeBrand(): void {
    this.brand = {
      _id: '',
      brand_name: '',
      status: 'active',
    }
  }

  addBrand(brand: Brand): void {
    this.brandService.addBrand(brand).subscribe(createdbrand => {
      if (createdbrand) {
        this.onBrandCreation.emit(createdbrand);
        this.notifier.Notification("success", "brand successfully saved.");
        this.initializeBrand();
      }
    })
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  getBrandNameErrorMessage() {
    return 'Enter brand name';
  }

}
