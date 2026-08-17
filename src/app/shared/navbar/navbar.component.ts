import { Component } from '@angular/core';
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

}
