import { Component, OnInit, ViewChild } from '@angular/core';
import { resolve } from 'dns';
import { CartService } from 'src/app/services/cart.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isLoggedIn = false;
  public roles: string[] = [];
  public user: string = '';
  cart_items: number;

  constructor(
    private cartService: CartService,
    private tokenStorageService: TokenStorageService,
  ) { }

  ngOnInit(): void {
    this.getCartItems();
    this.checkToken();
    this.cartService.currentCartItems.subscribe(cart_items => this.cart_items = cart_items)
  }

  checkToken() {
    if (this.tokenStorageService?.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorageService?.getUser().roles;
      this.user = this.tokenStorageService?.getUser().username;
    }
  }

  getCartItems() {
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.isLoggedIn = false;
  }

}
