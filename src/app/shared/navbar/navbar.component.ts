import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
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
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isScrolled = signal(false);
  isOpen = signal(false);
  isMobileOpen = signal(false);

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
