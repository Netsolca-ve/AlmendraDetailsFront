import { Routes } from '@angular/router';
import { ShopLayoutComponent } from './shared/layouts/shop-layout/shop-layout.component';
import { AdminLayoutComponent } from './shared/layouts/admin-layout/admin-layout.component';

// admin va primero: la tienda tiene un '**' (404) que si no atraparía también /admin/...
export const routes: Routes = [
    {
        path: 'admin',
        component: AdminLayoutComponent,
        loadChildren: () => import('./admin/admin.routes').then((m) => m.AdminRoutes)
    },
    {
        path: '',
        component: ShopLayoutComponent,
        loadChildren: () => import('./shop/shop.routes').then((m) => m.ShopRoutes)
    }
];
