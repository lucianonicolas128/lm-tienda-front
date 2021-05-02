import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';
import { saleService } from 'src/app/services/sale.service';
import { Sale } from 'src/app/models/sale';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [ProductService, UploadService, saleService]
})
export class CartComponent implements OnInit {
  public date!: Date;
  public products: Product[] = [];
  public url: string;
  public product!: Product;
  public totalSell!: number;
  public filesToUpload!: Array<File>;
  public status!: string;
  public save_sale!: any;
  public sale: Sale;
  public address_temp!: string;
  public direccion!: string;
  public city!: string;
  public state!: string;
  public cartForm!: FormGroup;
  public paymentForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _productService: ProductService,
    private _saleService: saleService,
    private _router: Router,
  ) {
    this.url = Global.url;
    this.sale = new Sale('', '', null, '', '', '', '', '', '', '', '', null, 'proceso');
    this.buildFormPayment();
  }

  ngOnInit(): void {
    this.products = [];
    this.totalSell = 0;
    this.readCartItems();
  }

  readDateToday(fecha) {
    this.date = new Date();
    let day = this.date.getDate();
    let month = this.date.getMonth() + 1;
    let year = this.date.getFullYear();
    return fecha = day + '/' + month + '/' + year;
  }

  readCartItems() {
    let tr = document.querySelector('#cart-list');
    for (let i in localStorage) {
      if (typeof localStorage[i] == 'string') {
        let item = JSON.parse(localStorage[i]);
        let arrayProducts = item;
        this.getProduct(arrayProducts[1], arrayProducts[0], i)
      }
    }
    this.totalSell = this.products.reduce((acc, obj,) => acc + obj.price, 0);
  }


  getProduct(id: any, talle: any, i: any) {
    this._productService.getProduct(id).subscribe(
      response => {
        this.product = response.product;
        this.product.stockTalles = talle;
        this.product.stock = i;
        // console.log(this.product.stockTalles);
        // console.log(this.product)
        if (!this.product.offer) { this.totalSell += this.product.price; }
        else { this.totalSell += this.product.offer; }
        this.products.push(this.product);
      }
    )
  }

  removeItemToCart(id) {
    localStorage.removeItem(id);
    // this.ngOnInit();
    location.reload();

  }

  onSubmit(form: any) {
    this.sale = form.value
    /* Guardamos la fecha actual dentro del campo fecha de la venta */
    this.sale.date = this.readDateToday(this.sale.date);
    /* Guardamos el total de la compra */
    this.sale.total = this.totalSell;
    /* Convertimos a JSON los productos dentro del local storage para luego gardarlos en el campo correspondiende de la compra */
    this.sale.products = JSON.stringify(this.products);
    this.sale.status = 'proceso';

    this._saleService.saveSale(this.sale).subscribe(
      response => {
        if (response.sale) {
          this.status = 'succes';
          this.save_sale = response.sale;
          setTimeout(() => this._router.navigate(['client/my-sale/' + response.sale._id]), 3000);
          form.reset();
          localStorage.clear();
        } else {
          this.save_sale = response.sale;
          this.status = "succes";
          form.reset();
        }
      },

      error => {
        console.log(<any>error);
      }
    );
  }


  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  get shippingField() {
    return this.paymentForm.get('shipping');
  }

  get payField() {
    return this.paymentForm.get('pay');
  }

  private buildFormPayment() {
    this.paymentForm = this.formBuilder.group({
      _id: [''],
      nameClient: ['', Validators.required],
      phoneClient: ['', Validators.required],
      emailClient: ['', Validators.required],
      shipping: ['', Validators.required],
      address: [''],
      city: [''],
      state: [''],
      pay: ['', Validators.required],
    })
  }

}
