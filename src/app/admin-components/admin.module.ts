import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { CategoriesComponent } from './components/category/categories/categories.component';
import { PreferencesComponent } from './components/preferences/preferences/preferences.component';
import { SliderComponent } from './components/slider/slider.component';
import { ItemComponent } from './components/product/item/item.component';
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { EditCategoryComponent } from './components/category/edit-category/edit-category.component';
import { AddPreferencesComponent } from './components/preferences/add-preferences/add-preferences.component';
import { EditPreferencesComponent } from './components/preferences/edit-preferences/edit-preferences.component';
import { AddProductComponent } from './components/product/add-product/add-product.component';
import { AdminEditProductComponent } from './components/product/admin-edit-product/admin-edit-product.component';
import { AdminProductsComponent } from './components/product/admin-products/admin-products.component';
import { EditSaleComponent } from './components/sale/edit-sale/edit-sale.component';
import { SalesComponent } from './components/sale/sales/sales.component';
import { ViewSaleComponent } from './components/sale/view-sale/view-sale.component';
import { AdminAddSliderComponent } from './components/slider/admin-add-slider/admin-add-slider.component';
import { AdminEditSliderComponent } from './components/slider/admin-edit-slider/admin-edit-slider.component';
import { AdminSlidersComponent } from './components/slider/admin-sliders/admin-sliders.component';
import { MaterialModule } from '../material/material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { LayoutIndexComponent } from './components/layout-index/layout-index.component';
import { CategoryComponent } from './components/category/category/category.component';
import { SizesComponent } from './components/sizes/sizes/sizes.component';
import { SizeComponent } from './components/sizes/size/size.component';
import { AddSizeComponent } from './components/sizes/add-size/add-size.component';
import { EditSizeComponent } from './components/sizes/edit-size/edit-size.component';
import { SaleAdminComponent } from './components/sale/sale/sale.component';
import { IncreaseProductComponent } from './components/product/increase-product/increase-product.component';
// import { LoginComponent } from './auth/login/login.component';
//import { ProductComponent } from '../components/products/components/product/product.component';
//import { AppModule } from '../app.module';


@NgModule({
    declarations: [
        AdminDashboardComponent,
        AddCategoryComponent,
        CategoriesComponent,
        EditCategoryComponent,
        CategoryComponent,

        PreferencesComponent,
        AddPreferencesComponent,
        EditPreferencesComponent,

        ItemComponent,
        AddProductComponent,
        AdminEditProductComponent,
        AdminProductsComponent,

        SaleAdminComponent,
        EditSaleComponent,
        SalesComponent,
        ViewSaleComponent,
        SaleAdminComponent,

        SliderComponent,
        AdminAddSliderComponent,
        AdminEditSliderComponent,
        AdminSlidersComponent,
        LayoutIndexComponent,
        SizesComponent,
        SizeComponent,
        AddSizeComponent,
        EditSizeComponent,
        IncreaseProductComponent,
        // LoginComponent,

        //ProductComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        AdminRoutingModule,
        //ProductModule,
    ],
    exports: [
        AdminDashboardComponent,
        AddCategoryComponent,
        CategoriesComponent,
        EditCategoryComponent,
        CategoryComponent,

        PreferencesComponent,
        AddPreferencesComponent,
        EditPreferencesComponent,

        ItemComponent,
        AddProductComponent,
        AdminEditProductComponent,
        AdminProductsComponent,

        SaleAdminComponent,
        EditSaleComponent,
        SalesComponent,
        ViewSaleComponent,
        SaleAdminComponent,

        SliderComponent,
        AdminAddSliderComponent,
        AdminEditSliderComponent,
        AdminSlidersComponent,
        LayoutIndexComponent,

        //ProductComponent
    ]
})
export class AdminModule { }

// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
// import { CategoriesComponent } from './components/category/categories/categories.component';
// import { PreferencesComponent } from './components/preferences/preferences/preferences.component';
// import { SaleComponent } from './components/sale/sale.component';
// import { SliderComponent } from './components/slider/slider.component';
// import { ItemComponent } from './components/product/item/item.component';
// import { AddCategoryComponent } from './components/category/add-category/add-category.component';
// import { EditCategoryComponent } from './components/category/edit-category/edit-category.component';
// import { AddPreferencesComponent } from './components/preferences/add-preferences/add-preferences.component';
// import { EditPreferencesComponent } from './components/preferences/edit-preferences/edit-preferences.component';
// import { AddProductComponent } from './components/product/add-product/add-product.component';
// import { AdminDetailProductComponent } from './components/product/admin-detail-product/admin-detail-product.component';
// import { AdminEditProductComponent } from './components/product/admin-edit-product/admin-edit-product.component';
// import { AdminProductsComponent } from './components/product/admin-products/admin-products.component';
// import { UploadProductComponent } from './components/product/upload-product/upload-product.component';
// import { EditSaleComponent } from './components/sale/edit-sale/edit-sale.component';
// import { SalesComponent } from './components/sale/sales/sales.component';
// import { ViewSaleComponent } from './components/sale/view-sale/view-sale.component';
// import { AdminAddSliderComponent } from './components/slider/admin-add-slider/admin-add-slider.component';
// import { AdminEditSliderComponent } from './components/slider/admin-edit-slider/admin-edit-slider.component';
// import { AdminSlidersComponent } from './components/slider/admin-sliders/admin-sliders.component';
// import { MaterialModule } from '../material/material.module';
// import { AdminRoutingModule } from './admin-routing.module';
// import { LayoutIndexComponent } from './components/layout-index/layout-index.component';
// import { IncreaseProductComponent } from './components/product/increase-product/increase-product.component';
// import { AddSizeComponent } from './components/sizes/add-size/add-size.component';
// import { EditSizeComponent } from './components/sizes/edit-size/edit-size.component';
// import { SizeComponent } from './components/sizes/size/size.component';
// import { SizesComponent } from './components/sizes/sizes/sizes.component';


// @NgModule({
//     declarations: [
//         AdminDashboardComponent,
//         AddCategoryComponent,
//         CategoriesComponent,
//         EditCategoryComponent,

//         PreferencesComponent,
//         AddPreferencesComponent,
//         EditPreferencesComponent,

//         ItemComponent,
//         AddProductComponent,
//         AdminDetailProductComponent,
//         AdminEditProductComponent,
//         AdminProductsComponent,
//         UploadProductComponent,

//         SaleComponent,
//         EditSaleComponent,
//         SalesComponent,
//         ViewSaleComponent,

//         SliderComponent,
//         AdminAddSliderComponent,
//         AdminEditSliderComponent,
//         AdminSlidersComponent,
//         LayoutIndexComponent,
//         IncreaseProductComponent,
//         AddSizeComponent,
//         EditSizeComponent,
//         SizeComponent,
//         SizesComponent,
//     ],
//     imports: [
//         CommonModule,
//         FormsModule,
//         ReactiveFormsModule,
//         MaterialModule,
//         AdminRoutingModule,
//     ],
//     exports: [
//         AdminDashboardComponent,
//         AddCategoryComponent,
//         CategoriesComponent,
//         EditCategoryComponent,

//         PreferencesComponent,
//         AddPreferencesComponent,
//         EditPreferencesComponent,

//         ItemComponent,
//         AddProductComponent,
//         AdminDetailProductComponent,
//         AdminEditProductComponent,
//         AdminProductsComponent,
//         UploadProductComponent,

//         SaleComponent,
//         EditSaleComponent,
//         SalesComponent,
//         ViewSaleComponent,

//         SliderComponent,
//         AdminAddSliderComponent,
//         AdminEditSliderComponent,
//         AdminSlidersComponent,
//     ]
// })
// export class AdminModule { }
