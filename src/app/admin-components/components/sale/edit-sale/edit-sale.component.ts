import { Component, Inject, OnInit } from '@angular/core';
import { Sale } from '../../../../models/sale';
import { saleService } from '../../../../services/sale.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../models/product';
import { UploadService } from 'src/app/services/upload.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  _id: string;
}

@Component({
  selector: 'app-edit-sale',
  templateUrl: './edit-sale.component.html',
  styleUrls: ['./edit-sale.component.css'],
  providers: [saleService, ProductService, UploadService]
})
export class EditSaleComponent implements OnInit {

  public sales!: Sale[];
  public sale!: Sale;
  public products: Product[] = [];
  public product!: Product;
  public totalSell!: number;
  public filesToUpload!: Array<File>;
  public status!: string;
  public save_sale!: any;
  public address_temp!: string;
  public direccion!: string;
  public city!: string;
  public state!: string;

  constructor(
    private _saleService: saleService,
    private _productService: ProductService,
    private _uploadService: UploadService,
    private _router: Router,
    private _route: ActivatedRoute,
    public dialogRef: MatDialogRef<EditSaleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      //let id = params.id;
      this.getSale(this.data._id);
    });
  }

  getSale(id: any) {
    this._saleService.getSale(id).subscribe(
      response => {
        this.sale = response.sale;
        this.products = JSON.parse(response.sale.products);
        console.log(this.products);
      }
    )
  }

  getProduct(id: any) {
    this._productService.getProduct(id).subscribe(
      response => {
        this.product = response.product;
        if (!this.product.offer) {
          this.totalSell += this.product.price;
        } else { this.totalSell += this.product.offer; }
        this.products.push(this.product);
      }
    )
  }

  onSubmit(form: any) {
    this.status = 'loading';
    this._saleService.updateSale(this.sale).subscribe(
      response => {
        if (response.sale) {
          this.status = 'succes';
          this.save_sale = response.sale;
          // form.reset();
          // this._router.navigate(['admin']);
        } else { this.status = 'failed'; }
      },
      error => { console.log(<any>error); }
    );
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
