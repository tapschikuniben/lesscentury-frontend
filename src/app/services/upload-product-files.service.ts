import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductFile } from '../models/productfile';

@Injectable({
    providedIn: 'root'
})
export class UploadFilesService {

    private baseUrl = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    addFiles(images: File, ProductFile: ProductFile) {
        var arr = []
        var formData = new FormData();
        arr.push(images);

        arr[0].forEach((item, i) => {
            formData.append('avatar', arr[0][i]);
        });

        formData.append('created_by', ProductFile.created_by);
        formData.append('modified_by', ProductFile.modified_by);
        formData.append('product_id', ProductFile.product_id);


        return this.http.post('http://localhost:3000/createProductFile', formData, {
            reportProgress: true,
            observe: 'events'
        }).pipe(
            catchError(this.errorMgmt)
        )
    }

    getFiles(): Observable<any> {
        return this.http.get(`${this.baseUrl}/productFiles`);
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
