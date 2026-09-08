import { Component, HostListener } from '@angular/core';
import { NgZorroModule } from '../ng-zorro/ng-zorro.module';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    NgZorroModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    
    // Activa al bajar de 120px, desactiva solo cuando sube de 50px hacia arriba
    if (scrollPosition > 120) {
      this.isScrolled = true;
    } else if (scrollPosition < 50) {
      this.isScrolled = false;
    }
  }
}
