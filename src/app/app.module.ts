import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SliderComponent } from './components/slider/slider.component';
import { ProductsComponent } from './components/products/products.component';
import { PopularProductsComponent } from './components/popular-products/popular-products.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminComponent } from './admin-components/admin/admin.component';
import { IndexComponent } from './components/index/index.component';
import { CategoryComponent } from './admin-components/category/category.component';
import { ProductComponent } from './admin-components/product/product.component';
import { SaleComponent } from './admin-components/sale/sale.component';
import { AddProductComponent } from './admin-components/product/add-product/add-product.component';
import { AdminDetailProductComponent } from './admin-components/product/admin-detail-product/admin-detail-product.component';
import { AdminEditProductComponent } from './admin-components/product/admin-edit-product/admin-edit-product.component';
import { AdminProductsComponent } from './admin-components/product/admin-products/admin-products.component';
import { UploadProductComponent } from './admin-components/product/upload-product/upload-product.component';
import { AdminAddSliderComponent } from './admin-components/slider/admin-add-slider/admin-add-slider.component';
import { AdminEditSliderComponent } from './admin-components/slider/admin-edit-slider/admin-edit-slider.component';
import { AdminSlidersComponent } from './admin-components/slider/admin-sliders/admin-sliders.component';
import { EditSaleComponent } from './admin-components/sale/edit-sale/edit-sale.component';
import { SalesComponent } from './admin-components/sale/sales/sales.component';
import { ViewSaleComponent } from './admin-components/sale/view-sale/view-sale.component';
import { AddCategoryComponent } from './admin-components/category/add-category/add-category.component';
import { CategoriesComponent } from './admin-components/category/categories/categories.component';
import { EditCategoryComponent } from './admin-components/category/edit-category/edit-category.component';
import { DetailProductComponent } from './components/product/detail-product/detail-product.component';
import { MySaleComponent } from './components/sale/my-sale/my-sale.component';
import { CartComponent } from './components/cart/cart.component';
import { PreferencesComponent } from './admin-components/preferences/preferences/preferences.component';
import { AddPreferencesComponent } from './admin-components/preferences/add-preferences/add-preferences.component';
import { EditPreferencesComponent } from './admin-components/preferences/edit-preferences/edit-preferences.component';
import { TerminosCondicionesComponent } from './components/terminos-condiciones/terminos-condiciones.component';
import { CategoriesUserComponent } from './components/categories-user/categories-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    SliderComponent,
    ProductsComponent,
    PopularProductsComponent,
    FooterComponent,
    AdminComponent,
    IndexComponent,
    CategoryComponent,
    ProductComponent,
    SaleComponent,
    AddProductComponent,
    AdminDetailProductComponent,
    AdminEditProductComponent,
    AdminProductsComponent,
    UploadProductComponent,
    AdminAddSliderComponent,
    AdminEditSliderComponent,
    AdminSlidersComponent,
    EditSaleComponent,
    SalesComponent,
    ViewSaleComponent,
    AddCategoryComponent,
    CategoriesComponent,
    EditCategoryComponent,
    DetailProductComponent,
    MySaleComponent,
    CartComponent,
    PreferencesComponent,
    AddPreferencesComponent,
    EditPreferencesComponent,
    TerminosCondicionesComponent,
    CategoriesUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    routing,
    FormsModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
