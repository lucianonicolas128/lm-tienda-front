import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';
import { UploadService } from 'src/app/services/upload.service';
import { StockTalles } from '../../../models/stockTalles'


@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css'],
  providers: [ProductService, CategoryService, UploadService]
})
export class DetailProductComponent implements OnInit {
  public products: Product[];
  public productsRelacionados: Product[];
  public url: string;
  public confirm: boolean;
  public product: Product;
  public category: Category;
  public status;
  public save_product;

  public categoryProduct;

  public stockTalles: StockTalles;
  public tallesAndStock;
  public newTallesArray;

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
      let id = params.id;
      this.getProduct(id);
    })

    // this.getProducts();
  }

  getProduct(id) {
    this._productService.getProduct(id).subscribe(
      response => {
        this.product = response.product;

        this.tallesAndStock = JSON.parse(this.product.stockTalles);
        this.product.stockTalles = JSON.parse(this.product.stockTalles);

        this.categoryProduct = response.product.category;
        console.log(this.product.category);

        // if (this.product.stockTalles != '') {
        //   this.product.stock = 1;
        // }
        if (this.product.stockTalles.length) {
          this.product.stock = 1;
        }

        if (!this.product.stockTalles.length) {
          this.product.stock = 0;
        }

        this.getProducts();
      }
    )
  }

  addToCart(id) {
    localStorage.setItem(this.product._id, JSON.stringify(this.product._id));
    this.status = 'success';
    setTimeout(function () {
      this.status = "failed";
    }, 20);
    this.ngOnInit();
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
          // response.product.stock = this.product.stock;
          this.save_product = response.product;
        }
      }
    )
  }

  closeToast() {
    let modalToast = document.getElementById('modalToast');
    modalToast.classList.remove('visible');
    modalToast.classList.add('invisible');
  }

  getProducts() {
    this._productService.getProducts().subscribe(
      response => {
        if (response.products) {
          this.products = response.products;
          this.productsRelacionados = (this.products.filter(product => product.category == this.categoryProduct)).slice(0, 4);
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  productosPopulares() {
    this.productsRelacionados = (this.products.filter(product => product.category == this.product.category)).slice(0, 4);
  }

}
