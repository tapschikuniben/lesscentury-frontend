import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Brand } from '../models/brand';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class BrandService {

    private baseurl = 'http://localhost:3000/';

    constructor(private http: HttpClient) { }

    getAllBrands() {
        return this.http.get<Brand[]>(this.baseurl + 'Brands');
    }

    getBrandById(id: string) {
        return this.http.get<Brand>(this.baseurl + 'Brands' + '/' + id);
    }

    addBrand(brand: Brand) {
        return this.http.post(this.baseurl + 'Brands', brand);
    }

    deleteBrand(id: string) {
        return this.http.delete(this.baseurl + 'Brands' + '/' + id);
    }

    updateBrand(brand: Brand): Observable<Brand> {
        return this.http.put<Brand>(this.baseurl + 'Brands' + '/' + brand._id, brand);
    }

}
