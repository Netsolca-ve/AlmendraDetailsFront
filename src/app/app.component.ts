import { Component, HostListener, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // arriba de todo no hay a dónde subir, y el botón tapaba la franja de datos del home
  showScrollTop = signal(false);

  @HostListener('window:scroll')
  onWindowScroll() {
    this.showScrollTop.set(window.scrollY > 400);
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Scroll suave hacia arriba
    });
  }
}
