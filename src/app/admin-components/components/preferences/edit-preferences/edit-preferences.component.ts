import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Preferences } from 'src/app/models/preferences';
import { PreferencesService } from 'src/app/services/preferences.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-edit-preferences',
  templateUrl: '../add-preferences/add-preferences.component.html',
  styleUrls: ['./edit-preferences.component.css'],
  providers: [PreferencesService, UploadService]
})
export class EditPreferencesComponent implements OnInit {
  public preferences!: Preferences;
  public status!: string;
  public save_preferences!: any;
  public preferenceses!: Preferences[];
  formPreferences!: FormGroup;

  constructor(
    private _preferencesServices: PreferencesService,
    private formBuilder: FormBuilder,
  ) {
    this.buildForm();
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
            this.formPreferences.patchValue(this.preferences)
          })
        }
      },
      error => { console.log(<any>error); }
    )
  }

  onSubmit(form: any) {
    this.status = 'loading';
    this.preferences = this.formPreferences.value;
    //Save the data
    this._preferencesServices.updatePreferences(this.preferences).subscribe(
      response => {
        if (response.preferences) {
          this.status = 'succes';
          console.log(response);
          this.save_preferences = response.preferences;
        } else { this.status = 'failed'; }
      },
      error => { console.log(<any>error); }
    );
  }

  private buildForm() {
    this.formPreferences = this.formBuilder.group({
      _id: ['', Validators.required],
      nameCommerce: ['', Validators.required],
      descriptionCommerce: [],
      nameBankAccount: [''],
      CBUBank: [],
      boxTypeBank: [],
      nameBank: [''],
      terminosYCondiciones: [''],
      phoneContact: [],
      emailContact: [],
      ubicationContact: [''],
      facebook: [''],
      instagram: [''],
      twitter: [''],
      linkedin: [''],
      imageBanner: ['']
    });
  }

}
