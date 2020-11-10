import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DeliveryAddress } from '../models/deliveryAddress';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class DeliveryAddressService {

    private baseurl = 'http://localhost:3000/';
    //private baseurl = 'https://lesscentury.herokuapp.com/'

    constructor(private http: HttpClient) { }

    getAllDeliveryAddresss() {
        return this.http.get<DeliveryAddress[]>(this.baseurl + 'DeliveryAddresss');
    }

    getDeliveryAddressById(id: string) {
        return this.http.get<DeliveryAddress>(this.baseurl + 'DeliveryAddresss' + '/' + id);
    }

    addDeliveryAddress(deliveryAddress: DeliveryAddress) {
        return this.http.post(this.baseurl + 'DeliveryAddresss', deliveryAddress);
    }

    deleteDeliveryAddress(id: string) {
        return this.http.delete(this.baseurl + 'DeliveryAddresss' + '/' + id);
    }

    updateDeliveryAddress(deliveryAddress: DeliveryAddress): Observable<DeliveryAddress> {
        return this.http.put<DeliveryAddress>(this.baseurl + 'DeliveryAddresss' + '/' + deliveryAddress._id, deliveryAddress);
    }

}
