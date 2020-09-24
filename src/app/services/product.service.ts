import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private baseurl = 'http://localhost:3000/';

    constructor(private http: HttpClient) { }

    getAllProducts() {
        return this.http.get<Product[]>(this.baseurl + 'Products');
    }

    getProductById(id: string) {
        return this.http.get<Product>(this.baseurl + 'Products' + '/' + id);
    }

    addProduct(product: Product) {
        return this.http.post(this.baseurl + 'Products', product);
    }

    deleteProduct(id: string) {
        return this.http.delete(this.baseurl + 'Products' + '/' + id);
    }

    updateProduct(product: Product): Observable<Product> {
        return this.http.put<Product>(this.baseurl + 'Products' + '/' + product._id, product);
    }

}
