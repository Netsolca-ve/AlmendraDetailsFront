import { Routes } from "@angular/router";

export const AdminRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./dashboard/dashboard.component').then((c) => c.DashboardComponent),
        title: 'Admin - Dashboard'
    },
    {
        path: 'sales',
        loadComponent: () => import('./sales/sales.component').then((c) => c.SalesComponent),
        title: 'Admin - Ventas'
    },
    {
        path: 'products',
        loadComponent: () => import('./products/products.component').then((c) => c.ProductsComponent),
        title: 'Admin - Productos'
    },
    {
        path: 'categories',
        loadComponent: () => import('./categories/categories.component').then((c) => c.CategoriesComponent),
        title: 'Admin - Categorías'
    }
]
