import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/product';
import { NotifierService } from 'src/app/services/notifier.service';
import { ProductService } from 'src/app/services/product.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { NewProductComponent } from '../new-product/new-product.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { UploadProductImageComponent } from '../upload-product-image/upload-product-image.component';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {

  public product: Product;
  public productDialogRef: MatDialogRef<NewProductComponent>;
  public productDetailRef: MatDialogRef<ProductDetailComponent>;
  public ProductData: any = [];
  public dataSource: MatTableDataSource<Product>;
  @ViewChild('product_paginator', { static: true }) product_paginator: MatPaginator;
  public pageSizeOptions: number[] = [];
  public pageEvent: PageEvent;
  public pageSize = 5;
  public color: ThemePalette = 'accent';
  public checked = false;
  public disabled = false;
  public displayedColumns: string[] = ['product_name', 'category', 'price', 'delivery_mode', 'quantity', 'status', 'is_feature', 'todays_deals', 'upload', 'view', 'action'];


  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private notifier: NotifierService,
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.initializePageSizeOptions();
  }

  //create new product
  openNewProductDialog() {
    this.productDialogRef = this.dialog.open(NewProductComponent, { width: '50%', maxHeight: '620px' });

    this.productDialogRef.updatePosition({
      top: '4%',
    });

    this.productDialogRef.afterClosed().subscribe(result => {
      this.getAllProducts();
    });
  }

  //getting all products
  getAllProducts(): void {
    // get main product
    this.productService.getAllProducts().subscribe(data => {
      this.ProductData = data;
      this.dataSource = new MatTableDataSource<Product>(this.ProductData);
      setTimeout(() => {
        this.dataSource.paginator = this.product_paginator;
      }, 0);
    })
  }

  //deleting product
  deleteProduct(index: number, e) {
    const data = this.dataSource.data;
    console.log('page index', this.product_paginator.pageIndex)
    data.splice((this.product_paginator.pageIndex * this.product_paginator.pageSize) + index, 1);
    this.dataSource.data = data;
    this.productService.deleteProduct(e.id).subscribe()
  }

  //confirm to delete product
  confirmDialog(myindex: number, e): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '500px', data: "NB: This can not be undone" });

    dialogRef.updatePosition({
      top: '8%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        this.deleteProduct(myindex, e);
        this.notifier.Notification("success", "successfully deleted.");
      } else {
        this.notifier.Notification("warning", "action aborted");
      }
    });
  }

  //open product details
  openProductDetail(selected): void {
    const dialogRef = this.dialog.open(ProductDetailComponent, {
      width: '50%',
      maxHeight: '620px',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '4%',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllProducts();
    });
  }

  public applyProductFilter(filterValue: any) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator.firstPage();
  }

  //toggle switch changes
  updatingProduct(currentproduct) {
    this.productService.updateProduct(currentproduct).subscribe(updatedproduct => {
      this.product = updatedproduct;
      if (updatedproduct) {
        this.notifier.Notification("success", "successfully updated.");
      } else {
        this.notifier.Notification("warning", "failed to update.");
      }
    })
  }

  //upload images
  uploadProductImage(selected) {
    const dialogRef = this.dialog.open(UploadProductImageComponent, {
      width: '50%',
      maxHeight: '620px',
      data: selected,
    });

    dialogRef.updatePosition({
      top: '4%',
    });
  }

  public todayDealsChange(currentproduct) {
    this.updatingProduct(currentproduct)
  }

  public isFeatureChange(currentproduct) {
    this.updatingProduct(currentproduct)
  }

  initializePageSizeOptions(): void {
    for (let i = 5; i <= 1000; i += 5) {
      this.pageSizeOptions.push(i);
    }
  }

}
