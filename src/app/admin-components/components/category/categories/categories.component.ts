import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Category } from '../../../../models/category';
import { CategoryService } from '../../../../services/category.service';
import { AddCategoryComponent } from '../add-category/add-category.component';

export interface DialogData { _id: string; }

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [CategoryService]
})
export class CategoriesComponent implements OnInit {
  public categories!: Category[];
  public category!: Category;

  constructor(
    private _categoryService: CategoryService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this._categoryService.getCategories().subscribe(
      response => {
        if (response.categories) {
          this.categories = response.categories;
        }
      },
      error => { console.log(<any>error); }
    )
  }

  deleteCategory(id: any) {
    let message = confirm("Desea eliminar esta categoria?");
    if (message) {
      this._categoryService.deleteCategory(id).subscribe(
        response => { this.ngOnInit(); },
        error => { console.log(<any>error); }
      )
    } else { console.log('Categoria no eliminada'); }
  }

  addCategory(){
    const dialogRef = this.dialog.open(AddCategoryComponent);
    dialogRef.afterClosed().subscribe(result => { this.ngOnInit(); });
  }

}

