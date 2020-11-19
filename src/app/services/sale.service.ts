import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
/* import { Observable } from 'rxjs/Observable'; */
import { Sale } from '../models/sale';
import { Global } from './global';
import { Observable } from 'rxjs';

@Injectable()
export class saleService{
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    testService(){
        return 'Probando service';
    }

    saveSale(sale: Sale): Observable<any>{
        let params = JSON.stringify(sale);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'save-sale', params, {headers:headers});
    }

    getSales(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url+'sales', {headers:headers});
    }

    getSale(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url+'sale/'+id, {headers:headers});
    }

    deleteSale(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.delete(this.url+'sale/'+id, {headers:headers});
    }

    updateSale(sale): Observable<any>{
        let params = JSON.stringify(sale);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.put(this.url+'sale/'+sale._id, params, {headers:headers});
    }
}