import { Routes } from "@angular/router"

export const ShopRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home/home.component').then((c) => c.HomeComponent),
        title: 'Almendra Details'
    },

    {
        path: 'catalog',
        loadComponent: () => import('./catalog/catalog.component').then((c) => c.CatalogComponent),
        title: 'Almendra Details - Catálogo de productos'
    },
    {
        path: 'about-us',
        loadComponent: () => import('./about-us/about-us.component').then((c) => c.AboutUsComponent),
        title: 'Almendra Details - Sobre Nosotros'
    },
    {
        path: '**',
        loadComponent: () => import('./not-found/not-found.component').then((c) => c.NotFoundComponent),
        title: 'Página no encontrada'
    },
]