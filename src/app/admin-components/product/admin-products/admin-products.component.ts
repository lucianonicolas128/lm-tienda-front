import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { StockTalles } from '../../../models/stockTalles'
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
  providers: [ProductService, CategoryService]
})

export class AdminProductsComponent implements OnInit {
  public products: Product[];
  public url: string;
  public product: Product;
  public categories: Category[];
  public category: Category;
  public productsFiltered: Product[];

  public tallesAndStock;
  public talle;
  public stock;
  public prueba = new Array();
  public filter: string = 'all';

  public stockTalles: StockTalles;

  constructor(
    private _productService: ProductService,
    private _categoryService: CategoryService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.filter = 'all';
    // this.productsFiltered = this.products.slice();
    this.updateFilter(this.filter);
  }

  getProducts() {
    this._productService.getProducts().subscribe(
      response => {
        if (response.products) {
          this.products = response.products;

          this.products.forEach(product => {
            this.tallesAndStock = JSON.parse(product.stockTalles);
            product.stockTalles = JSON.parse(product.stockTalles);
          })
        };

      },
      error => {
        console.log(<any>error);
      }
    )
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

  updateFilter(filter){
    this.filter = filter;
    if(this.filter != 'all'){
      this.productsFiltered = this.products.filter( product => product.category == this.filter);    
    } else{
      this.productsFiltered = this.products;
    }
    
  }


  filterProductsForCategory() {

  }

  deleteProduct(id) {
    let message = confirm("Desea eliminar este producto?");
    if (message) {
      this._productService.deleteProduct(id).subscribe(
        response => {
          /* this.reloadComponent(); */
          this.ngOnInit();
        },
        error => {
          console.log(<any>error);
        }
      )
    } else {
      console.log('Producto no eliminado');
    }
  }

  reloadComponent() {
    window.location.reload();
  }

}
