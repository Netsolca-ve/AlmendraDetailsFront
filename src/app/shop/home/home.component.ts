import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CONTACT_INFO } from '../../shared/contact-info';


@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  contact = CONTACT_INFO;
}
