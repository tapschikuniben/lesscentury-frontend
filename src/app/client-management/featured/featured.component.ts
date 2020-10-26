import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductFile } from 'src/app/models/productfile';
import { ProductService } from 'src/app/services/product.service';
import { UploadFilesService } from 'src/app/services/upload-product-files.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.css']
})
export class FeaturedComponent implements OnInit {

  public ProductData: [] = [];
  public title = 'Card View Demo';
  public gridColumns = 5;
  public productfiles = [];
  public products;
  public product_id: string;
  public products_details;
  public defaultElevation = 2;
  public raisedElevation = 16;

  constructor(
    private uploadProductFilesService: UploadFilesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getProductImages();
  }

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

  // get product images
  getProductImages(): void {
    this.uploadProductFilesService.getFiles().subscribe(data => {
      this.ProductData = data;
      this.ProductData['productFiles'].map(element => {
        this.productfiles.push(element);
      });
    })
  }

  onSelectProduct(product_id: ProductFile): void {
    const url = `/product/${product_id}`;
    this.router.navigate([url]);
  }

}
