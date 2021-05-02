import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../models/product';
import { ProductService } from '../../../../services/product.service';
import { Global } from '../../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { StockTalles } from '../../../../models/stockTalles'
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import { UploadService } from 'src/app/services/upload.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { IncreaseProductComponent } from '../increase-product/increase-product.component';
import { AddCategoryComponent } from '../../category/add-category/add-category.component';

export interface DialogData { _id: string; }

@Component({
  selector: 'app-admin-products',
  templateUrl: './layout-products.component.html',
  styleUrls: ['./admin-products.component.css'],
  providers: [ProductService, CategoryService, UploadService]
})

export class AdminProductsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: MatTableDataSource<Product>;


  public products: Product[] = [];
  public url: string;
  public product: Product;
  public categories: Category[];
  public category: Category;
  public productsFiltered: Product[];

  public tallesAndStock!: any;
  public talle!: any;
  public stock!: any;
  public prueba = new Array();
  public filter: string = 'all';
  public save_product!: any;

  public stockTalles!: StockTalles;

  constructor(
    private _productService: ProductService,
    private _categoryService: CategoryService,
    public dialog: MatDialog
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
      error => { console.log(<any>error); }
    )
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

  updateFilter(filter: any) {
    this.filter = filter;
    if (this.filter != 'all') {
      this.productsFiltered = this.products.filter(product => product.category == this.filter);
    } else {
      this.productsFiltered = this.products;
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddProductComponent);
    dialogRef.afterClosed().subscribe(result => { this.ngOnInit(); });
  }

  addProduct() {
    const dialogRef = this.dialog.open(AddProductComponent);
    dialogRef.afterClosed().subscribe(result => { this.ngOnInit(); });
  }

  addCategory() {
    const dialogRef = this.dialog.open(AddCategoryComponent);
    dialogRef.afterClosed().subscribe(result => { this.getCategories(); });
  }

  deleteProduct(id) {
    let message = confirm("Desea eliminar este producto?");
    if (message) {
      this._productService.deleteProduct(id).subscribe(
        response => { this.ngOnInit(); },
        error => { console.log(<any>error); }
      )
    } else { console.log('Producto no eliminado'); }
  }

  increasePrices(){
    const dialogRef = this.dialog.open(IncreaseProductComponent);
    dialogRef.afterClosed().subscribe(result => { this.ngOnInit(); });
  }

}
