import { Component, OnInit, Inject } from '@angular/core';
import { Product } from '../../../../models/product';
import { ProductService } from '../../../../services/product.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UploadService } from '../../../../services/upload.service';
import { Global } from '../../../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from '../../../../models/category';
import { CategoryService } from '../../../../services/category.service';
import { TallesService } from 'src/app/services/talles.service';
import { Talles } from '../../../../models/talles';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface DialogData {
  _id: string;
}
@Component({
  selector: 'app-admin-edit-product',
  templateUrl: '../add-product/add-product.component.html',
  styleUrls: ['./admin-edit-product.component.css'],
  providers: [ProductService, UploadService, CategoryService, TallesService]
})
export class AdminEditProductComponent implements OnInit {
  public product!: Product;
  public status!: string;
  public filesToUpload!: Array<File>;
  public save_product!: any;
  public category!: Category;
  public categories!: Category[];
  public tallesArray = new Array();
  public imageUrl!: string;
  public tallesAll = new Array();
  public tallesDelProducto!: string[];
  formProduct!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _productService: ProductService,
    private _uploadService: UploadService,
    private _categoryService: CategoryService,
    private _tallesService: TallesService,
    private _route: ActivatedRoute,
    public dialogRef: MatDialogRef<AdminEditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      this.getProduct(this.data._id);
    });
    this.getCategories();
    this.getTalles();
  }

  getCategories() {
    this._categoryService.getCategories().subscribe(
      response => {
        if (response.categories) { this.categories = response.categories; }
      },
      error => { console.log(<any>error); }
    )
  }

  getTalles() {
    this._tallesService.getAllTalles().subscribe(
      response => {
        if (response.talles) { this.tallesAll = response.talles; }
      },
      error => { console.log(<any>error); }
    )
  }

  updateCategories() {
    this.getCategories();
    console.log('Categories list update');
  }

  getProduct(id) {
    this._productService.getProduct(this.data._id).subscribe(
      response => {
        this.product = response.product;
        this.tallesArray = JSON.parse(this.product.stockTalles);
        this.formProduct.patchValue(response.product)
      },
      error => { console.log(<any>error); }
    )
  }

  onSubmit(form) {
    this.product = this.formProduct.value;
    this.product.stockTalles = JSON.stringify(this.tallesArray);
    this.product.image = this.imageUrl;
    this.status = 'loading';
    this._productService.updateProduct(this.product).subscribe(
      response => {
        if (response.product) {
          if (this.filesToUpload) {
            this._uploadService.makeFileRequest(Global.url + "image-upload-product/" + response.product._id, [], this.filesToUpload, 'image')
              .then((result: any) => {
                console.log("entre");
                this.status = 'succes';
                this.save_product = result.product;
                // form.reset();
              });
          } else {
            this.save_product = response.product;
            this.status = 'succes';
            // form.reset();
          }
        } else { this.status = 'failed'; }
      },
      error => { console.log(<any>error); }
    );
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  addTalleCheck(name: any) {
    let talle = name;
    this.tallesArray.push(talle);
    var listaTalles = document.getElementById('tallesSeleccionados');
    listaTalles!.innerHTML = (JSON.parse(JSON.stringify(this.tallesArray)));
  }

  removeTalle(i: any) {
    console.log(this.tallesArray);
    this.tallesArray.splice(i, 1);
  }

  get categoryField() {
    return this.formProduct.get('category');
  }

  private buildForm() {
    this.formProduct = this.formBuilder.group({
      _id: [''],
      name: ['', Validators.required],
      description: [''],
      category: ['', Validators.required],
      cost: [''],
      price: ['', Validators.required],
      offer: [''],
      stock: [''],
      image: [''],
      imageAtl: [''],
      stockTalles: [''],
      featured: [],
      activated: [],
    });
  }
}
