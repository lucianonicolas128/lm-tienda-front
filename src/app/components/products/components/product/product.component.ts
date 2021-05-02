import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

export interface DialogData { _id: string; }

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  // providers: [ProductService, UploadService, CategoryService, TallesService]
})
export class ProductComponent implements OnInit {
  @Input() product!: Product;
  @Output() productClicked: EventEmitter<any> = new EventEmitter();

  public status;
  public statusAddCart: string;

  constructor() { }

  ngOnInit(): void {
    this.productClicked;
    // this.getProduct(this.product._id);
  }


  addToCart(id) {

    localStorage.setItem(id, JSON.stringify(id));

    this.statusAddCart = 'succes';
    this.status = 'success';
    setTimeout(function () {
      this.status = "failed";
    }, 20);

    this.ngOnInit();

    // let modalToast = document.getElementById('modalToast');
    // modalToast.classList.remove('invisible');
    // modalToast.classList.add('visible');
  }

}
