import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Preferences } from 'src/app/models/preferences';
import { Global } from 'src/app/services/global';
import { PreferencesService } from 'src/app/services/preferences.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css'],
  providers: [PreferencesService]

})
export class PreferencesComponent implements OnInit {
  public preferences: Preferences;
  public preferenceses: Preferences[];
  public url: string;

  constructor(
    private _preferencesServices: PreferencesService,
    private _router: Router,
    private _route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.getPreferenceses();
  }

  getPreferenceses() {
    this._preferencesServices.getPreferenceses().subscribe(
      response => {
        if (response.preferenceses) {
          this.preferenceses = response.preferenceses;
          this.preferenceses.forEach(preferences => {
            this.preferences = preferences;
          }
          )
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }



}
