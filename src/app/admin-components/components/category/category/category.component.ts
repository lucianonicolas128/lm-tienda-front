import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { EditCategoryComponent } from '../edit-category/edit-category.component';

export interface DialogData { _id: string; }

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [CategoryService]
})
export class CategoryComponent implements OnInit {
  @Input() category!: Category;
  @Output() categoryClicked: EventEmitter<any> = new EventEmitter();

  constructor(
    private _categoryService: CategoryService,
    public dialog: MatDialog,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.categoryClicked;
    this.getCategory(this.category._id);
  }

  getCategory(id: any) {
    this._categoryService.getCategory(id).subscribe(
      response => {
        this.category = response.category;
      }
    )
  }

  editCategory(id: any) {
    const dialogRef = this.dialog.open(EditCategoryComponent, {
      data: { _id: id }
    });
    dialogRef.afterClosed().subscribe(result => { this.ngOnInit(); });
  }

  deleteCategory(id: any) {
    let message = confirm("Desea eliminar esta categoria?");
    if (message) {
      this._categoryService.deleteCategory(id).subscribe(
        response => {
          this.ngOnInit();
          location.reload();
        },
        error => { console.log(<any>error); }
      )
    } else { console.log('Categoria no eliminada'); }
  }

}
