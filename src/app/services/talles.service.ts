import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
/* import { Observable } from 'rxjs/Observable'; */
import { Talles } from '../models/talles';
import { Global } from './global';
import { Observable } from 'rxjs';

@Injectable()
export class TallesService{
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }


    saveTalles(talles: Talles): Observable<any>{
        let params = JSON.stringify(talles);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'save-talle', params, {headers:headers});
    }

    getAllTalles(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url+'talles', {headers:headers});
    }

    getTalles(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url+'talle/'+id, {headers:headers});
    }

    deleteTalles(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.delete(this.url+'talle/'+id, {headers:headers});
    }

    updateTalles(talles): Observable<any>{
        let params = JSON.stringify(talles);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.put(this.url+'talle/'+talles._id, params, {headers:headers});
    }
}