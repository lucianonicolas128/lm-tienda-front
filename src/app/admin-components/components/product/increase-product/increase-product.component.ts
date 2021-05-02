import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-increase-product',
  templateUrl: './increase-product.component.html',
  styleUrls: ['./increase-product.component.css'],
  providers: [CategoryService, ProductService]
})
export class IncreaseProductComponent implements OnInit {
  public status!: string;
  public category!: Category;
  public categories!: Category[];
  public products!: Product[];

  public increaseForm!: FormGroup;
  public increaser!: any;

  constructor(
    private formBuilder: FormBuilder,
    private _productService: ProductService,
    private _categoryService: CategoryService,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this._productService.getProducts().subscribe(
      response => { this.products = response.products }
    );
  }

  getCategories() {
    this._categoryService.getCategories().subscribe(
      response => { this.categories = response.categories }
    )
  }

  onSubmit(increaseForm: any) {
    this.status = 'loading';
    this.increaser = increaseForm.value;
    this.increaser.percent = (Number(this.increaser.percent / 100) + 1);
    let productsFilter = this.products.filter(product => product.category == this.increaser.category);

    if (this.increaser.category !== '') {
      productsFilter.forEach(product => {
        product.price = product.price * this.increaser.percent;
        this._productService.updateProduct(product).subscribe(
          response => {
            this.status = 'succes';
            // console.log(product);
          }
        )
      });
    }

    if(this.increaser.category == '') {
      this.products.forEach(product => {
        product.price = product.price * this.increaser.percent;
        this._productService.updateProduct(product).subscribe(
          response => {
            this.status = 'succes';
            // console.log(product);
          }
        )
      });
    }
  }

  private buildForm() {
    this.increaseForm = this.formBuilder.group({
      percent: [''],
      category: [''],
    });
  }

}
