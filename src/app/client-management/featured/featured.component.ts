
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { NotifierService } from 'src/app/services/notifier.service';
import { ProductService } from 'src/app/services/product.service';
import { UploadFilesService } from 'src/app/services/upload-product-files.service';
import { CartService } from './../../services/cart.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.css']
})
export class FeaturedComponent implements OnInit {

  public ProductData: [] = [];
  public title = 'Card View Demo';
  public gridColumns = 5;
  public productfiles: [] = [];
  public products = [];
  public product_id: string;
  public products_details;
  public defaultElevation = 2;
  public raisedElevation = 16;
  public images = [];
  public new = [];
  public my_images = [];
  public product: any;
  public cart_total_items: number;
  public cart_items: number;

  constructor(
    private uploadProductFilesService: UploadFilesService,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private notifier: NotifierService,
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getProductImages();
    this.matchProductsToImages();
    this.getCurrentCartItems();
  }

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

  getProducts() {
    this.productService.getAllProducts().subscribe(element => {
      this.products = element;
    })
  }

  // get product images
  getProductImages(): void {
    this.uploadProductFilesService.getFiles().subscribe(data => {
      this.ProductData = data;
    })
  }

  matchProductsToImages() {
    this.productService.getAllProducts().subscribe(element => {
      this.uploadProductFilesService.getFiles().subscribe(data => {
        this.images = data;
        element.map(x => {
          let my_images = (this.images['productFiles'].filter(u => u.product_id === x._id))
          my_images.map(w => {
            this.my_images.push(w['avatar'][0])
          })
        })
      })
    })
  }

  onSelectProduct(product_id): void {
    const url = `/product/${product_id}`;
    this.router.navigate([url]);
  }

  getProductById(product_id) {
    const promise = new Promise((resolve, reject) => {
      return this.productService.getProductById(product_id).toPromise().then(res => {
        resolve(res)
      },
        msg => {
          reject(msg)
        });
    })
    return promise;
  }

  onSelectAddToCart(product_id) {
    this.getProductById(product_id).then(element => {
      this.product = element;
      this.cartService.addToCart(this.product);
      this.notifier.Notification("success", "successfully added item");
      this.getCartTotal();
      this.totalCartItems();
    })
  }

  getCartTotal() {
    this.cartService.cartTotalAmount().then(elemnt => {
      console.log('cart amount', elemnt)
    })
  }

  getCurrentCartItems() {
    this.cartService.currentCartItems.subscribe(cart_items => {
      this.cart_items = cart_items;
    })
  }

  totalCartItems() {
    this.cart_total_items = this.cartService.calcTotalNumberOfItems();
    this.cartService.changeCartItems(this.cart_total_items);
  }
}
