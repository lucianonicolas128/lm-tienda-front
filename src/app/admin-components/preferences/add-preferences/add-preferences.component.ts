import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Preferences } from 'src/app/models/preferences';
import { Global } from 'src/app/services/global';
import { PreferencesService } from 'src/app/services/preferences.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-add-preferences',
  templateUrl: './add-preferences.component.html',
  styleUrls: ['./add-preferences.component.css'],
  providers: [PreferencesService, UploadService]
})
export class AddPreferencesComponent implements OnInit {
  public preferences: Preferences;
  public status: string;
  public save_preferences;
  public url: string;
  public preferenceses: Preferences[];

  constructor(
    private _preferencesServices: PreferencesService,
    private _uploadService: UploadService,
    private _router: Router,
    private _route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.preferences = new Preferences('', '', '', null, '', '', '', '', '', '', '', '', '', '', '');
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
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }


  onSubmit(form) {
    // this.product.stockTalles = JSON.stringify(this.tallesArray);
    // this.product.image = this.imageUrl;
    this.status = 'loading';

    //Save the data
    this._preferencesServices.savePreferences(this.preferences).subscribe(
      response => {
        if (response.preferences) {
          this.status = 'succes';
          console.log(response);
          this.save_preferences = response.preferences;
          form.reset();
        } else {
          this.status = 'failed';
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }


}
