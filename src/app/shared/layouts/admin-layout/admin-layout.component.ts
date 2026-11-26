import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
  menu = [
    { path: '/admin', label: 'Dashboard', icon: 'space_dashboard', exact: true },
    { path: '/admin/sales', label: 'Ventas', icon: 'point_of_sale', exact: false },
    { path: '/admin/products', label: 'Productos', icon: 'inventory_2', exact: false },
    { path: '/admin/categories', label: 'Categorías', icon: 'category', exact: false }
  ];
}
