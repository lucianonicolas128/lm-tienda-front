import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Talles } from 'src/app/models/talles';
import { TallesService } from 'src/app/services/talles.service';
import { AddSizeComponent } from '../add-size/add-size.component';

@Component({
  selector: 'app-sizes',
  templateUrl: './sizes.component.html',
  styleUrls: ['./sizes.component.css'],
  providers: [TallesService]
})
export class SizesComponent implements OnInit {
  public talles!: Talles[];


  constructor(
    private _tallesService: TallesService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getSizes();
  }

  getSizes(){
    this._tallesService.getAllTalles().subscribe(
      response => {
        this.talles = response.talles;
      }
    )
  }

  addSize(){
    const dialogRef = this.dialog.open(AddSizeComponent);
    dialogRef.afterClosed().subscribe(result => { this.ngOnInit(); });
  }

}
