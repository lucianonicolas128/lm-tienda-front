import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Preferences } from 'src/app/models/preferences';
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
  public status!: string;
  public save_preferences!: any;
  public preferenceses!: Preferences[];
  formPreferences!: FormGroup;

  constructor(
    private _preferencesServices: PreferencesService,
    private formBuilder: FormBuilder,
  ) {
    this.preferences = new Preferences('', '', '', 0, '', '', '', '', '', '', '', '', '', '', '');
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
        }
      },
      error => { console.log(<any>error); }
    )
  }


  onSubmit(form: any) {
    this.status = 'loading';
    this._preferencesServices.savePreferences(this.preferences).subscribe(
      response => {
        if (response.preferences) {
          this.status = 'succes';
          console.log(response);
          this.save_preferences = response.preferences;
          // form.reset();
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
      nameBankAccount: [],
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
