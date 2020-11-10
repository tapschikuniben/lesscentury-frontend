import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './../models/product';

@Injectable({
    providedIn: 'root'
})

export class CartService {


    private cart_total_items$ = new BehaviorSubject(0);
    public currentCartItems = this.cart_total_items$.asObservable();

    public items = [];
    products = [];

    constructor() { }


    addToCart(product: Product) {
        const productExistInCart = this.items.find(({ id }) => id === product._id);

        if (!productExistInCart) {
            //enhance "porduct" opject with "num" property
            this.items.push({ ...product, num: 1 });
            console.log(this.items)
            return;
        }
        productExistInCart.num += 1;
        console.log(this.items)
    }

    removeFromCart(product: Product) {
        const product_in_cart = this.items.find(({ id }) => id === product._id);
        product_in_cart.num -= 1;
    }

    //calculating cuurent items totals
    getItems() {
        return this.items
    }

    removeProduct1(product_id) {
        // let index = this.items.findIndex(element => {
        //     element.id === product_id
        // });
        // this.items.splice(index, 1)
    }

    removeProduct(product: Product) {
        this.items = this.items.filter(({ id }) => id !== product._id)
    }

    calcTotalNumberOfItems() {
        return this.items.reduce((acc, item) => acc += item.num, 0)
    }

    cartTotalAmount() {
        return new Promise((resolve) => {
            let total = 0;
            this.items.map((item) => {
                total = total + Number(item.price * item.num);
            });
            resolve(total);
        });
    }

    clearCart() {
        this.items = [];
        return this.items;
    }


    changeCartItems(cart_items: number) {
        this.cart_total_items$.next(cart_items)
    }
}