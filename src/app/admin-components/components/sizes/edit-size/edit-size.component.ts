import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Talles } from 'src/app/models/talles';
import { TallesService } from 'src/app/services/talles.service';

export interface DialogData {
  _id: string;
}

@Component({
  selector: 'app-edit-size',
  templateUrl: '../add-size/add-size.component.html',
  styleUrls: ['./edit-size.component.css'],
  providers: [TallesService]
})
export class EditSizeComponent implements OnInit {
  public formTalle!: FormGroup;
  public talle!: Talles;
  public status!: string;

  constructor(
    private formBuilder: FormBuilder,
    private _tallesService: TallesService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.talle = new Talles('', '', '', '', '');
    this.buildForm();
   }

  ngOnInit(): void {
    this.getSize(this.data._id);
  }

  getSize(id: any){
    this._tallesService.getTalles(id).subscribe(
      response => {
        this.talle = response.talle;
        this.formTalle.patchValue(response.talle);
      }
    )
  }

  onSubmit(form: any) {
    this.talle = this.formTalle.value;
    this.status = 'loading';

    this._tallesService.updateTalles(this.talle).subscribe(
      response => {
        if (this.talle) {
          this.status = 'success';
        } else (this.status = 'failed');
      },
      error => { console.log(<any>error); }
    )
  }

  private buildForm() {
    this.formTalle = this.formBuilder.group({
      _id: [''],
      talleName: ['', Validators.required],
      ancho: [],
      alto: [],
      detalle: [''],
    });
  }


}
