import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { ProductService } from 'src/app/services/product.service';
import { UploadFilesService } from 'src/app/services/upload-product-files.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  public product: Product;
  public ProductData: [] = [];
  public productfiles = [];
  public categories = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public productdatainfo: any,
    private productService: ProductService,
    private notifier: NotifierService,
    public dialogRef: MatDialogRef<ProductDetailComponent>,
    private uploadProductFilesService: UploadFilesService,
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.initializeProduct();
    this.getProduct();
    this.getProductImages();
    this.getCategories();
  }


  getCategories() {
    this.categoryService.getAllCategorys().subscribe(returned_categories => {
      this.categories = returned_categories
      console.log('categories', this.categories)
    })
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
      category: '',
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

  // get product images
  getProductImages(): void {
    this.uploadProductFilesService.getFiles().subscribe(data => {
      this.ProductData = data;
      this.ProductData['productFiles'].filter(c => c.product_id === this.productdatainfo.id).map(element => {
        this.productfiles.push(...element['avatar']);
      });
    })
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
