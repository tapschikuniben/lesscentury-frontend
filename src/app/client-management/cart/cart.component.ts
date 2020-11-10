import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { ProductService } from 'src/app/services/product.service';
import { UploadFilesService } from 'src/app/services/upload-product-files.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public products = [];
  public images = [];
  public product: any;
  public cart_total_items: number;
  public total_amaount: any;
  public my_images = [];
  public isLoggedIn = false;
  public roles: string[] = [];
  public user: string = '';

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private uploadProductFilesService: UploadFilesService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private notifier: NotifierService,
  ) { }

  ngOnInit(): void {
    this.getCartItems()
    this.getCartTotal();
    this.matchProductsToImages();
    this.checkToken();
  }

  checkToken() {
    if (this.tokenStorageService?.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorageService?.getUser().roles;
      this.user = this.tokenStorageService?.getUser().username;
    }
  }

  // calcTotal() {
  //   return this.products.reduce((acc, prod) => acc += prod.num, 0)
  // }
  getCartItems() {
    this.cartService.getItems().map(product =>
      this.products.push(product))
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

  addCartItem(product_id) {
    this.getProductById(product_id).then(element => {
      this.product = element;
      this.cartService.addToCart(this.product);
      this.getCartTotal();
      this.totalCartItems();
    })
  }

  removeCartItem(product) {
    this.cartService.removeFromCart(product)
    this.getCartTotal();
    this.totalCartItems();
  }

  modelChanged(product, event) {
    if (product.num === 0) {
      this.cartService.removeProduct(product)
      this.getCartTotal();
      this.totalCartItems();
      return;
    }
    this.getCartTotal();
    this.totalCartItems();
  }

  getCartTotal() {
    this.cartService.cartTotalAmount().then(element => {
      this.total_amaount = element;
    })
  }

  clearCart() {
    this.cartService.clearCart();
  }

  matchProductsToImages() {
    this.cartService.getItems().map(element => {
      this.uploadProductFilesService.getFiles().subscribe(data => {
        this.images = data;
        let my_images = (this.images['productFiles'].filter(u => u.product_id === element._id))
        my_images.map(w => {
          this.my_images.push(w['avatar'][0])
        })
      })
    })
  }

  checkout() {
    if (this.products.length > 0) {
      if (this.isLoggedIn === true) {
        const url = `/checkout`;
        this.router.navigate([url]);
      } else {
        const url = `/login`;
        this.router.navigate([url]);
      }
    } else {
      this.notifier.Notification("success", "Your Cart is Empty");
    }
  }

  totalCartItems() {
    this.cart_total_items = this.cartService.calcTotalNumberOfItems();
    this.cartService.changeCartItems(this.cart_total_items);
  }
}
