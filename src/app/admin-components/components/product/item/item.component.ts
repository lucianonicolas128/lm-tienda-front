import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { TallesService } from 'src/app/services/talles.service';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from '../../../../services/global';
import { AdminEditProductComponent } from '../admin-edit-product/admin-edit-product.component';

export interface DialogData { _id: string; }

@Component({
  selector: 'app-product-admin',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  providers: [ProductService, UploadService, CategoryService, TallesService]
})
export class ItemComponent implements OnInit {

  @Input() product!: Product;
  @Output() productClicked: EventEmitter<any> = new EventEmitter();

  public categories: Category[];
  public category: Category;
  public productsFiltered: Product[];

  public tallesAndStock;
  public save_product;

  url;

  constructor(
    private _productService: ProductService,
    private _uploadService: UploadService,
    private _categoryService: CategoryService,
    private _tallesService: TallesService,
    public dialog: MatDialog,
    private router: Router,
  ) {
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.productClicked;
    this.getProduct(this.product._id);
  }

  getProduct(id) {
    this._productService.getProduct(id).subscribe(
      response => {
        this.product = response.product;
        // this.tallesArray = JSON.parse(this.product.stockTalles);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  setActive() {
    if (this.product.activated) {
      this.product.activated = false;
    } else {
      this.product.activated = true;
    }
    this._productService.updateProduct(this.product).subscribe(
      response => {
        if (response.product) {
          console.log(response)
          this.save_product = response.product;
        } else {
          console.log('otro error')
        }
      },
      error => {
        console.log('error');
      }
    );
    this.ngOnInit();
  }

  openEditDialog(id) {
    const dialogRef = this.dialog.open(AdminEditProductComponent, {
      data: { _id: id }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  deleteProduct(id) {
    let message = confirm("Desea eliminar este producto?");
    if (message) {
      this._productService.deleteProduct(this.product._id).subscribe(
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


}
