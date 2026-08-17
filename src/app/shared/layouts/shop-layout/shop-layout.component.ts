import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-shop-layout',
  imports: [
    NavbarComponent,
    RouterOutlet,
    FooterComponent
],
  templateUrl: './shop-layout.component.html',
  styleUrl: './shop-layout.component.scss'
})
export class ShopLayoutComponent {

}
