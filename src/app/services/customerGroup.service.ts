import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CustomerGroup } from '../models/customerGroup';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class CustomerGroupService {

    //private baseurl = 'http://localhost:3000/';
    private baseurl = 'https://lesscentury.herokuapp.com/'

    constructor(private http: HttpClient) { }

    getAllCustomerGroups() {
        return this.http.get<CustomerGroup[]>(this.baseurl + 'CustomerGroups');
    }

    getCustomerGroupById(id: string) {
        return this.http.get<CustomerGroup>(this.baseurl + 'CustomerGroups' + '/' + id);
    }

    addCustomerGroup(customerGroup: CustomerGroup) {
        return this.http.post(this.baseurl + 'CustomerGroups', customerGroup);
    }

    deleteCustomerGroup(id: string) {
        return this.http.delete(this.baseurl + 'CustomerGroups' + '/' + id);
    }

    updateCustomerGroup(customerGroup: CustomerGroup): Observable<CustomerGroup> {
        return this.http.put<CustomerGroup>(this.baseurl + 'CustomerGroups' + '/' + customerGroup._id, customerGroup);
    }

}
