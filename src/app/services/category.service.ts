import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
/* import { Observable } from 'rxjs/Observable'; */
import { Category } from '../models/category';
import { Global } from './global';
import { Observable } from 'rxjs';

@Injectable()
export class CategoryService{
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }


    saveCategory(category: Category): Observable<any>{
        let params = JSON.stringify(category);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'save-category', params, {headers:headers});
    }

    getCategories(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url+'categories', {headers:headers});
    }

    getCategory(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url+'category/'+id, {headers:headers});
    }

    deleteCategory(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.delete(this.url+'category/'+id, {headers:headers});
    }

    updateCategory(category): Observable<any>{
        let params = JSON.stringify(category);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.put(this.url+'category/'+category._id, params, {headers:headers});
    }
}