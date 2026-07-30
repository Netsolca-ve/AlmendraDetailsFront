import { Routes } from '@angular/router';
import { ShopLayoutComponent } from './shared/layouts/shop-layout/shop-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: ShopLayoutComponent,
        loadChildren: () => import('./shop/shop.routes').then((m) => m.ShopRoutes)
    },
    {
        path: 'admin',
        component: ShopLayoutComponent,
        loadChildren: () => import('./admin/admin.routes').then((m) => m.AdminRoutes)
    }
];
