import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { PreferencesComponent } from './components/preferences/preferences/preferences.component';
import { AdminProductsComponent } from './components/product/admin-products/admin-products.component';
import { SalesComponent } from './components/sale/sales/sales.component';
import { AdminSlidersComponent } from './components/slider/admin-sliders/admin-sliders.component';

const routes: Routes = [
    {
        path: 'admin',
        component: AdminDashboardComponent,
        children: [
            {
                path: '',
                component: AdminProductsComponent
            },
            {
                path: 'products',
                component: AdminProductsComponent
            },
            {
                path: 'sales',
                component: SalesComponent
            },
            {
                path: 'banner',
                component: AdminSlidersComponent
            },
            {
                path: 'shipping',
                component: SalesComponent
            },
            {
                path: 'preferences',
                component: PreferencesComponent
            }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule { }