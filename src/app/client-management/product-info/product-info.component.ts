import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { UploadFilesService } from 'src/app/services/upload-product-files.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {

  public productId = this.route.snapshot.paramMap.get('id');
  public product: Product;
  public ProductData: [] = [];
  public productfiles = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private uploadProductFilesService: UploadFilesService,
  ) { }

  ngOnInit(): void {
    this.getProduct();
    this.getProductImages();
  }

  getProduct() {
    const productId = this.productId;
    if (productId) {
      this.productService.getProductById(productId).subscribe(returnedproduct => {
        this.product = returnedproduct;
        console.log('returned product', this.product)
      })
    }
  }

  // get product images
  getProductImages(): void {
    const productId = this.productId;
    this.uploadProductFilesService.getFiles().subscribe(data => {
      this.ProductData = data;
      this.ProductData['productFiles'].filter(c => c.product_id === productId).map(element => {
        this.productfiles.push(...element['avatar']);

        console.log('images', this.productfiles)
      });
    })
  }

}
