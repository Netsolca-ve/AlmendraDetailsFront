import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AdminStore } from '../admin-store.service';

@Component({
  selector: 'app-products',
  imports: [CurrencyPipe, ReactiveFormsModule, RouterLink, MatIconModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  store = inject(AdminStore);

  form = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(80)]],
    categoryId: [0, Validators.min(1)],
    price: [0, [Validators.required, Validators.min(0.01)]],
    stock: [0, [Validators.required, Validators.min(0), Validators.pattern(/^\d+$/)]]
  });

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    this.store.addProduct({ ...value, categoryId: Number(value.categoryId) });
    this.form.reset();
  }

  remove(id: number, name: string) {
    if (confirm(`¿Eliminar "${name}"? Las ventas registradas se mantienen.`)) this.store.removeProduct(id);
  }
}
