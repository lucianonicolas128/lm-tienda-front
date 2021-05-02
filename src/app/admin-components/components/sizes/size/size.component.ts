import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Talles } from 'src/app/models/talles';
import { TallesService } from 'src/app/services/talles.service';
import { UploadService } from 'src/app/services/upload.service';
import { EditSizeComponent } from '../edit-size/edit-size.component';

export interface DialogData { _id: string; }

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.css'],
  providers: [TallesService]
})
export class SizeComponent implements OnInit {
  @Input() talle!: Talles;
  @Output() talleClicked: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    private _tallesService: TallesService,
    private _router: Router,
    private _route: ActivatedRoute,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    // this.getSize(this.data._id);
    this._route.params.subscribe(params => {
      this.getSize(this.talle._id);
    });
  }

  getSize(id){
    this._tallesService.getTalles(id).subscribe(
      response => {
        this.talle = response.talle;
      }
    )
  }

  editSize(id: any) {
    const dialogRef = this.dialog.open(EditSizeComponent, {
      data: { _id: id }
    });
    dialogRef.afterClosed().subscribe(result => { this.ngOnInit(); });
  }

  deleteSize(id: any) {
    let message = confirm("Desea eliminar este talle?");
    if (message) {
      this._tallesService.deleteTalles(this.talle._id).subscribe(
        response => {
          this.ngOnInit();
          location.reload();
        },
        error => { console.log(<any>error); }
      )
    } else { console.log('Talle no eliminado'); }
    this.ngOnInit();
  }

}
