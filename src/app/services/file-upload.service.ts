import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Brand } from '../models/brand';

@Injectable({
    providedIn: 'root'
})

export class FileUploadService {

    //baseURL = "http://localhost:3000/";
    private baseURL = 'https://lesscentury.herokuapp.com/'
    headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private http: HttpClient) { }

    // Get Brands
    getBrands() {
        return this.http.get<Brand[]>(this.baseURL + 'Brands')
    }

    getBrandById(id: string) {
        return this.http.get<Brand>(this.baseURL + 'Brands' + '/' + id);
    }

    // Create Brand
    addBrand(name: string, profileImage: File, status: string): Observable<any> {
        var formData: any = new FormData();
        formData.append("brand_name", name);
        formData.append("avatar", profileImage);
        formData.append("status", status);

        return this.http.post<Brand>(`${this.baseURL}/create-brand`, formData, {
            reportProgress: true,
            observe: 'events'
        })
    }

    // delete brand

    deleteBrand(id: string) {
        return this.http.delete(this.baseURL + 'brands' + '/' + id);
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