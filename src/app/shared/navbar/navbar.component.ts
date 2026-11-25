import { Component, HostListener, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, map } from 'rxjs';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    ShoppingCartComponent,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  host: { '[class.over-hero]': 'isHome()' }
})
export class NavbarComponent {
  private router = inject(Router);

  isScrolled = signal(false);
  isOpen = signal(false);
  isMobileOpen = signal(false);

  // Solo el home tiene hero; en las demás páginas el navbar va crema desde el inicio
  isHome = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => this.router.url.split(/[?#]/)[0] === '/')
    ),
    { initialValue: false }
  );

  isTransparent = computed(() => this.isHome() && !this.isScrolled() && !this.isMobileOpen());

  toggleMenu(){
     this.isMobileOpen.update(v => !v);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.isOpen()) return;

    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    if (scrollPosition > 120) {
      this.isScrolled.set(true);
    } else if (scrollPosition < 50) {
      this.isScrolled.set(false);
    }
  }
}
