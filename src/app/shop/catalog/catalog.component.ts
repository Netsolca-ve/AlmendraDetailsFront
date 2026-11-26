import { Component, computed, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

type Category = 'ramos' | 'peluches' | 'navidad';

@Component({
  selector: 'app-catalog',
  imports: [CurrencyPipe],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent {
  categories: { id: Category | 'todos'; label: string }[] = [
    { id: 'todos', label: 'Todos' },
    { id: 'ramos', label: 'Ramos' },
    { id: 'peluches', label: 'Peluches' },
    { id: 'navidad', label: 'Navidad' }
  ];

  // shortcut: datos de prueba en el componente, pasan a ProductService + JSON en la Fase 2
  products: { id: number; name: string; price: number; image: string; category: Category }[] = [
    { id: 1, name: 'Ramo Cielo', price: 50, image: '/assets/ramo1.jpeg', category: 'ramos' },
    { id: 2, name: 'Ramo Lavanda', price: 50, image: '/assets/ramo2.jpeg', category: 'ramos' },
    { id: 3, name: 'Ramo Rosado', price: 50, image: '/assets/ramo3.jpeg', category: 'ramos' },
    { id: 4, name: 'Ramo Pasión', price: 50, image: '/assets/ramo4.jpeg', category: 'ramos' },
    { id: 5, name: 'Ramo Margaritas', price: 50, image: '/assets/cat1.jpeg', category: 'ramos' },
    { id: 6, name: 'Ramo Girasol', price: 50, image: '/assets/cat2.jpeg', category: 'ramos' },
    { id: 7, name: 'Ramo Gerberas', price: 50, image: '/assets/cat3.jpeg', category: 'ramos' },
    { id: 8, name: 'Ramo Rosas Rojas', price: 50, image: '/assets/cat4.jpeg', category: 'ramos' }
  ];

  selected = signal<Category | 'todos'>('todos');

  filtered = computed(() =>
    this.selected() === 'todos' ? this.products : this.products.filter((p) => p.category === this.selected())
  );
}
