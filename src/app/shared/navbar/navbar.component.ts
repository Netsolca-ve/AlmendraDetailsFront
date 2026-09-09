import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive,
    ShoppingCartComponent,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isScrolled = false;
  isOpen = signal(false);

  openCart() {
    this.isOpen.set(true);
  }

  get navbarScrolled(): boolean {
    return this.isScrolled || this.isOpen();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.isOpen()) return;

    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    if (scrollPosition > 120) {
      this.isScrolled = true;
    } else if (scrollPosition < 50) {
      this.isScrolled = false;
    }
  }
}
