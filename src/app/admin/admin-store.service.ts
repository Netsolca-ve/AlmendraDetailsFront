import { Injectable, computed, effect, signal } from '@angular/core';

export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  categoryId: number;
}

export type PaymentMethod = 'Pago móvil' | 'Transferencia' | 'Zelle' | 'Efectivo';

export interface Sale {
  id: number;
  date: string; // YYYY-MM-DD
  productId: number;
  quantity: number;
  total: number;
  customer: string;
  payment: PaymentMethod;
}

interface AdminData {
  categories: Category[];
  products: Product[];
  sales: Sale[];
}

const STORAGE_KEY = 'almendra-admin';

const SEED: AdminData = {
  categories: [
    { id: 1, name: 'Ramos' },
    { id: 2, name: 'Peluches' },
    { id: 3, name: 'Navidad' }
  ],
  products: [],
  sales: []
};

// shortcut: los datos viven en localStorage de este navegador, se pierden en otro equipo; pasan a la API en la Fase 3
@Injectable({ providedIn: 'root' })
export class AdminStore {
  private data = signal<AdminData>(this.load());

  categories = computed(() => this.data().categories);
  products = computed(() => this.data().products);
  sales = computed(() => [...this.data().sales].sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id));

  constructor() {
    effect(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data()));
      } catch {
        // modo privado o almacenamiento lleno: la app sigue funcionando en memoria
      }
    });
  }

  categoryName(id: number) {
    return this.categories().find((c) => c.id === id)?.name ?? '—';
  }

  productName(id: number) {
    return this.products().find((p) => p.id === id)?.name ?? 'Producto eliminado';
  }

  addCategory(name: string) {
    this.data.update((d) => ({ ...d, categories: [...d.categories, { id: nextId(d.categories), name: name.trim() }] }));
  }

  /** Devuelve false si la categoría todavía tiene productos. */
  removeCategory(id: number): boolean {
    if (this.products().some((p) => p.categoryId === id)) return false;
    this.data.update((d) => ({ ...d, categories: d.categories.filter((c) => c.id !== id) }));
    return true;
  }

  addProduct(product: Omit<Product, 'id'>) {
    this.data.update((d) => ({ ...d, products: [...d.products, { ...product, name: product.name.trim(), id: nextId(d.products) }] }));
  }

  removeProduct(id: number) {
    this.data.update((d) => ({ ...d, products: d.products.filter((p) => p.id !== id) }));
  }

  /** Registra la venta y descuenta el stock. Devuelve un mensaje de error o null si salió bien. */
  addSale(sale: Omit<Sale, 'id' | 'total'>): string | null {
    const product = this.products().find((p) => p.id === sale.productId);
    if (!product) return 'El producto no existe.';
    if (!Number.isInteger(sale.quantity) || sale.quantity < 1) return 'La cantidad debe ser un número entero mayor a 0.';
    if (sale.quantity > product.stock) {
      return product.stock === 1
        ? `Solo queda 1 unidad de ${product.name}.`
        : `Solo quedan ${product.stock} unidades de ${product.name}.`;
    }

    const total = round2(product.price * sale.quantity);
    this.data.update((d) => ({
      ...d,
      products: d.products.map((p) => (p.id === product.id ? { ...p, stock: p.stock - sale.quantity } : p)),
      sales: [...d.sales, { ...sale, customer: sale.customer.trim(), total, id: nextId(d.sales) }]
    }));
    return null;
  }

  /** Anula la venta y devuelve las unidades al stock si el producto sigue existiendo. */
  removeSale(id: number) {
    const sale = this.data().sales.find((s) => s.id === id);
    if (!sale) return;
    this.data.update((d) => ({
      ...d,
      products: d.products.map((p) => (p.id === sale.productId ? { ...p, stock: p.stock + sale.quantity } : p)),
      sales: d.sales.filter((s) => s.id !== id)
    }));
  }

  private load(): AdminData {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? { ...SEED, ...JSON.parse(raw) } : SEED;
    } catch {
      return SEED;
    }
  }
}

export function today(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function nextId(items: { id: number }[]) {
  return items.reduce((max, i) => Math.max(max, i.id), 0) + 1;
}

// evita totales como 49.99999 al multiplicar precios con decimales
function round2(n: number) {
  return Math.round(n * 100) / 100;
}
