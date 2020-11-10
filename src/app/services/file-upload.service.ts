import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Brand } from '../models/brand';
import { Banner } from '../models/banner';

@Injectable({
    providedIn: 'root'
})

export class FileUploadService {

    baseURL = "http://localhost:3000/";
    //private baseURL = 'https://lesscentury.herokuapp.com/'
    headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private http: HttpClient) { }

    /**
     * Restful Api's for Brands
     */

    // Get Brands
    getBrands(): Observable<any> {
        return this.http.get<Brand[]>(this.baseURL + 'Brands')
    }

    //Get Brand by ID 
    getBrandById(id: string) {
        return this.http.get<Brand>(this.baseURL + 'Brands' + '/' + id);
    }

    // Create Brand
    addBrand(name: string, profileImage: File, status: string): Observable<any> {
        var formData: any = new FormData();
        formData.append("brand_name", name);
        formData.append("avatar", profileImage);
        formData.append("status", status);

        return this.http.post<Brand>(this.baseURL + 'create-brand', formData, {
            reportProgress: true,
            observe: 'events'
        })
    }

    // Delete brand

    deleteBrand(id: string) {
        return this.http.delete(this.baseURL + 'brands' + '/' + id);
    }

    /**
     * 
    * Restful Api's for Brands
    */

    // Get Banners
    getBanners() {
        return this.http.get<Banner[]>(this.baseURL + 'Banners')
    }

    //Get Banner by ID 
    getBannerById(id: string) {
        return this.http.get<Banner>(this.baseURL + 'Banners' + '/' + id);
    }

    // Create Banner
    addBanner(name: string, title: string, product_name: string, product_amount_from: string, product_description: string, profileImage: File, status: string): Observable<any> {
        var formData: any = new FormData();
        formData.append("banner_name", name);
        formData.append("title", title);
        formData.append("product_name", product_name);
        formData.append("product_amount_from", product_amount_from);
        formData.append("product_description", product_description);
        formData.append("avatar", profileImage);
        formData.append("status", status);

        return this.http.post<Banner>(this.baseURL + 'create-banner', formData, {
            reportProgress: true,
            observe: 'events'
        })
    }

    // Delete banner
    deleteBanner(id: string) {
        return this.http.delete(this.baseURL + 'banners' + '/' + id);
    }

    // Error handling 
    errorMgmt(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }

}