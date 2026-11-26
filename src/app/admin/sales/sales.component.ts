import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AdminStore, PaymentMethod, today } from '../admin-store.service';

@Component({
  selector: 'app-sales',
  imports: [CurrencyPipe, DatePipe, ReactiveFormsModule, RouterLink, MatIconModule],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss'
})
export class SalesComponent {
  store = inject(AdminStore);
  payments: PaymentMethod[] = ['Pago móvil', 'Transferencia', 'Zelle', 'Efectivo'];
  error = signal('');

  form = inject(FormBuilder).nonNullable.group({
    productId: [0, Validators.min(1)],
    quantity: [1, [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]],
    customer: ['', Validators.maxLength(80)],
    payment: ['Pago móvil' as PaymentMethod, Validators.required],
    date: [today(), Validators.required]
  });

  private value = toSignal(this.form.valueChanges, { initialValue: this.form.getRawValue() });

  selected = computed(() => this.store.products().find((p) => p.id === Number(this.value().productId)));
  total = computed(() => (this.selected()?.price ?? 0) * (Number(this.value().quantity) || 0));

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    const error = this.store.addSale({ ...v, productId: Number(v.productId), quantity: Number(v.quantity) });
    this.error.set(error ?? '');
    if (!error) this.form.reset({ productId: 0, quantity: 1, customer: '', payment: v.payment, date: v.date });
  }

  remove(id: number) {
    if (confirm('¿Anular esta venta? Las unidades vuelven al stock.')) this.store.removeSale(id);
  }
}
