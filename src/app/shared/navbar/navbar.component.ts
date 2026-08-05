import { Component } from '@angular/core';
import { NgZorroModule } from '../ng-zorro/ng-zorro.module';

@Component({
  selector: 'app-navbar',
  imports: [
    NgZorroModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
