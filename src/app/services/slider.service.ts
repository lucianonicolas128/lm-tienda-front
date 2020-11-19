import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
/* import { Observable } from 'rxjs/Observable'; */
import { Slider } from '../models/slider';
import { Global } from './global';
import { Observable } from 'rxjs';

@Injectable()
export class SliderService{
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }


    saveSlider(slider: Slider): Observable<any>{
        let params = JSON.stringify(slider);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'save-slider', params, {headers:headers});
    }

    getSliders(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url+'sliders', {headers:headers});
    }

    getSlider(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url+'slider/'+id, {headers:headers});
    }

    deleteSlider(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.delete(this.url+'slider/'+id, {headers:headers});
    }

    updateSlider(slider): Observable<any>{
        let params = JSON.stringify(slider);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.put(this.url+'slider/'+slider._id, params, {headers:headers});
    }
}