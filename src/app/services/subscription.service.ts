import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from '../models/subscription';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
    providedIn: 'root'
})
export class SubscriptionService {

    private baseurl = 'http://localhost:3000/';
    //private baseurl = 'https://lesscentury.herokuapp.com/'

    constructor(private http: HttpClient) { }

    getAllSubscriptions() {
        return this.http.get<Subscription[]>(this.baseurl + 'Subscriptions');
    }

    getSubscriptionById(id: string) {
        return this.http.get<Subscription>(this.baseurl + 'Subscriptions' + '/' + id);
    }

    addSubscription(subscription: Subscription) {
        return this.http.post(this.baseurl + 'Subscriptions', subscription);
    }

    deleteSubscription(id: string) {
        return this.http.delete(this.baseurl + 'Subscriptions' + '/' + id);
    }

    updateSubscription(subscription: Subscription): Observable<Subscription> {
        return this.http.put<Subscription>(this.baseurl + 'Subscriptions' + '/' + subscription._id, subscription);
    }

}
