import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../models/product';
import { ProductService } from '../../../../services/product.service';
import { Global } from '../../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from '../../../../models/category';
import { CategoryService } from '../../../../services/category.service';
import { StockTalles } from '../../../../models/stockTalles'


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService, CategoryService]
})
export class ProductsComponent implements OnInit {
  public products: Product[];
  public url: string;
  public confirm: boolean;
  public product: Product;
  public categories: Category[];
  public category: Category;

  public productsFiltered: Product[];
  public categorySelected;

  public filter: string = 'all';

  public stockTalles: StockTalles;
  public tallesAndStock;
  public status;

  public statusAddCart: string;

  constructor(
    private _productService: ProductService,
    private _categoryService: CategoryService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url = Global.url;
    this.confirm = false;
  }


  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let category = params.category;
      this.getProductsCategory(category);
    })

    this.getProducts();
    this.getCategories();
    this.filter = 'all';
    // this.productsFiltered = this.products.slice();
    this.updateFilter(this.filter);
  }

  getProductsCategory(category){
    this._productService.getProductsCategory(category).subscribe(
      response => {
        this.products = response.productos;
      },
      error => {
        console.log(<any>error);
      }

    )
  }

  getCategories() {
    this._categoryService.getCategories().subscribe(
      response => {
        if (response.categories) {
          this.categories = response.categories;
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  getProducts() {
    this._productService.getProducts().subscribe(
      response => {
        if (response.products) {
          this.products = response.products;
          this.products = this.products.filter(product => product.activated == true);
          this.products.forEach(product => {
            this.tallesAndStock = JSON.parse(product.stockTalles);
            product.stockTalles = JSON.parse(product.stockTalles);
            if (product.stockTalles != '') {
              product.stock = 1;
            }
          })
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  updateFilter(filter) {
    this.getProducts();
    this.filter = filter;
    if (this.filter != 'all') {
      this.productsFiltered = this.products.filter(product => product.category == this.filter);
    } else {
      this.productsFiltered = this.products;
    }

  }

  productsOffer(){
    this.productsFiltered = this.products.filter(product => product.offer != 0);
  }

  addToCart(id) {

    localStorage.setItem(id, JSON.stringify(id));

    this.statusAddCart = 'succes';
    this.status = 'success';
    setTimeout(function () {
      this.status = "failed";
    }, 20);

    this.ngOnInit();

    let modalToast = document.getElementById('modalToast');
    modalToast.classList.remove('invisible');
    modalToast.classList.add('visible');
  }

  closeToast(){
    let modalToast = document.getElementById('modalToast');
    modalToast.classList.remove('visible');
    modalToast.classList.add('invisible');

  }

}
