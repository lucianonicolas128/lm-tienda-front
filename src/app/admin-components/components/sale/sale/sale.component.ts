import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Sale } from 'src/app/models/sale';
import { saleService } from 'src/app/services/sale.service';
import { EditSaleComponent } from '../edit-sale/edit-sale.component';
import { ViewSaleComponent } from '../view-sale/view-sale.component';

export interface DialogData { _id: string; }

@Component({
  selector: 'app-sale-admin',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleAdminComponent implements OnInit {
  @Input() sale!: Sale;
  @Output() saleClicked: EventEmitter<any> = new EventEmitter();

  public sales!: Sale[];

  constructor(
    private _saleService: saleService,
    private _router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.saleClicked;
    this.getSale(this.sale._id);
  }

  getSale(id: any) {
    this._saleService.getSale(id).subscribe(
      response => {
        this.sale = response.sale;
      }
    )
  }

  editSale(id: any) {
    const dialogRef = this.dialog.open(EditSaleComponent, {
      data: { _id: id }
    });
    dialogRef.afterClosed().subscribe(result => { this.ngOnInit(); });
  }

  deleteSale(id: any) {
    let message = confirm("Desea eliminar esta venta?");
    if (message) {
      this._saleService.deleteSale(this.sale._id).subscribe(
        response => {
          console.log('hola')
          location.reload();
        },
        error => { console.log(<any>error); }
      )

      // this._router.navigate(['admin/sales']);
    } else { console.log('Producto no eliminado'); }
  }

  viewSale(id: any) {
    const dialogRef = this.dialog.open(ViewSaleComponent, {
      data: { _id: id }
    });
    dialogRef.afterClosed().subscribe(result => { this.ngOnInit(); });
  }

}
