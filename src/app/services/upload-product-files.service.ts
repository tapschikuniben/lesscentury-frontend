import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductFile } from '../models/productfile';
import { Product } from '../models/product';

@Injectable({
    providedIn: 'root'
})
export class UploadFilesService {

    //private baseUrl = 'http://localhost:3000';
    private baseUrl = 'https://lesscentury.herokuapp.com/'
    

    constructor(private http: HttpClient) { }

    addFiles(images: File, ProductFile: ProductFile): Observable<any> {
        var arr = []
        var formData = new FormData();

        arr.push(images);

        arr[0].forEach((item, i) => {
            formData.append('avatar', arr[0][i]);
        });

        formData.append('created_by', ProductFile.created_by);
        formData.append('modified_by', ProductFile.modified_by);
        formData.append('product_id', ProductFile.product_id);
        formData.append('product_name', ProductFile.product_name);
        formData.append('product_amount', ProductFile.product_amount);


        return this.http.post(`${this.baseUrl}/createProductFile`, formData, {
            reportProgress: true,
            observe: 'events'
        }).pipe(
            catchError(this.errorMgmt)
        )
    }

    getFiles(): Observable<any> {
        return this.http.get(`${this.baseUrl}/productFiles`);
    }

    getFileById(id: string) {
        return this.http.get<ProductFile>(`${this.baseUrl}/productFiles/${id}`);
    }


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
