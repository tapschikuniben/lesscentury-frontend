import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';
import { NotifierService } from 'src/app/services/notifier.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  public product: Product;

  constructor(
    @Inject(MAT_DIALOG_DATA) public productdatainfo: any,
    private productService: ProductService,
    private notifier: NotifierService,
    public dialogRef: MatDialogRef<ProductDetailComponent>,
  ) { }

  ngOnInit(): void {
    this.initializeProduct();
    this.getProduct();
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
      delivery_mode: '',
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
      location: '',
      delete_flag: '',
      condition: '',
      todays_deals: true,
      is_feature: false,
      status: '',
      created_by: '',
      modified_by: '',
      created_date: new Date(Date.now()),
      modified_date: new Date(Date.now()),
    }
  }

  // get product by Id
  getProduct() {
    const productId = this.productdatainfo.id
    if (productId) {
      this.productService.getProductById(productId).subscribe(returnedproduct => {
        this.product = returnedproduct;
      })
    }
  }

  // update product
  updateProduct(currentproduct: Product): void {
    {
      this.productService.updateProduct(currentproduct).subscribe(updatedproduct => {
        this.product = updatedproduct;
        if (updatedproduct) {
          this.notifier.Notification("success", "successfully updated.");
          this.getProduct();
        } else {
          this.notifier.Notification("warning", "failed to update.");
        }
      })
    }
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  getProductNameErrorMessage() {
    return 'Enter product name';
  }

}
