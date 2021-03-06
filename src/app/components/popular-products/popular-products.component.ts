import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { Global } from 'src/app/services/global';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-popular-products',
  templateUrl: './popular-products.component.html',
  styleUrls: ['./popular-products.component.css'],
  providers: [ProductService, CategoryService]
})
export class PopularProductsComponent implements OnInit {
  public products: Product[];
  public url: string;
  public confirm: boolean;
  public product: Product;
  public productsPopular: Product[];
  public statusAddCart: string;
  public status;

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
    this.getProducts();
    // this.productosPopulares();
  }

  getProducts() {
    this._productService.getProducts().subscribe(
      response => {
        if (response.products) {
          this.products = response.products;   
          this.productosPopulares();       
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  productosPopulares(){
    let valor = true;
    this.productsPopular = this.products.filter(product => product.featured == valor);
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
