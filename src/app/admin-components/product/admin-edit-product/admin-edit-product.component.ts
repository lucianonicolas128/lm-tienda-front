import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { UploadService } from '../../../services/upload.service';
import { Global } from '../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';
import { TallesService } from 'src/app/services/talles.service';
import { Talles } from '../../../models/talles';

@Component({
  selector: 'app-admin-edit-product',
  templateUrl: '../add-product/add-product.component.html',
  styleUrls: ['./admin-edit-product.component.css'],
  providers: [ProductService, UploadService, CategoryService, TallesService]
})
export class AdminEditProductComponent implements OnInit {

  public title: string;
  public product: Product;
  public status: string;
  public filesToUpload: Array<File>;
  public save_product;
  public url: string;

  public category: Category;
  public categories: Category[];
  public tallesArray = new Array();
  public imageUrl: string;

  public tallesAll: Talles[];
  public tallesDelProducto: string[];


  constructor(
    private _productService: ProductService,
    private _uploadService: UploadService,
    private _categoryService: CategoryService,
    private _tallesService: TallesService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.title = "Editar producto";
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params.id;
      this.getProduct(id);
    });

    this.getCategories();
    this.getTalles();
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

  getTalles() {
    this._tallesService.getAllTalles().subscribe(
      response => {
        if (response.talles) {
          this.tallesAll = response.talles;
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

  getProduct(id) {
    this._productService.getProduct(id).subscribe(
      response => {
        this.product = response.product;
        this.tallesArray = JSON.parse(this.product.stockTalles);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  onSubmit(form) {
    this.product.stockTalles = JSON.stringify(this.tallesArray);
    this.product.image = this.imageUrl;
    this.status = 'loading';

    //Update the data
    this._productService.updateProduct(this.product).subscribe(
      response => {
        if (response.product) {
          if(this.filesToUpload){
            this._uploadService.makeFileRequest(Global.url + "image-upload-product/" + response.product._id, [], this.filesToUpload, 'image')
            .then((result: any) => {
              console.log("entre");
              this.status = 'succes';
              this.save_product = result.product;
              form.reset();
              this._router.navigate(['/admin']);
            });
          } else {
            this.save_product = response.product;
            this.status = 'succes';
            form.reset();
            this._router.navigate(['/admin']);
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
