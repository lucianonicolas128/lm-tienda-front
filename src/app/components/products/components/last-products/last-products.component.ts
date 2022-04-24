import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-last-products',
  templateUrl: './last-products.component.html',
  styleUrls: ['./last-products.component.css'],
  providers: [ProductService]
})
export class LastProductsComponent implements OnInit {
  public lastProduct!: Product[];
  public products!: Product[];

  constructor(
    private _productService: ProductService,
    ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this._productService.getProducts().subscribe(
      response => {
        console.log(response)
        this.products = response.products;
        this.lastProduct = response.products.slice(0, 8);
      }
    )
  }

  getAllProducts() {
    this.lastProduct = this.products;
  }
}
