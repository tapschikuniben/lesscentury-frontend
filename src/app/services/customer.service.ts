import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from '../models/customer';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    private baseurl = 'http://localhost:3000/';

    constructor(private http: HttpClient) { }

    getAllCustomers() {
        return this.http.get<Customer[]>(this.baseurl + 'Customers');
    }

    getCustomerById(id: string) {
        return this.http.get<Customer>(this.baseurl + 'Customers' + '/' + id);
    }

    addCustomer(customer: Customer) {
        return this.http.post(this.baseurl + 'Customers', customer);
    }

    deleteCustomer(id: string) {
        return this.http.delete(this.baseurl + 'Customers' + '/' + id);
    }

    updateCustomer(customer: Customer): Observable<Customer> {
        return this.http.put<Customer>(this.baseurl + 'Customers' + '/' + customer._id, customer);
    }

}
