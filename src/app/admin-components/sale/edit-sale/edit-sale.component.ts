import { Component, OnInit } from '@angular/core';
import { Sale } from '../../../models/sale';
import { saleService } from '../../../services/sale.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import { UploadService } from 'src/app/services/upload.service';



@Component({
  selector: 'app-edit-sale',
  templateUrl: './edit-sale.component.html',
  styleUrls: ['./edit-sale.component.css'],
  providers: [saleService, ProductService, UploadService]
})
export class EditSaleComponent implements OnInit {

  public sales: Sale[];
  public url: string;
  public sale: Sale;
  public products: Product[] = [];
  public product: Product;
  public totalSell: number;

  public filesToUpload: Array<File>;
  public status: string;
  public save_sale;
  public address_temp: string;
  public direccion: string;
  public city: string;
  public state: string;
  
  constructor(
    private _saleService: saleService,
    private _productService: ProductService,
    private _uploadService: UploadService,
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

  onSubmit(form){


    //Save the data
    this._saleService.updateSale(this.sale).subscribe(
      response => {
        if(response.sale){
              this.status = 'succes';
              this.save_sale = response.sale;
              form.reset();
              this._router.navigate(['admin']);
          }else{
          this.status = 'failed';
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
