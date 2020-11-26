import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { UploadService } from '../../../services/upload.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';
import { HttpClient } from '@angular/common/http';
import { TallesService } from 'src/app/services/talles.service';


@Component({
  selector: 'app-addd-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers: [ProductService, UploadService, CategoryService, TallesService]
})
export class AddProductComponent implements OnInit {
  public selectedFile = null;

  public title: string;
  public product: Product;
  public status: string;
  public filesToUpload: Array<File>;
  public save_product;
  public url: string;

  public category: Category;
  public categories: Category[];

  public imageUrl: string;
  public tallesDelProducto: string[];
  public tallesArray = new Array();

  constructor(
    private _productService: ProductService,
    private _uploadService: UploadService,
    private _categoryService: CategoryService,
    private _tallesService: TallesService,
    private _router: Router,
    private _route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.title = "Nuevo producto";
    this.product = new Product('', '', '', '', null, null, null, null, '', '', null, false);
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this._categoryService.getCategories().subscribe(
      response => {
        if (response.categories) {
          this.categories = response.categories;
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  updateCategories() {
    this.getCategories();
    console.log('Categories list update');
  }

  onSubmit(form) {
    this.product.stockTalles = JSON.stringify(this.tallesArray);
    this.product.image = this.imageUrl;
    this.status = 'loading';

    //Save the data
    this._productService.saveProduct(this.product).subscribe(
      response => {
        if (response.product) {

          if (this.filesToUpload) {
            this._uploadService.makeFileRequest(Global.url + "image-upload-product/" + response.product._id, [], this.filesToUpload, 'image')
              .then((result: any) => {
                this.status = 'succes';
                console.log(result);
                this.save_product = result.product;
                form.reset();
              });
          } else {
            this.save_product = response.product;
            this.status = 'succes';
            form.reset();
          }
        } else {
          this.status = 'failed';
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

  addTalleCheck(name) {
    let talle = name;
    this.tallesArray.push(talle);
    var listaTalles = document.getElementById('tallesSeleccionados');
    listaTalles.innerHTML = (JSON.parse(JSON.stringify(this.tallesArray)));
  }

  removeTalle(talle){
    this.tallesArray.forEach(talles => {
      var i = this.tallesArray.indexOf(talle);
      if(i !== -1){
        this.tallesArray.splice(i, 1);
      }
    })
  }
}
