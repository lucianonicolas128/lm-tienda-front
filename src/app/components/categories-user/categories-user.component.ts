import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-categories-user',
  templateUrl: './categories-user.component.html',
  styleUrls: ['./categories-user.component.css'],
  providers: [CategoryService]
})
export class CategoriesUserComponent implements OnInit {

  public categories: Category[];
  public url: string;
  public category: Category;

  constructor(
    private _categoryService: CategoryService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(
      response => {
        if(response.categories){
          this.categories = response.categories;
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  deleteCategory(id){
    let message = confirm("Desea eliminar esta categoria?");
    if(message){
      this._categoryService.deleteCategory(id).subscribe(
        response => {
          this.ngOnInit();
        },
        error => {
          console.log(<any>error);
        }
      )
    } else{
        console.log('Categoria no eliminada');
    }    
  }
    
  reloadComponent(){
    window.location.reload();
  }

}
