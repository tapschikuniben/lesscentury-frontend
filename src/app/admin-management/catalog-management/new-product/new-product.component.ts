import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';
import { NotifierService } from 'src/app/services/notifier.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  public product: Product;
  public onProductCreation = new EventEmitter();

  constructor(
    private productService: ProductService,
    private notifier: NotifierService,
    public dialogRef: MatDialogRef<NewProductComponent>,
  ) { }

  ngOnInit(): void {
    // initialising products
    this.initializeProduct();
  }

  initializeProduct(): void {
    this.product = {
      _id: '',
      sku: {
        sku_name: '',
        sku_status: 'active',
      },
      upc: '',
      quantity: 0,
      stock_status_id: '',
      image_path: '',
      manufacturer_id: '',
      supplier: '',
      delivery_mode: 'car',
      price: 0,
      date_available: new Date(Date.now()),
      sort_index: 0,
      product_name: '',
      description: '',
      amount: 0,
      meta_tag_title: '',
      meta_tag_description: '',
      meta_tag_keyword: '',
      discount: 0,
      subtract_stock: 0,
      minimum_quantity: 0,
      location: 'harare',
      delete_flag: '',
      condition: '',
      todays_deals: true,
      is_feature: false,
      status: 'active',
      created_by: '',
      modified_by: '',
      created_date: new Date(Date.now()),
      modified_date: new Date(Date.now()),
    }
  }

  addProduct(product: Product): void {
    this.productService.addProduct(product).subscribe(createdproduct => {
      if (createdproduct) {
        this.onProductCreation.emit(createdproduct);
        this.notifier.Notification("success", "product successfully saved.");
        this.initializeProduct();
      }
    })
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  getProductNameErrorMessage() {
    return 'Enter product name';
  }

}
