import { TestBed } from '@angular/core/testing';
import { AdminStore } from './admin-store.service';

describe('AdminStore', () => {
  let store: AdminStore;

  beforeEach(() => {
    localStorage.removeItem('almendra-admin');
    store = TestBed.inject(AdminStore);
    store.addProduct({ name: 'Ramo Cielo', price: 12.5, stock: 3, categoryId: 1 });
  });

  it('registra una venta, calcula el total y descuenta el stock', () => {
    const error = store.addSale({ productId: 1, quantity: 2, customer: 'Ana', payment: 'Zelle', date: '2026-11-26' });

    expect(error).toBeNull();
    expect(store.sales()[0].total).toBe(25);
    expect(store.products()[0].stock).toBe(1);
  });

  it('rechaza una venta con más unidades que el stock', () => {
    const error = store.addSale({ productId: 1, quantity: 4, customer: 'Ana', payment: 'Zelle', date: '2026-11-26' });

    expect(error).toContain('Solo quedan 3');
    expect(store.sales().length).toBe(0);
  });

  it('al anular una venta devuelve el stock', () => {
    store.addSale({ productId: 1, quantity: 2, customer: 'Ana', payment: 'Efectivo', date: '2026-11-26' });
    store.removeSale(store.sales()[0].id);

    expect(store.products()[0].stock).toBe(3);
  });

  it('no deja borrar una categoría con productos', () => {
    expect(store.removeCategory(1)).toBeFalse();
    expect(store.removeCategory(2)).toBeTrue();
  });
});
