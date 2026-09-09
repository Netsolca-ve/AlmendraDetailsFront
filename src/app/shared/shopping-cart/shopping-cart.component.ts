import { Component, input, output, inject, HostListener, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
// import {MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    RouterLink,
    // MatSidenavModule,
    // MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {
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