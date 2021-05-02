import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Sale } from 'src/app/models/sale';
import { ProductService } from 'src/app/services/product.service';
import { saleService } from 'src/app/services/sale.service';
import { UploadService } from 'src/app/services/upload.service';

export interface DialogData {
  _id: string;
}

@Component({
  selector: 'app-view-sale',
  templateUrl: './view-sale.component.html',
  styleUrls: ['./view-sale.component.css'],
  providers: [saleService, ProductService, UploadService]
})
export class ViewSaleComponent implements OnInit {
  @Input() sale!: Sale;
  @Output() saleClicked: EventEmitter<any> = new EventEmitter();

  public sales!: Sale[];
  //public sale!: Sale;
  public products: Product[] = [];
  public product!: Product;

  constructor(
    private _saleService: saleService,
    private _productService: ProductService,
    private _router: Router,
    private _route: ActivatedRoute,
    public dialogRef: MatDialogRef<ViewSaleComponent>,
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

}
