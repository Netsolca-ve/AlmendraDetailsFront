import { Component } from '@angular/core';
import { CONTACT_INFO } from '../contact-info';


@Component({
  selector: 'app-footer',
  imports: [  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  contact = CONTACT_INFO;
}
