import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [CategoryService]
})
export class HeaderComponent implements OnInit {
  
  public cart;
  public categories: Category[];

  constructor(
    private _categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.cartElements();
    this.getCategories();
  }

  cartElements(){
    this.cart = localStorage.length;
    // this.ngOnInit();
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(
      response => {
        this.categories = response.categories;
      }
    )
  }

}
