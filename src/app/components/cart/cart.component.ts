import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';
import { saleService } from 'src/app/services/sale.service';
import { Sale } from 'src/app/models/sale';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [ProductService, UploadService, saleService]
})
export class CartComponent implements OnInit {

  public date: Date;

  public products: Product[] = [];
  public url: string;
  public product: Product;
  public totalSell: number;
  public filesToUpload: Array<File>;
  public status: string;
  public save_sale;
  public sale: Sale;
  public address_temp: string;
  public direccion: string;
  public city: string;
  public state: string;


  constructor(
    private _productService: ProductService,
    private _saleService: saleService,
    private _router: Router,
    private _uploadService: UploadService,
    private _route: ActivatedRoute
    ) {
      this.url = Global.url;
      this.sale = new Sale('','',null,'','','','','','','','',null, 'proceso');
      
     }

  ngOnInit(): void {
    this.readCartItems();
  }

  /* FUNCION PARA DEVOLVER LA FECHA ACTUAL */
  readDateToday(fecha){
    this.date = new Date();
    let day = this.date.getDate();
    let month = this.date.getMonth()+1;
    let year = this.date.getFullYear();

    return fecha = day + '/' + month + '/' + year;
  }
  /* FUNCION PARA DEVOLVER LA FECHA ACTUAL */

  readCartItems(){
    let tr = document.querySelector('#cart-list');

    for(let i in localStorage){
      if(typeof localStorage[i] == 'string'){

        let itemId = JSON.parse(localStorage[i]);
        // let talleId = JSON.parse(localStorage[i+1]);

        this._route.params.subscribe(params => {
          let id = itemId;
          this.getProduct(id);
          // this.product.stockTalles = JSON.parse(localStorage.getItem(id+1));
          // console.log(this.product.stockTalles);
        })
      }
    }
    this.totalSell = this.products.reduce((
      acc,
      obj,
    ) => acc + obj.price,
    0);
  }
  
  getProduct(id){
    this._productService.getProduct(id).subscribe(
      response => {

        this.product = response.product;

        let aux = id + '1';

        this.product.stockTalles = JSON.parse(localStorage.getItem(aux));
        
        console.log(this.product.stockTalles);

        if(!this.product.offer){
          this.totalSell += this.product.price;
        }else{
          this.totalSell += this.product.offer;
        }

        this.products.push(this.product);
      }
      
    )
  }

  removeItemToCart(id){
    localStorage.removeItem(id);
    // this.ngOnInit();
    location.reload();
    
  }
  
  onSubmit(form){

    /* Guardamos la fecha actual dentro del campo fecha de la venta */
    this.sale.date = this.readDateToday(this.sale.date);
    
    /* Guardamos el total de la compra */
    this.sale.total = this.totalSell;
    
    /* Convertimos a JSON los productos dentro del local storage para luego gardarlos en el campo correspondiende de la compra */
    this.sale.products = JSON.stringify(this.products);

    this.sale.status = 'proceso';

    //Save the data
    this._saleService.saveSale(this.sale).subscribe(
      response => {
        if(response.sale){
            this.status = 'succes';
            this.save_sale = response.sale;
            
            this._router.navigate(['client/my-sale/' + response.sale._id])
            form.reset();

            localStorage.clear();
            
          }else{
            this.save_sale = response.sale;
            this.status = "succes";
            form.reset();
        }
      },

      error => {
        console.log(<any> error);
      }
    );

  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }


}
