import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { AdminComponent } from './admin-components/admin/admin.component';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';

import { AdminEditProductComponent } from './admin-components/product/admin-edit-product/admin-edit-product.component';
import { EditCategoryComponent } from './admin-components/category/edit-category/edit-category.component';
import { ViewSaleComponent } from './admin-components/sale/view-sale/view-sale.component';
import { EditSaleComponent } from './admin-components/sale/edit-sale/edit-sale.component';
import { MySaleComponent } from './components/sale/my-sale/my-sale.component';
import { CartComponent } from './components/cart/cart.component';
import { DetailProductComponent } from './components/product/detail-product/detail-product.component';
import { ProductComponent } from './admin-components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { AddProductComponent } from './admin-components/product/add-product/add-product.component';
import { AddPreferencesComponent } from './admin-components/preferences/add-preferences/add-preferences.component';
import { TerminosCondicionesComponent } from './components/terminos-condiciones/terminos-condiciones.component';


const appRoutes: Routes = [
    {path: '', component: IndexComponent},
    {path: 'admin', component: AdminComponent,
        children: [
            /* {path: '', component: AdminProductsComponent}, */
            // {path: '', component: CategoriesComponent},
            // {path: 'admin-products', component: AdminProductsComponent},
            // {path: 'categories', component: CategoriesComponent},
        ]
    },
    {path: 'products', component: ProductsComponent},
    {path: 'products/:category', component: ProductsComponent},
    {path: 'admin/add-producto', component: AddProductComponent},
    {path: 'admin/add-preferences', component: AddPreferencesComponent},
    {path: 'admin/edit-product/:id', component: AdminEditProductComponent},    
    {path: 'admin/edit-category/:id', component: EditCategoryComponent},
    {path: 'detail-product/:id', component: DetailProductComponent},
    {path: 'cart', component: CartComponent},
    {path: 'admin/view-sale/:id', component: ViewSaleComponent},
    {path: 'admin/edit-sale/:id', component: EditSaleComponent},
    {path: 'client/my-sale/:id', component: MySaleComponent},
    {path: 'terminos-y-condiciones', component: TerminosCondicionesComponent}
    

];


export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);