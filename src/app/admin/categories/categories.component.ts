import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AdminStore } from '../admin-store.service';

@Component({
  selector: 'app-categories',
  imports: [ReactiveFormsModule, MatIconModule],
  templateUrl: './categories.component.html'
})
export class CategoriesComponent {
  store = inject(AdminStore);
  name = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(40)] });
  error = signal('');

  productCount(categoryId: number) {
    return this.store.products().filter((p) => p.categoryId === categoryId).length;
  }

  save() {
    const name = this.name.value.trim();
    if (!name) {
      this.name.markAsTouched();
      return;
    }
    if (this.store.categories().some((c) => c.name.toLowerCase() === name.toLowerCase())) {
      this.error.set(`Ya existe la categoría "${name}".`);
      return;
    }
    this.store.addCategory(name);
    this.name.reset();
    this.error.set('');
  }

  remove(id: number, name: string) {
    if (confirm(`¿Eliminar la categoría "${name}"?`) && !this.store.removeCategory(id)) {
      this.error.set(`"${name}" tiene productos. Muévelos o elimínalos primero.`);
    }
  }
}
