import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { StockTalles } from '../../../models/stockTalles'

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
  providers: [ProductService]
})

export class AdminProductsComponent implements OnInit {
  public products: Product[];
  public url: string;
  public product: Product;

  public tallesAndStock;
  public talle;
  public stock;
  public prueba = new Array();

  public stockTalles: StockTalles;

  constructor(
    private _productService: ProductService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.getProducts();
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
