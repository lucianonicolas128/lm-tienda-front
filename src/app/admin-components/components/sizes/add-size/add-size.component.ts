import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Talles } from 'src/app/models/talles';
import { TallesService } from 'src/app/services/talles.service';

@Component({
  selector: 'app-add-size',
  templateUrl: './add-size.component.html',
  styleUrls: ['./add-size.component.css'],
  providers: [TallesService]
})
export class AddSizeComponent implements OnInit {
  public formTalle!: FormGroup;
  public talle!: Talles;
  public status!: string;


  constructor(
    private formBuilder: FormBuilder,
    private _tallesService: TallesService,
  ) {
    this.talle = new Talles('', '', '', '', '');
    this.buildForm();
  }

  ngOnInit(): void {
  }

  onSubmit(form: any) {
    this.talle = this.formTalle.value;
    this.status = 'loading';

    this._tallesService.saveTalles(this.talle).subscribe(
      response => {
        if (this.talle) {
          this.status = 'success';
          form.reset();
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
