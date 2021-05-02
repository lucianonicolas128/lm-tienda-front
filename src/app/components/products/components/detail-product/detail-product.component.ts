import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../models/product';
import { ProductService } from '../../../../services/product.service';
import { Global } from '../../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from '../../../../models/category';
import { CategoryService } from '../../../../services/category.service';
import { UploadService } from 'src/app/services/upload.service';
import { StockTalles } from '../../../../models/stockTalles'
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css'],
  providers: [ProductService, CategoryService, UploadService, MatSnackBar]
})
export class DetailProductComponent implements OnInit {
  public products!: Product[];
  public productsRelacionados!: Product[];
  public url: string;
  public confirm: boolean;
  public product!: Product;
  public category!: Category;
  public status!: string;
  public save_product!: any;
  public data = new Array();

  public statusAddCart!: string;
  public categoryProduct!: any;

  public stockTalles!: StockTalles;
  public tallesAndStock!: any;
  public newTallesArray!: any;

  constructor(
    private _productService: ProductService,
    private _categoryService: CategoryService,
    private _route: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) {
    this.url = Global.url;
    this.confirm = false;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getProduct(id);
    })
  }

  getProduct(id) {
    this._productService.getProduct(id).subscribe(
      response => {
        this.product = response.product;
        this.tallesAndStock = JSON.parse(this.product.stockTalles);
        this.product.stockTalles = JSON.parse(this.product.stockTalles);
        this.categoryProduct = response.product.category;
        if (this.product.stockTalles.length) this.product.stock = 1;
        if (!this.product.stockTalles.length) this.product.stock = 0;
        this.getProducts();
      }
    )
  }

  addToCart() {
    let size = (<HTMLInputElement>document.getElementById('talle')!).value;
    let prueba = new Array();
    prueba.push(size);
    prueba.push(this.product._id);
    localStorage.setItem(Math.random().toString(), JSON.stringify(prueba));
    this.openSnackBar('Agregado al carrito!', '');
    this.statusAddCart = 'succes';
    this.status = 'success';
    setTimeout(function () {
      this.status = "failed";
    }, 20);
  }

  removeTalle(arr, item) {
    return arr.filter(function (e) {
      return e !== item;
    });
  }

  removeOneItem() {
    this.product.stockTalles = JSON.stringify(this.newTallesArray);
    console.log(this.product.stockTalles);
    this._productService.updateProduct(this.product).subscribe(
      response => {
        if (response.product) {
          this.save_product = response.product;
        }
      }
    )
  }

  getProducts() {
    this._productService.getProducts().subscribe(
      response => {
        if (response.products) {
          this.products = response.products;
          this.productsRelacionados = (this.products.filter(product => product.category == this.categoryProduct)).slice(0, 4);
        }
      },
      error => { console.log(<any>error); }
    )
  }

  productosPopulares() {
    this.productsRelacionados = (this.products.filter(product => product.category == this.product.category)).slice(0, 4);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
