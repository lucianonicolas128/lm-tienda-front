import { Component, OnInit } from '@angular/core';
import { Sale } from '../../../models/sale';
import { saleService } from '../../../services/sale.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-my-sale',
  templateUrl: './my-sale.component.html',
  styleUrls: ['./my-sale.component.css'],
  providers: [saleService, ProductService]
})
export class MySaleComponent implements OnInit {

  public sales: Sale[];
  public url: string;
  public sale: Sale;
  public products: Product[] = [];
  public product: Product;
  public totalSell: number;

  constructor(
    private _saleService: saleService,
    private _productService: ProductService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { 
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params =>{ 
      let id = params.id;
      this.getSale(id);
    });
  }
  
  getSale(id){
    this._saleService.getSale(id).subscribe(
      response => {
        this.sale = response.sale;
        /* this.sale.products = JSON.parse(response.sale.products); */
        this.products = JSON.parse(response.sale.products);
        console.log(this.products);
      }
    )
  }
  
  getProduct(id){
    this._productService.getProduct(id).subscribe(
      response => {
        this.product = response.product;

        if(!this.product.offer){
          this.totalSell += this.product.price;
        }else{
          this.totalSell += this.product.offer;
        }

        this.products.push(this.product);
      }
      
    )
  }

}
