import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SliderComponent } from './components/slider/slider.component';
import { ProductsComponent } from './components/products/components/products/products.component';
import { PopularProductsComponent } from './components/products/components/popular-products/popular-products.component';
import { FooterComponent } from './components/footer/footer.component';
import { IndexComponent } from './components/index/index.component';
import { DetailProductComponent } from './components/products/components/detail-product/detail-product.component';
import { MySaleComponent } from './components/sale/my-sale/my-sale.component';
import { CartComponent } from './components/cart/cart.component';
import { TerminosCondicionesComponent } from './components/terminos-condiciones/terminos-condiciones.component';
import { CategoriesUserComponent } from './components/categories-user/categories-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AdminModule } from './admin-components/admin.module';
import { MaterialModule } from './material/material.module';
import { ProductComponent } from './components/products/components/product/product.component';
import { LastProductsComponent } from './components/products/components/last-products/last-products.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    SliderComponent,
    ProductsComponent,
    PopularProductsComponent,
    FooterComponent,
    IndexComponent,
    DetailProductComponent,
    MySaleComponent,
    CartComponent,
    TerminosCondicionesComponent,
    CategoriesUserComponent,
    ProductComponent,
    LastProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    routing,
    FormsModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    AdminModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
