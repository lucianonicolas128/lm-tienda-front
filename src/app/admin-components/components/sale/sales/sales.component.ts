import { Component, OnInit } from '@angular/core';
import { Sale } from '../../../../models/sale';
import { saleService } from '../../../../services/sale.service';

export interface DialogData { _id: string; }

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
  providers: [saleService]
})
export class SalesComponent implements OnInit {
  public sales!: Sale[];
  public sale!: Sale;

  constructor(
    private _saleService: saleService,
  ) { }

  ngOnInit(): void {
    this.getSales();
  }

  getSales() {
    this._saleService.getSales().subscribe(
      response => {
        if (response.sales) {
          this.sales = response.sales;
        }
      },
      error => { console.log(<any>error); }
    )
  }

  deleteSale(id: any) {
    let message = confirm("Desea eliminar esta venta?");
    if (message) {
      this._saleService.deleteSale(id).subscribe(
        response => { this.ngOnInit(); },
        error => { console.log(<any>error); }
      )
    } else { console.log('Producto no eliminado'); }
  }

  reloadComponent() {
    window.location.reload();
  }

}
