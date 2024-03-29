import { Component, OnInit } from '@angular/core';
import { Preferences } from 'src/app/models/preferences';
import { PreferencesService } from 'src/app/services/preferences.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css'],
  providers: [PreferencesService]

})
export class PreferencesComponent implements OnInit {
  public preferences!: Preferences;
  public preferenceses!: Preferences[];

  constructor(
    private _preferencesServices: PreferencesService,
  ) { }

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
            // console.log(this.preferences)
          })
        }
      },
      error => { console.log(<any>error); }
    )
  }

}
