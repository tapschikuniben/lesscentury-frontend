import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    //private baseurl = 'http://localhost:3000/';
    private baseurl = 'https://lesscentury.herokuapp.com/'

    constructor(private http: HttpClient) { }

    getAllCategorys() {
        return this.http.get<Category[]>(this.baseurl + 'Categorys');
    }

    getCategoryById(id: string) {
        return this.http.get<Category>(this.baseurl + 'Categorys' + '/' + id);
    }

    addCategory(category: Category) {
        return this.http.post(this.baseurl + 'Categorys', category);
    }

    deleteCategory(id: string) {
        return this.http.delete(this.baseurl + 'Categorys' + '/' + id);
    }

    updateCategory(category: Category): Observable<Category> {
        return this.http.put<Category>(this.baseurl + 'Categorys' + '/' + category._id, category);
    }

}
