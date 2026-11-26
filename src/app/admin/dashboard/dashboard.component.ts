import { Component, computed, inject } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AdminStore, today } from '../admin-store.service';

const LOW_STOCK = 3;

@Component({
  selector: 'app-dashboard',
  imports: [CurrencyPipe, DatePipe, RouterLink, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  store = inject(AdminStore);

  private todaySales = computed(() => this.store.sales().filter((s) => s.date === today()));
  private monthSales = computed(() => this.store.sales().filter((s) => s.date.startsWith(today().slice(0, 7))));

  stats = computed(() => [
    { label: 'Ventas de hoy', value: String(this.todaySales().length), icon: 'receipt_long', money: false },
    { label: 'Ingresos de hoy', value: sum(this.todaySales()), icon: 'payments', money: true },
    { label: 'Ingresos del mes', value: sum(this.monthSales()), icon: 'calendar_month', money: true },
    { label: 'Productos', value: String(this.store.products().length), icon: 'inventory_2', money: false }
  ]);

  recentSales = computed(() => this.store.sales().slice(0, 5));
  lowStock = computed(() => this.store.products().filter((p) => p.stock <= LOW_STOCK));
}

function sum(sales: { total: number }[]) {
  return sales.reduce((acc, s) => acc + s.total, 0);
}
